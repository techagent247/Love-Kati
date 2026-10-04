import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { business } from "@/data/business";
import { OrderButton } from "./OrderButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/catering", label: "Catering" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center leading-none", className)} aria-label="Love Kati home">
      <span className="font-display text-2xl uppercase tracking-tight text-paper md:text-3xl">
        Love<span className="text-sun">♥</span>Kati
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b-4 border-sun bg-ink/90 py-2 backdrop-blur-md" : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="font-label text-xl uppercase text-paper transition-colors hover:text-sun data-[status=active]:text-sun"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/catering" className="btn-pop btn-paper px-5 py-2 text-lg">Hire Us</Link>
            <OrderButton className="btn-sun px-5 py-2 text-lg" />
          </div>
          <button className="text-paper lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-magenta px-6 py-5 text-paper animate-fade-in lg:hidden">
          <div className="absolute inset-0 bg-dots-light" />
          <div className="relative flex items-center justify-between">
            <Logo />
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-9 w-9" /></button>
          </div>
          <nav className="relative mt-10 flex flex-col gap-1" aria-label="Mobile">
            {[...links, { to: "/menu/$category" as const, label: "Kati Rolls" }, { to: "/order-online" as const, label: "Order Online" }].map((l, i) => (
              <Link
                key={l.label}
                to={l.to}
                params={{ category: "kati-rolls" } as never}
                onClick={() => setOpen(false)}
                className="font-display text-5xl uppercase animate-rise hover:text-sun"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a href={business.phoneHref} className="btn-pop btn-sun relative mt-auto"><Phone className="h-5 w-5" /> Call {business.phone}</a>
        </div>
      )}
    </>
  );
}
