import type { Metadata } from "next";

import { MonoLabel } from "@/components/ui/MonoLabel";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work — Shubham Pant",
  description:
    "Selected work by Shubham Pant: backend systems, an AR navigation app, and production frontend engineering.",
};

export default function WorkPage() {
  return (
    <section className="enter-fade-up pt-8">
      <Reveal className="flex flex-col gap-5">
        <MonoLabel>{"> SELECTED_WORK / index_of_04"}</MonoLabel>

        <h1 className="font-medium leading-[0.95] tracking-[-1px] text-[clamp(32px,5vw,48px)] text-ink">
          Selected work<span className="text-accent">.</span>
        </h1>

        <p className="max-w-md text-[16px] leading-[1.65] text-ink-secondary">
          Backend systems, an AR navigation app, and production frontend work.
        </p>
      </Reveal>

      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
