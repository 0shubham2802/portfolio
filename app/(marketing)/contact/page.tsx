import type { Metadata } from "next";

import { MonoLabel } from "@/components/ui/MonoLabel";
import { ContactForm } from "@/components/sections/ContactForm";
import { bio } from "@/content/bio";

export const metadata: Metadata = {
  title: "Contact — Shubham Pant",
  description:
    "Get in touch with Shubham Pant about backend and platform engineering roles. The fastest way to reach me is email.",
};

interface Channel {
  label: string;
  href: string;
  handle: string;
  external: boolean;
}

const channels: Channel[] = [
  {
    label: "EMAIL",
    href: `mailto:${bio.contact.email}`,
    handle: bio.contact.email,
    external: false,
  },
  {
    label: "LINKEDIN",
    href: bio.contact.linkedin,
    handle: "in/pantshubham",
    external: true,
  },
  {
    label: "GITHUB",
    href: bio.contact.github,
    handle: "0shubham2802",
    external: true,
  },
  {
    label: "STACKOVERFLOW",
    href: bio.contact.stackoverflow,
    handle: "shubham-alap-pant",
    external: true,
  },
  {
    label: "TWITTER",
    href: bio.contact.twitter,
    handle: "@imSpant",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <section className="enter-fade-up pt-8 space-y-12">
      <header className="space-y-4">
        <MonoLabel className="normal-case">&gt; contact.sh</MonoLabel>
        <h1 className="font-medium leading-[0.95] tracking-[-1px] text-[clamp(32px,5vw,48px)] text-ink">
          Contact<span className="text-accent">.</span>
        </h1>
        <p className="text-[16px] leading-[1.65] text-ink-secondary max-w-md">
          Open to backend and platform engineering roles. The fastest way to
          reach me is email.
        </p>
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-positive"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-secondary">
            {bio.status}
            <span className="text-ink-muted"> · {bio.location}</span>
          </span>
        </div>
      </header>

      <div className="space-y-4">
        <MonoLabel as="div" tone="muted">
          {"// CHANNELS"}
        </MonoLabel>
        <ul className="flex flex-col gap-3">
          {channels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-[12px] tracking-[0.04em] text-ink-secondary hover:text-accent transition-colors duration-200 ease-out"
              >
                {channel.label} {channel.external ? "↗" : "→"}
                <span className="text-ink-muted"> {channel.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <MonoLabel as="div" tone="muted">
          {"// SEND_MESSAGE"}
        </MonoLabel>
        <ContactForm email={bio.contact.email} />
      </div>
    </section>
  );
}
