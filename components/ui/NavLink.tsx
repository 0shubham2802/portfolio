import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

interface NavLinkProps
  extends Omit<ComponentProps<typeof Link>, "href" | "className" | "children"> {
  href: string;
  active?: boolean;
  accent?: boolean;
  className?: string;
  children: ReactNode;
}

const base =
  "font-mono text-[11px] tracking-[0.08em] uppercase transition-colors duration-200 ease-out";

export function NavLink({
  href,
  active,
  accent,
  className,
  children,
  ...rest
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        base,
        active || accent ? "text-accent" : "text-ink-muted hover:text-ink",
        className,
      )}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default NavLink;
