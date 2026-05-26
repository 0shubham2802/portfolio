import { MonoLabel } from "@/components/ui/MonoLabel";
import { Button } from "@/components/ui/Button";
import {
  MouseParallaxGroup,
  MouseParallaxLayer,
} from "@/components/ui/MouseParallax";
import { StatusBar } from "@/components/sections/StatusBar";
import { OrbitalSceneMount } from "@/components/three/OrbitalSceneMount";
import { bio } from "@/content/bio";

export function Hero() {
  return (
    <section className="enter-fade-up pt-12">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1fr]">
        <MouseParallaxGroup className="flex flex-col gap-6">
          <MouseParallaxLayer depth={8}>
            <MonoLabel>{bio.kicker}</MonoLabel>
          </MouseParallaxLayer>

          <MouseParallaxLayer depth={18}>
            <h1 className="font-medium leading-[0.95] tracking-[-2px] text-[clamp(44px,7vw,84px)] text-ink">
              Shubham
              <br />
              Pant<span className="text-accent">.</span>
            </h1>
          </MouseParallaxLayer>

          <MouseParallaxLayer depth={12}>
            <p className="max-w-[380px] text-[16px] leading-[1.65] text-ink-secondary">
              {bio.tagline}
            </p>
          </MouseParallaxLayer>

          <MouseParallaxLayer depth={6}>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button href="/work" variant="primary">
                VIEW_WORK →
              </Button>
              <Button href="/resume.pdf" variant="secondary" external>
                RESUME.PDF
              </Button>
            </div>
          </MouseParallaxLayer>
        </MouseParallaxGroup>

        <div className="flex h-[380px] w-full items-center justify-center">
          <OrbitalSceneMount className="h-full w-full max-w-[620px]" />
        </div>
      </div>

      <div className="mt-8">
        <StatusBar />
      </div>
    </section>
  );
}

export default Hero;
