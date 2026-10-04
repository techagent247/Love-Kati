import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { business } from "@/data/business";
import { submitEnquiry } from "@/lib/enquiries.functions";

export function EnquiryForm({ defaultType = "General question", title = "Send an enquiry" }: { defaultType?: string; title?: string }) {
  const send = useServerFn(submitEnquiry);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const field = "w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 outline-none focus:border-magenta";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const str = (k: string) => String(f.get(k) ?? "").trim();
    setState("sending");
    try {
      const res = await send({
        data: {
          name: str("name"),
          contact: str("contact"),
          event_type: str("event_type"),
          event_date: str("event_date") || null,
          guests: str("guests") ? Number(str("guests")) : null,
          message: str("message") || null,
        },
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="card-pop space-y-4 p-6 md:p-8" onSubmit={onSubmit}>
      <h2 className="text-4xl uppercase">{title}</h2>
      {state === "sent" ? (
        <div className="space-y-3 rounded-xl bg-sun p-5">
          <p className="font-display text-2xl">Thank you!</p>
          <p className="font-semibold">Your enquiry has been sent to the Love Kati team. For anything urgent, call <a className="underline" href={business.phoneHref}>{business.phone}</a>.</p>
          <button type="button" onClick={() => setState("idle")} className="btn-pop btn-paper">Send another</button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="font-label text-lg">Name</span><input name="name" required maxLength={100} className={field} /></label>
            <label className="block"><span className="font-label text-lg">Phone or email</span><input name="contact" required minLength={3} maxLength={200} className={field} /></label>
          </div>
          <label className="block"><span className="font-label text-lg">Event type</span>
            <select name="event_type" defaultValue={defaultType} className={field}>{["General question", ...business.events, "Other event"].map((e) => <option key={e}>{e}</option>)}</select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="font-label text-lg">Event date (optional)</span><input name="event_date" type="date" className={field} /></label>
            <label className="block"><span className="font-label text-lg">Guests (optional)</span><input name="guests" type="number" min={1} max={5000} className={field} /></label>
          </div>
          <label className="block"><span className="font-label text-lg">Message</span><textarea name="message" rows={4} maxLength={2000} placeholder="Location, timings, dietary needs…" className={field} /></label>
          {state === "error" && <p className="rounded-xl border-2 border-magenta bg-cream p-3 text-sm font-semibold">Sorry, that didn't send. Please try again or call {business.phone}.</p>}
          <button disabled={state === "sending"} className="btn-pop btn-magenta w-full disabled:opacity-60">{state === "sending" ? "Sending…" : "Send enquiry"}</button>
        </>
      )}
    </form>
  );
}
