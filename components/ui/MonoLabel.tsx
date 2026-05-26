import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type MonoLabelElement = "span" | "div" | "p" | "h2" | "h3" | "h4";
type MonoLabelTone = "accent" | "muted";

interface MonoLabelProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  as?: MonoLabelElement;
  tone?: MonoLabelTone;
  className?: string;
  children: ReactNode;
}

const base = "font-mono text-[11px] tracking-[0.1em] uppercase";

const tones: Record<MonoLabelTone, string> = {
  accent: "text-accent",
  muted: "text-ink-muted",
};

export function MonoLabel({
  as: Component = "span",
  tone = "accent",
  className,
  children,
  ...rest
}: MonoLabelProps) {
  return (
    <Component className={cn(base, tones[tone], className)} {...rest}>
      {children}
    </Component>
  );
}

export default MonoLabel;
