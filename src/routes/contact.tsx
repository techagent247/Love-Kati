import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, MapPin, Phone } from "lucide-react";
import { PageHero, Reveal } from "@/components/graphics";
import { business } from "@/data/business";
import { EnquiryForm } from "@/components/EnquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Love Kati — Harpenden & Wheathampstead" },
      { name: "description", content: `Call Love Kati on ${business.phone} or send an event enquiry.` },
      { property: "og:title", content: "Come find Love Kati" },
      { property: "og:description", content: "Get in touch for food, events and catering." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const field = "w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 outline-none focus:border-magenta";
  return (
    <>
      <PageHero eyebrow="Contact" title="Come find us" sub={business.area} />
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-5">
            <a href={business.phoneHref} className="card-pop flex items-center gap-4 bg-sun p-6 transition-transform hover:-translate-y-1">
              <Phone className="h-8 w-8" /><span><span className="block font-label text-lg">Call us</span><span className="font-display text-3xl">{business.phone}</span></span>
            </a>
            <div className="card-pop flex items-start gap-4 p-6">
              <MapPin className="h-8 w-8 shrink-0 text-magenta" /><span><span className="block font-label text-lg">Find us</span>{business.address}</span>
            </div>
            <a href={business.social.facebook} target="_blank" rel="noreferrer" className="card-pop flex items-center gap-4 bg-magenta p-6 text-paper">
              <Facebook className="h-8 w-8" /><span className="font-label text-2xl">Follow on Facebook</span>
            </a>
          </Reveal>
          <Reveal delay={150}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
