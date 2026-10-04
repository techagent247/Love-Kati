import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories, type CategoryId } from "@/data/menu";
import { CategorySection } from "@/components/CategorySection";

export const Route = createFileRoute("/menu/$category")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.id === params.category);
    if (!cat) throw notFound();
    return { id: cat.id as CategoryId, label: cat.label, blurb: cat.blurb };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.label} — Love Kati Menu` },
          { name: "description", content: loaderData.blurb },
          { property: "og:title", content: `${loaderData.label} — Love Kati` },
          { property: "og:description", content: loaderData.blurb },
        ]
      : [],
  }),
  component: () => {
    const { id } = Route.useLoaderData();
    return <CategorySection id={id} />;
  },
});
