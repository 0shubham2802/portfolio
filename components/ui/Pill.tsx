import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type PillVariant = "solid" | "outline" | "muted" | "tag";

interface PillProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  variant?: PillVariant;
  dashed?: boolean;
  className?: string;
  children: ReactNode;
}

const base =
  "inline-flex items-center font-mono text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 border leading-none";

const variants: Record<PillVariant, string> = {
  solid: "bg-accent border-accent text-base",
  outline: "border-accent text-accent",
  muted: "border-line text-ink-muted",
  tag: "border-line-subtle text-ink-secondary normal-case lowercase",
};

export function Pill({
  variant = "tag",
  dashed,
  className,
  children,
  ...rest
}: PillProps) {
  return (
    <span
      className={cn(
        base,
        variants[variant],
        dashed && "border-dashed",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Pill;
