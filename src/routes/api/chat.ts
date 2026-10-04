import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { z } from "zod";
import { business } from "@/data/business";
import { categories, menu } from "@/data/menu";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "@/lib/ai/run-id.server";

const Body = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) }))
    .min(1)
    .max(30),
});

function systemPrompt() {
  const items = menu
    .map((m) => {
      const tags = [m.vegan ? "vegan" : m.vegetarian ? "vegetarian" : "", m.spice != null ? `spice ${m.spice}/3` : ""].filter(Boolean).join(", ");
      const cat = categories.find((c) => c.id === m.category)?.label;
      return `- ${m.name} (${cat}${tags ? `; ${tags}` : ""}): ${m.description}${m.price ? ` Price: ${m.price}` : ""}`;
    })
    .join("\n");
  return `You are the friendly helper on the ${business.name} website (${business.tagline}). Answer visitor questions about the menu, catering/event hire and business details. Be warm, short (under 120 words) and use simple markdown.

RULES:
- Only use the facts below. Never invent prices, opening times, locations of upcoming events, allergen details, reviews or history. If unknown, say so and suggest calling ${business.phone}.
- Prices are not listed online; they are given when ordering.
- For allergies, always tell people to confirm with the team by phone.
- For catering, point people to the enquiry form on the Hire Us / Contact page or to call.

BUSINESS:
Phone: ${business.phone}. Area: ${business.area}. Website: ${business.website}.${business.email ? ` Email: ${business.email}.` : ""}
Events we cater: ${business.events.join(", ")}.
All kati rolls are wrapped in freshly made Indian paratha (crispy outside, soft inside), garnished with coriander mint chutney and pickled onion. "Kati" means stick in Bengali, after the bamboo skewers.

MENU:
${items}`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "Invalid message" }, { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "Assistant not configured" }, { status: 500 });

        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });
        const messages: ModelMessage[] = [{ role: "system", content: systemPrompt() }, ...parsed.data.messages];
        let failure: { status: number; message: string } | null = null;
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          messages,
          abortSignal: request.signal,
          maxRetries: 0,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
          onError: ({ error }) => {
            const status = (error as { statusCode?: number })?.statusCode ?? 500;
            failure = {
              status,
              message:
                status === 429 ? "Lots of questions right now — try again in a moment." :
                status === 402 || status === 403 ? "The assistant is unavailable right now. Please call us." :
                "Sorry, something went wrong. Please try again or call us.",
            };
            console.error("chat error", error);
          },
        });

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.textStream) controller.enqueue(encoder.encode(chunk));
            } catch {
              /* handled below */
            }
            const f = failure as { status: number; message: string } | null;
            if (f) controller.enqueue(encoder.encode(`\n\n[[error]]${f.message}`));
            controller.close();
          },
        });
        return new Response(stream, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" },
        });
      },
    },
  },
});
