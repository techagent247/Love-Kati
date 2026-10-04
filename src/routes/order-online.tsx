import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PageHero, Reveal } from "@/components/graphics";
import { business } from "@/data/business";
import { categories } from "@/data/menu";

export const Route = createFileRoute("/order-online")({
  head: () => ({
    meta: [
      { title: "Order Love Kati — Get Your Kati Fix" },
      { name: "description", content: "Order Love Kati kati rolls, chaat, chips and curry." },
      { property: "og:title", content: "Get your Kati fix" },
      { property: "og:description", content: "Order proper Indian street food from Love Kati." },
    ],
  }),
  component: Order,
});

function Order() {
  return (
    <>
      <PageHero eyebrow="Order online" title="Get your Kati fix" sub="Hungry? Here's how to get Love Kati in your hands." />
      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            {business.orderOnlineUrl ? (
              <a href={business.orderOnlineUrl} target="_blank" rel="noreferrer" className="btn-pop btn-magenta text-2xl">Order now</a>
            ) : (
              <div className="card-pop mx-auto max-w-xl bg-sun p-8">
                <p className="text-xl font-semibold">Online ordering link coming soon.</p>
                <p className="mt-2">For now, give us a call to order.</p>
                <a href={business.phoneHref} className="btn-pop btn-ink mt-6"><Phone className="h-5 w-5" /> {business.phone}</a>
              </div>
            )}
          </Reveal>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 70}>
                <Link to="/menu/$category" params={{ category: c.id }} className="card-pop block p-6 font-display text-2xl uppercase transition-all hover:-translate-y-1 hover:bg-magenta hover:text-paper">{c.label}</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
