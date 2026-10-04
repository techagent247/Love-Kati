import { categories, itemsIn, type CategoryId } from "@/data/menu";
import { MenuCard } from "./MenuCard";
import { Reveal, Squiggle } from "./graphics";

export function CategorySection({ id, index = 0 }: { id: CategoryId; index?: number }) {
  const cat = categories.find((c) => c.id === id)!;
  return (
    <section className={index % 2 ? "bg-paper px-5 py-20" : "bg-cream px-5 py-20"}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-label text-2xl text-magenta">{cat.label}</p>
          <h2 className="text-5xl uppercase md:text-7xl">{cat.title}</h2>
          <Squiggle className="mt-3 h-5 w-36 text-saffron" />
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{cat.blurb}</p>
        </Reveal>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {itemsIn(id).map((m, i) => (
            <Reveal key={m.id} delay={(i % 3) * 100}><MenuCard item={m} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
