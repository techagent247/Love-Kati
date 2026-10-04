import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { categories } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Love Kati Kati Rolls, Chaat, Chips & Curry" },
      { name: "description", content: "Kati rolls, gunpowder chips, samosa chaat, curries, kids food and Indian drinks from Love Kati." },
      { property: "og:title", content: "The Love Kati Menu" },
      { property: "og:description", content: "Calcutta-style kati rolls and proper Indian street food." },
    ],
  }),
  component: MenuLayout,
});

function MenuLayout() {
  return (
    <>
      <section className="relative overflow-hidden bg-magenta px-5 pb-8 pt-32 text-paper md:pt-40">
        <div className="absolute inset-0 bg-dots-light" />
        <div className="relative mx-auto max-w-7xl">
          <h1 className="text-6xl uppercase text-shadow-pop animate-rise md:text-9xl">The <span className="text-sun">Menu</span></h1>
          <nav className="mt-8 flex gap-3 overflow-x-auto pb-3" aria-label="Menu categories">
            <Link to="/menu" activeOptions={{ exact: true }} className="sticker shrink-0 bg-paper px-5 py-2 text-xl text-ink data-[status=active]:bg-sun">All</Link>
            {categories.map((c) => (
              <Link key={c.id} to="/menu/$category" params={{ category: c.id }} className="sticker shrink-0 bg-paper px-5 py-2 text-xl text-ink data-[status=active]:bg-sun">
                {c.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <Outlet />
    </>
  );
}
