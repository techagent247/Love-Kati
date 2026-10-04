import { Flame, Leaf } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { HandArrow } from "./graphics";
import { cn } from "@/lib/utils";

const drinkTone: Record<string, string> = { coke: "bg-magenta text-paper", "thums-up": "bg-ink text-paper", limca: "bg-sun text-ink" };

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="card-pop group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-magenta hover:text-paper" style={{}}>
      <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className={cn("flex h-full items-center justify-center", drinkTone[item.id] ?? "bg-saffron")}>
            <span className="font-display text-4xl uppercase">{item.name}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {item.popular && <span className="sticker bg-sun text-ink">Fan fave</span>}
          {item.vegan ? (
            <span className="sticker bg-paper text-ink"><Leaf className="h-3.5 w-3.5" /> Vegan</span>
          ) : item.vegetarian ? (
            <span className="sticker bg-paper text-ink"><Leaf className="h-3.5 w-3.5" /> Veg</span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl uppercase">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm opacity-80">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex gap-0.5" aria-label={`Spice level ${item.spice ?? 0} of 3`}>
            {item.spice !== undefined &&
              [1, 2, 3].map((n) => <Flame key={n} className={cn("h-5 w-5", n <= (item.spice ?? 0) ? "fill-saffron text-saffron" : "opacity-25")} />)}
          </span>
          <span className="font-label text-lg">{item.price ?? "Price when ordering"}</span>
        </div>
      </div>
      <HandArrow className="pointer-events-none absolute bottom-16 right-3 h-10 w-14 text-sun opacity-0 transition-opacity group-hover:opacity-100" />
    </article>
  );
}
