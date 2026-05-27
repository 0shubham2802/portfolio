import type { Metadata } from "next";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Writing — Shubham Pant",
  description: "Notes on distributed systems, Java, and backend engineering.",
};

export default function WritingPage() {
  return (
    <section className="enter-fade-up flex min-h-[50vh] flex-col justify-center gap-5 pt-8">
      <MonoLabel>{"> WRITING"}</MonoLabel>

      <h1 className="font-medium leading-[0.95] tracking-[-1px] text-[clamp(32px,5vw,48px)] text-ink">
        Writing<span className="text-accent">.</span>
      </h1>

      <p className="max-w-md text-[16px] leading-[1.65] text-ink-secondary">
        Notes on distributed systems, Java, and backend engineering — coming
        soon.
      </p>

      <div className="pt-2">
        <Button href="/" variant="secondary">
          ← BACK_HOME
        </Button>
      </div>
    </section>
  );
}
