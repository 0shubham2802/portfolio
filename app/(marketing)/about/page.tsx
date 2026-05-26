import type { Metadata } from "next";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Timeline } from "@/components/sections/Timeline";
import { stack } from "@/content/stack";
import { timeline } from "@/content/timeline";

export const metadata: Metadata = {
  title: "About — Shubham Pant",
  description:
    "Backend engineer based in Mumbai, designing distributed systems in Java and Spring Boot. Background, stack, and timeline.",
};

export default function AboutPage() {
  return (
    <section className="enter-fade-up space-y-14 pt-8">
      <Reveal className="space-y-4">
        <MonoLabel as="p" className="normal-case">
          &gt; about_me.md
        </MonoLabel>
        <h1 className="text-[clamp(32px,5vw,48px)] font-medium leading-[0.95] tracking-[-1px] text-ink">
          About<span className="text-accent">.</span>
        </h1>
      </Reveal>

      <div className="space-y-4">
        <p className="max-w-2xl text-[16px] leading-[1.65] text-ink-secondary">
          Shubham is a backend engineer based in Mumbai, India, focused on
          designing distributed systems in Java and Spring Boot. He is currently
          building Chronos, a distributed job scheduler.
        </p>
        <p className="max-w-2xl text-[16px] leading-[1.65] text-ink-secondary">
          He holds an MCA from Manipal University Jaipur and a BCA from
          Chandigarh University, and has shipped production work across the
          backend (Laravel/PHP at WorkAssist) and the frontend (React at
          ItsHemp). He is currently exploring backend and platform engineering
          roles.
        </p>
      </div>

      <section className="space-y-4">
        <MonoLabel as="h2" tone="muted">
          {"// PRIMARY_STACK"}
        </MonoLabel>
        <ul className="flex flex-wrap gap-2">
          {stack.primary.map((item) => (
            <li key={item}>
              <Pill variant="tag">{item}</Pill>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <MonoLabel as="h2" tone="muted">
          {"// TOOLKIT"}
        </MonoLabel>
        <ul className="flex flex-wrap gap-2">
          {stack.toolkit.map((item) => (
            <li key={item}>
              <Pill variant="tag">{item}</Pill>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <MonoLabel as="h2" tone="muted">
          {"// TIMELINE"}
        </MonoLabel>
        <Timeline entries={timeline} />
      </section>
    </section>
  );
}
