import { createFileRoute, Link } from "@tanstack/react-router";
import katiImg from "@/assets/kati-roll.jpg";
import chaatImg from "@/assets/chaat.jpg";
import { PageHero, Reveal, StarBurst } from "@/components/graphics";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Love Kati — Calcutta Street Wraps" },
      { name: "description", content: "Love Kati serves Calcutta-style kati rolls: skewer-roasted kebabs wrapped in egg-layered paratha with chutney." },
      { property: "og:title", content: "About Love Kati" },
      { property: "og:description", content: "The story of the kati roll, and why we love it." },
    ],
  }),
  component: About,
});

const blocks = [
  { t: "Our Food", d: "Bamboo skewer-roasted kebabs wrapped in paratha, layered with egg, rolled with spicy fillings and topped with chutney.", tone: "bg-sun" },
  { t: "Our Flavours", d: "Gunpowder spice, tangy tamarind, cool yogurt, fresh green chutney — big, bright Indian flavour in every bite.", tone: "bg-magenta text-paper" },
  { t: "Our Street-Food Style", d: "Handmade, fast, fun and built to eat on your feet — at markets, festivals and your next party.", tone: "bg-saffron" },
  { t: "Why Kati Rolls?", d: "\"Kati\" means stick in Bengali — a nod to the bamboo skewers that gave this Calcutta classic its name.", tone: "bg-paper" },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About Love Kati" title="A Calcutta spicy street wrap" sub="Kati Roll: a quintessential Calcutta spicy street wrap — served with proper street-food attitude." />
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <img src={katiImg} alt="Kati rolls" loading="lazy" width={900} height={900} className="aspect-square w-full rounded-[2rem] border-4 border-ink object-cover" style={{ boxShadow: "var(--shadow-pop-lg)" }} />
            <img src={chaatImg} alt="Chaat" loading="lazy" width={400} height={400} className="absolute -bottom-10 -right-4 w-2/5 rotate-6 rounded-3xl border-4 border-ink object-cover" />
            <StarBurst className="absolute -left-6 -top-6 h-20 w-20 animate-float" />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {blocks.map((b, i) => (
              <Reveal key={b.t} delay={i * 100}>
                <div className={`card-pop h-full p-6 ${b.tone}`} style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
                  <h2 className="text-3xl uppercase">{b.t}</h2>
                  <p className="mt-3">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-24 text-center">
          <Link to="/menu" className="btn-pop btn-magenta">See the menu</Link>
        </div>
      </section>
    </>
  );
}
