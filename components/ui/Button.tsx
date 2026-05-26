import { cn } from "@/lib/cn";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary";

interface BaseProps {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

const base =
  "group relative inline-flex items-center overflow-hidden border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors duration-[400ms] ease-out select-none";

const variants: Record<ButtonVariant, string> = {
  primary: "border-accent bg-accent-soft text-accent hover:text-base",
  secondary: "border-line text-ink-muted hover:border-accent hover:text-base",
};

function ButtonInner({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-[450ms] ease-out group-hover:scale-x-100"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );
}

export function Button({
  variant = "primary",
  href,
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    const externalProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <a
        href={href}
        className={classes}
        {...externalProps}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        <ButtonInner>{children}</ButtonInner>
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <ButtonInner>{children}</ButtonInner>
    </button>
  );
}

export default Button;
