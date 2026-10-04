import { createFileRoute, Link } from "@tanstack/react-router";
import { Cake, Flame, Heart, Briefcase, Flower2, Phone } from "lucide-react";
import katiImg from "@/assets/kati-roll.jpg";
import chaatImg from "@/assets/chaat.jpg";
import chipsImg from "@/assets/chips.jpg";
import curryImg from "@/assets/curry.jpg";
import { PageHero, Reveal } from "@/components/graphics";
import { business } from "@/data/business";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: "Hire Love Kati — Indian Street Food Catering" },
      { name: "description", content: "Book Love Kati for weddings, garden parties, birthdays, BBQs and corporate events across Harpenden and Hertfordshire." },
      { property: "og:title", content: "Bring Love Kati to your event" },
      { property: "og:description", content: "Proper Indian street food, wherever you're celebrating." },
    ],
  }),
  component: Catering,
});

const events = [
  { t: "Weddings", icon: Heart, tone: "bg-magenta text-paper" },
  { t: "Garden Parties", icon: Flower2, tone: "bg-sun" },
  { t: "Birthdays", icon: Cake, tone: "bg-paper" },
  { t: "BBQs", icon: Flame, tone: "bg-saffron" },
  { t: "Corporate Events", icon: Briefcase, tone: "bg-ink text-paper" },
];

function Catering() {
  return (
    <>
      <PageHero tone="saffron" eyebrow="Hire us" title="Bring Love Kati to your event" sub="Proper Indian street food, wherever you're celebrating." />
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {events.map((e, i) => (
            <Reveal key={e.t} delay={i * 90}>
              <div className={`card-pop flex aspect-[3/4] flex-col justify-between p-6 transition-transform hover:-translate-y-2 hover:rotate-1 ${e.tone}`}>
                <e.icon className="h-12 w-12" />
                <h2 className="text-3xl uppercase">{e.t}</h2>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-ink py-20 text-paper">
        <h2 className="px-5 text-center text-5xl uppercase md:text-7xl">The <span className="text-sun">experience</span></h2>
        <div className="mt-12 flex snap-x gap-6 overflow-x-auto px-5 pb-6">
          {[katiImg, chaatImg, chipsImg, curryImg, katiImg].map((src, i) => (
            <img key={i} src={src} alt="Love Kati street food" loading="lazy" width={500} height={600} className="aspect-[4/5] w-72 shrink-0 snap-center rounded-3xl border-4 border-sun object-cover md:w-96" />
          ))}
        </div>
      </section>

      <section className="bg-magenta px-5 py-24 text-center text-paper">
        <h2 className="text-5xl uppercase text-shadow-pop md:text-7xl">Let's feed your guests</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-pop btn-sun">Enquire about your event</Link>
          <a href={business.phoneHref} className="btn-pop btn-paper"><Phone className="h-5 w-5" /> Call {business.phone}</a>
        </div>
      </section>
    </>
  );
}
