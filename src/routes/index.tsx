import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import katiImg from "@/assets/kati-roll.jpg";
import chaatImg from "@/assets/chaat.jpg";
import chipsImg from "@/assets/chips.jpg";
import curryImg from "@/assets/curry.jpg";
import { HandArrow, Marquee, PaintStroke, Reveal, Spark, Squiggle, StarBurst } from "@/components/graphics";
import { MenuCard } from "@/components/MenuCard";
import { OrderButton } from "@/components/OrderButton";
import { business } from "@/data/business";
import { menu } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Love Kati — Proper Indian Street Food in Harpenden" },
      { name: "description", content: "Calcutta-style Kati Rolls, chaat, gunpowder chips and curries. Street food and event catering across Harpenden & Wheathampstead." },
      { property: "og:title", content: "Love Kati — Proper Indian Street Food" },
      { property: "og:description", content: "Kati Rolls, chaat and big Indian flavours. Hire us for weddings, parties and events." },
    ],
  }),
  component: Home,
});

function Home() {
  const popular = menu.filter((m) => m.category === "kati-rolls").slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-magenta text-paper">
        <div className="absolute inset-0 bg-dots-light" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-32 lg:grid-cols-[1.1fr_1fr]">
          <div className="relative z-10">
            <p className="sticker bg-sun text-ink animate-rise">Harpenden · Wheathampstead</p>
            <h1 className="mt-5 text-[22vw] uppercase leading-[0.82] text-shadow-pop animate-[pop_0.8s_cubic-bezier(.34,1.56,.64,1)_both] sm:text-[8.5rem] lg:text-[9.5rem]">
              Love<br />
              <span className="text-sun">Kati</span>
            </h1>
            <div className="relative mt-3 w-fit">
              <PaintStroke className="absolute -bottom-1 left-0 h-8 w-full" />
              <p className="relative font-label text-3xl text-paper animate-rise md:text-5xl" style={{ animationDelay: "300ms" }}>Proper Indian Street Food</p>
            </div>
            <p className="mt-6 max-w-md text-lg animate-rise md:text-xl" style={{ animationDelay: "450ms" }}>Big Indian flavours. Proper street-food attitude.</p>
            <div className="mt-8 flex flex-wrap gap-4 animate-rise" style={{ animationDelay: "600ms" }}>
              <Link to="/menu" className="btn-pop btn-sun">Explore the menu <ArrowRight className="h-5 w-5" /></Link>
              <OrderButton className="btn-paper" />
              <Link to="/catering" className="btn-pop btn-ink">Hire Us</Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[2rem] border-4 border-ink animate-reveal" style={{ boxShadow: "var(--shadow-pop-lg)", animationDelay: "200ms" }}>
              <img src={katiImg} alt="Chicken tikka kati rolls wrapped in paratha" width={1280} height={1280} className="h-full w-full object-cover animate-slow-zoom" />
            </div>
            <StarBurst className="absolute -left-4 -top-6 h-24 w-24 animate-pop" style={{ animationDelay: "900ms" }} />
            <StarBurst className="absolute -bottom-6 right-6 h-16 w-16 animate-pop" style={{ animationDelay: "1050ms" }} />
            <div className="absolute -right-2 top-10 rotate-6 rounded-full border-2 border-ink bg-saffron px-5 py-4 text-center text-ink animate-pop md:-right-6" style={{ animationDelay: "1200ms", boxShadow: "var(--shadow-pop)" }}>
              <p className="font-display text-xl leading-none">Kati<br />Rolls</p>
            </div>
            <HandArrow className="absolute -left-16 bottom-24 hidden h-16 w-24 rotate-[200deg] text-sun lg:block" />
            <Spark className="absolute left-1/3 -top-10 h-8 w-8 text-sun animate-float" />
            <Spark className="absolute -bottom-10 left-10 h-6 w-6 text-paper animate-float" />
          </div>
        </div>
      </section>

      <Marquee className="bg-sun text-ink -rotate-1 scale-105" items={["Kati Rolls", "Chaat", "Gunpowder Chips", "Curries", "Weddings", "Garden Parties", "Birthdays", "BBQs"]} />

      {/* THE KATI ROLL */}
      <section className="relative overflow-hidden bg-cream px-5 py-24 md:py-32">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="font-label text-2xl text-magenta">What's a kati roll?</p>
            <h2 className="mt-2 text-6xl uppercase md:text-8xl">The <span className="text-magenta">Kati</span> Roll</h2>
            <Squiggle className="mt-4 h-5 w-40 text-saffron" />
            <p className="mt-6 text-2xl font-semibold">A quintessential Calcutta spicy street wrap.</p>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Bamboo skewer-roasted kebabs wrapped in paratha, layered with egg, rolled with spicy fillings and topped with chutney.
            </p>
            <div className="card-pop mt-8 max-w-md rotate-[-1.5deg] bg-sun p-6">
              <p className="font-label text-xl">Why "kati"?</p>
              <p className="mt-1">Those bamboo skewers gave the roll its name — <strong>"kati"</strong> means <em>stick</em> in Bengali.</p>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src={katiImg} alt="Kati rolls" loading="lazy" width={600} height={600} className="col-span-2 aspect-[16/10] w-full rounded-3xl border-2 border-ink object-cover" />
              <img src={chaatImg} alt="Samosa chole chaat" loading="lazy" width={400} height={400} className="aspect-square w-full rotate-[-2deg] rounded-3xl border-2 border-ink object-cover" />
              <img src={chipsImg} alt="Gunpowder masala chips" loading="lazy" width={400} height={400} className="aspect-square w-full rotate-[2deg] rounded-3xl border-2 border-ink object-cover" />
            </div>
            <StarBurst className="absolute -right-4 -top-6 h-16 w-16 animate-spin-slow" />
          </Reveal>
        </div>
      </section>

      {/* ROLLS */}
      <section className="bg-ink px-5 py-24 text-paper">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-5xl uppercase md:text-7xl">Roll <span className="text-sun">call</span></h2>
            <Link to="/menu/$category" params={{ category: "kati-rolls" }} className="btn-pop btn-sun">All 7 rolls <ArrowRight className="h-5 w-5" /></Link>
          </Reveal>
          <div className="mt-12 grid gap-8 text-ink sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((m, i) => (
              <Reveal key={m.id} delay={i * 120}><MenuCard item={m} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MORE MENU */}
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="text-5xl uppercase md:text-7xl">More to <span className="text-magenta">munch</span></h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { c: "chaat", t: "Chaat", d: "Crispy, crunchy, spicy, sweet-tangy.", img: chaatImg, tone: "bg-sun" },
              { c: "chips", t: "Gunpowder Chips", d: "Masala or tamarind. Both proper.", img: chipsImg, tone: "bg-magenta text-paper" },
              { c: "curry", t: "Curries", d: "Keralian pumpkin & Goan lamb vindaloo.", img: curryImg, tone: "bg-saffron" },
            ].map((x, i) => (
              <Reveal key={x.c} delay={i * 120}>
                <Link to="/menu/$category" params={{ category: x.c }} className={`card-pop group block overflow-hidden ${x.tone} transition-transform hover:-translate-y-2`}>
                  <div className="aspect-square overflow-hidden border-b-2 border-ink">
                    <img src={x.img} alt={x.t} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="text-3xl uppercase">{x.t}</h3>
                      <p className="mt-1 text-sm opacity-80">{x.d}</p>
                    </div>
                    <ArrowRight className="h-8 w-8 shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIRE US */}
      <section className="relative overflow-hidden bg-saffron px-5 py-24 md:py-32">
        <div className="absolute inset-0 bg-dots" />
        <StarBurst className="absolute right-[10%] top-12 h-24 w-24 animate-float" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="font-label text-2xl">Weddings · Parties · Corporate</p>
            <h2 className="mt-2 text-6xl uppercase md:text-9xl">Hire <span className="text-paper text-shadow-pop">us!</span></h2>
            <p className="mt-4 max-w-xl text-xl">Proper Indian street food, wherever you're celebrating.</p>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {business.events.map((e, i) => (
              <Reveal key={e} delay={i * 80}>
                <span className={`inline-block rounded-full border-2 border-ink px-6 py-3 font-display text-xl uppercase md:text-3xl ${i % 2 ? "bg-magenta text-paper" : "bg-paper"}`} style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)`, boxShadow: "var(--shadow-pop)" }}>{e}</span>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/catering" className="btn-pop btn-ink">Enquire about your event</Link>
            <a href={business.phoneHref} className="btn-pop btn-paper"><Phone className="h-5 w-5" /> Call {business.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
