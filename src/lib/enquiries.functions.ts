import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const Enquiry = z.object({
  name: z.string().trim().min(1).max(100),
  contact: z.string().trim().min(3).max(200),
  event_type: z.string().trim().min(1).max(60),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  guests: z.number().int().min(1).max(5000).nullable(),
  message: z.string().trim().max(2000).nullable(),
});

export type EnquiryInput = z.infer<typeof Enquiry>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Enquiry.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const sb = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
    const { error } = await sb.from("enquiries").insert(data);
    if (error) {
      console.error("enquiry insert failed", error);
      return { ok: false as const };
    }
    return { ok: true as const };
  });
