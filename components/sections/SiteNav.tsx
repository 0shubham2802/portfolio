"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { bio } from "@/content/bio";

const links = [
  { label: "WORK", href: "/work" },
  { label: "STACK", href: "/about" },
  { label: "WRITING", href: "/writing" },
  { label: "CONTACT", href: "/contact" },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label={`${bio.monogram} ${bio.name}, home`}
          className="font-mono text-[15px] tracking-[0.12em] text-ink transition-colors duration-200 ease-out hover:text-accent"
        >
          {bio.monogram}
        </Link>

        <div className="hidden items-center gap-[22px] md:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              active={isActive(pathname, link.href)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted transition-colors duration-200 ease-out hover:text-ink md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mt-5 flex flex-col items-start gap-4 md:hidden"
        >
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              active={isActive(pathname, link.href)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default SiteNav;
