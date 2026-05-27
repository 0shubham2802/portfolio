import type { Metadata } from "next";

import { CaseStudyHeader } from "@/components/sections/CaseStudyHeader";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Pill } from "@/components/ui/Pill";

const oneLiner =
  "AR turn-by-turn navigation app fusing GPS, IMU, and visual anchors for sub-meter accuracy.";

const github = "https://github.com/0shubham2802/Major-project";

const tags = [
  "kotlin",
  "arcore",
  "google maps sdk",
  "jetpack compose",
  "glsl shaders",
  "gradle",
];

const gallerySlots = [
  "Pending screenshot of the AR navigation overlay",
  "Pending screenshot of the route map view",
  "Pending screenshot of the anchor calibration screen",
];

export const metadata: Metadata = {
  title: "Hello Geo — Shubham Pant",
  description: oneLiner,
};

export default function HelloGeoPage() {
  return (
    <article className="enter-fade-up pt-8 space-y-16">
      <CaseStudyHeader
        title="Hello Geo"
        pathLabel="ar_navigation/"
        badges={[{ label: "ANDROID", variant: "solid" }]}
      />

      <p className="max-w-2xl text-[17px] leading-[1.65] text-ink-secondary">
        {oneLiner}
      </p>

      <section className="space-y-6">
        <MonoLabel as="p">{"// GALLERY"}</MonoLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {gallerySlots.map((label) => (
            <div
              key={label}
              aria-label={label}
              className="flex aspect-[16/9] items-center justify-center border border-line-subtle bg-surface"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
                screenshot pending
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <MonoLabel as="p">{"// TECHNICAL_BRIEF"}</MonoLabel>
        <div className="max-w-2xl space-y-4">
          <p className="text-[16px] leading-[1.65] text-ink-secondary">
            The app fuses{" "}
            <span className="text-ink">GPS, IMU, and visual anchors</span> so
            positioning stays accurate to roughly a meter even where raw GPS
            drifts. <span className="text-ink">ARCore</span> handles scene
            anchoring, and the rendering targets a steady{" "}
            <span className="text-ink">60fps</span> so AR arrows stay locked to
            the world rather than swimming. The UI is built in{" "}
            <span className="text-ink">Jetpack Compose</span>.
          </p>
          <p className="text-[16px] leading-[1.65] text-ink-secondary">
            Roughly <span className="text-ink">2.7% of the codebase</span> is
            custom <span className="text-ink">GLSL shaders</span> — hand-written
            graphics work for the AR overlays rather than off-the-shelf
            components, which is the kind of low-level rendering most navigation
            apps never touch.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <MonoLabel as="p">{"// STACK"}</MonoLabel>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag} variant="tag">
              {tag}
            </Pill>
          ))}
        </div>
      </section>

      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <Button href={github} external>
          GITHUB ↗
        </Button>
        <Button variant="secondary" href="#" external>
          PROJECT_REPORT.PDF ↗
        </Button>
        <Button variant="secondary" href="/work">
          ← BACK_TO_WORK
        </Button>
      </div>
    </article>
  );
}
