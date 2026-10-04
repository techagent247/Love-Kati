import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StarBurst({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={cn("fill-sun stroke-ink", className)} style={style} aria-hidden>
      <path strokeWidth="4" strokeLinejoin="round" d="M50 4 L60 38 L96 40 L67 60 L78 95 L50 74 L22 95 L33 60 L4 40 L40 38 Z" />
    </svg>
  );
}

export function PaintStroke({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 60" preserveAspectRatio="none" className={cn("stroke-sun", className)} aria-hidden>
      <path className="draw-path" d="M8 38 C120 12, 240 50, 340 26 S 520 18, 592 30" fill="none" strokeWidth="18" strokeLinecap="round" />
    </svg>
  );
}

export function HandArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={cn("stroke-current", className)} fill="none" aria-hidden>
      <path d="M6 60 C 30 10, 80 6, 108 30" strokeWidth="4" strokeLinecap="round" />
      <path d="M92 18 L110 31 L90 40" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 20" className={cn("stroke-current", className)} fill="none" aria-hidden>
      <path d="M2 10 Q 12 0 22 10 T 42 10 T 62 10 T 82 10 T 102 10 T 118 10" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("fill-current", className)} aria-hidden>
      <path d="M20 0 C22 14 26 18 40 20 C26 22 22 26 20 40 C18 26 14 22 0 20 C14 18 18 14 20 0 Z" />
    </svg>
  );
}

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("overflow-hidden border-y-2 border-ink py-3", className)}>
      <div className="flex w-max animate-marquee gap-8">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl uppercase md:text-4xl">
            {t} <Spark className="h-6 w-6" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal-up", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function PageHero({ eyebrow, title, sub, tone = "magenta" }: { eyebrow: string; title: string; sub?: string; tone?: "magenta" | "saffron" }) {
  return (
    <section className={cn("relative overflow-hidden px-5 pb-20 pt-36 md:pt-44", tone === "magenta" ? "bg-magenta text-paper" : "bg-saffron text-ink")}>
      <div className={cn("absolute inset-0", tone === "magenta" ? "bg-dots-light" : "bg-dots")} />
      <StarBurst className="absolute right-[8%] top-28 h-20 w-20 animate-float md:h-28 md:w-28" />
      <StarBurst className="absolute bottom-8 left-[6%] h-10 w-10 animate-spin-slow" />
      <div className="relative mx-auto max-w-6xl">
        <p className="font-label text-2xl animate-rise">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-5xl uppercase animate-rise text-shadow-pop md:text-8xl" style={{ animationDelay: "100ms" }}>{title}</h1>
        <PaintStroke className="mt-2 h-6 w-64 md:w-96" />
        {sub && <p className="mt-6 max-w-xl text-lg animate-rise md:text-xl" style={{ animationDelay: "250ms" }}>{sub}</p>}
      </div>
    </section>
  );
}
