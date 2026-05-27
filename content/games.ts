export interface GameMeta {
  slug: string;
  order: string;
  title: string; // mono .EXE-style id, e.g. "CONTRIBUTION_HEATMAP"
  name: string; // display name, e.g. "Contribution Heatmap"
  tagline: string;
  description: string;
  mechanic: "STRATEGY" | "REFLEX" | "CREATIVE";
  length: string; // "60s" / "30s" / "ZEN"
  route: string;
  scoreKey?: string; // localStorage high-score key; absent for the heatmap
}

export const games: GameMeta[] = [
  {
    slug: "heatmap",
    order: "01",
    title: "CONTRIBUTION_HEATMAP",
    name: "Contribution Heatmap",
    tagline: "paint a cell — everyone shares one grid",
    description:
      "A GitHub-style contribution grid every visitor paints into. My real graph is sparse, so fill it in for me. Shared, persistent, no timer.",
    mechanic: "CREATIVE",
    length: "ZEN",
    route: "/play/heatmap",
  },
  {
    slug: "race",
    order: "02",
    title: "RACE_CONDITION",
    name: "Race Condition",
    tagline: "grab the lock before the CPU — don't collide",
    description:
      "A 30-second reflex duel for a lock token. Click within 50ms of the CPU and you collide — nobody wins. It's why Chronos uses Redisson.",
    mechanic: "REFLEX",
    length: "30s",
    route: "/play/race",
    scoreKey: "race-condition",
  },
  {
    slug: "schedule-hack",
    order: "03",
    title: "SCHEDULE_HACK",
    name: "Schedule Hack",
    tagline: "dispatch jobs before they expire to the DLQ",
    description:
      "A 60-second arcade dispatcher. Jobs spawn on a timeline; tap an idle worker to run them. Miss the window and they expire to the dead-letter queue.",
    mechanic: "STRATEGY",
    length: "60s",
    route: "/play/schedule-hack",
    scoreKey: "schedule-hack",
  },
];
