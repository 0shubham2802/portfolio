import { Pill } from "@/components/ui/Pill";
import type { FeatureStatus } from "@/content/chronos-features";

interface FeatureBadgeProps {
  status: FeatureStatus;
}

export function FeatureBadge({ status }: FeatureBadgeProps) {
  switch (status) {
    case "shipped":
      return <Pill variant="solid">SHIPPED</Pill>;
    case "inProgress":
      return (
        <Pill variant="outline" dashed>
          IN PROGRESS
        </Pill>
      );
    case "roadmap":
      return (
        <Pill variant="muted" dashed>
          ROADMAP
        </Pill>
      );
  }
}

export default FeatureBadge;
