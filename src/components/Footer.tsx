import { Link } from "@tanstack/react-router";
import { Facebook, Phone, MapPin } from "lucide-react";
import { business } from "@/data/business";
import { Marquee, StarBurst } from "./graphics";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Marquee className="border-sun bg-sun text-ink" items={["Proper Indian Street Food", "Kati Rolls", "Hire Us", "Chaat", "Gunpowder Chips"]} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3">
        <StarBurst className="absolute right-6 top-6 h-14 w-14 animate-spin-slow" />
        <div>
          <p className="font-display text-5xl uppercase">Love<span className="text-magenta">♥</span>Kati</p>
          <p className="mt-2 font-label text-2xl text-sun">{business.tagline}</p>
        </div>
        <div className="space-y-3">
          <a href={business.phoneHref} className="flex items-center gap-3 text-lg hover:text-sun"><Phone className="h-5 w-5" /> {business.phone}</a>
          <p className="flex items-start gap-3 text-paper/80"><MapPin className="mt-1 h-5 w-5 shrink-0" /> {business.area}</p>
          <a href={business.social.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-sun"><Facebook className="h-5 w-5" /> Facebook</a>
        </div>
        <nav className="grid grid-cols-2 gap-2 font-label text-xl uppercase" aria-label="Footer">
          <Link to="/menu" className="hover:text-sun">Menu</Link>
          <Link to="/about" className="hover:text-sun">About</Link>
          <Link to="/catering" className="hover:text-sun">Catering</Link>
          <Link to="/contact" className="hover:text-sun">Contact</Link>
          <Link to="/order-online" className="hover:text-sun">Order Online</Link>
        </nav>
      </div>
      <p className="border-t border-paper/15 py-5 text-center text-sm text-paper/60">© {new Date().getFullYear()} Love Kati. Food photos are illustrative.</p>
    </footer>
  );
}
