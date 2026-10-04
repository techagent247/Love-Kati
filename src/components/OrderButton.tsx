import { Link } from "@tanstack/react-router";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

export function OrderButton({ className, label = "Order Online" }: { className?: string; label?: string }) {
  if (business.orderOnlineUrl) {
    return (
      <a href={business.orderOnlineUrl} target="_blank" rel="noreferrer" className={cn("btn-pop", className)}>
        {label}
      </a>
    );
  }
  return (
    <Link to="/order-online" className={cn("btn-pop", className)}>
      {label}
    </Link>
  );
}
