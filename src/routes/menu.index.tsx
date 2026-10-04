import { createFileRoute } from "@tanstack/react-router";
import { categories } from "@/data/menu";
import { CategorySection } from "@/components/CategorySection";

export const Route = createFileRoute("/menu/")({
  component: () => (
    <>
      {categories.map((c, i) => (
        <CategorySection key={c.id} id={c.id} index={i} />
      ))}
    </>
  ),
});
