export interface ProjectBadge {
  label: string;
  variant: "solid" | "outline" | "muted";
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  report?: string;
}

export interface Project {
  slug: string;
  order: string;
  title: string;
  kind: string;
  pathLabel: string;
  oneLiner: string;
  tags: string[];
  badges: ProjectBadge[];
  links: ProjectLinks;
  featured: boolean;
  hasCaseStudy: boolean;
}

export const projects: Project[] = [
  {
    slug: "chronos",
    order: "01",
    title: "Chronos",
    kind: "backend",
    pathLabel: "distributed_job_scheduler/",
    oneLiner:
      "Multi-tenant distributed job scheduler with cron execution, Redisson-backed distributed locking, exponential-backoff retries, and email-driven failure notifications — full-stack (Spring Boot + React + Docker Compose).",
    tags: [
      "java 17",
      "spring boot 3.3.5",
      "postgres",
      "redis · redisson",
      "quartz",
      "jwt",
      "react 18",
      "vite",
      "docker",
      "nginx",
    ],
    badges: [
      { label: "CAPSTONE", variant: "solid" },
      { label: "5 PHASES", variant: "muted" },
    ],
    links: { github: "https://github.com/0shubham2802/Chronos-job-scheduler" },
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "hello-geo",
    order: "02",
    title: "Hello Geo",
    kind: "android",
    pathLabel: "ar_navigation/",
    oneLiner:
      "AR turn-by-turn navigation app fusing GPS, IMU, and visual anchors for sub-meter accuracy. Kotlin + ARCore + Jetpack Compose + custom GLSL shaders.",
    tags: [
      "kotlin",
      "arcore",
      "google maps sdk",
      "jetpack compose",
      "glsl shaders",
      "gradle",
    ],
    badges: [{ label: "ANDROID", variant: "solid" }],
    links: { github: "https://github.com/0shubham2802/Major-project" },
    featured: false,
    hasCaseStudy: true,
  },
  {
    slug: "workassist",
    order: "03",
    title: "WorkAssist",
    kind: "backend",
    pathLabel: "backend_modules/",
    oneLiner:
      "Laravel/PHP backend modules + REST endpoints shipped across 2 production projects, focused on performance and integration reliability.",
    tags: ["php / laravel", "rest", "mysql"],
    badges: [],
    links: {},
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "itshemp",
    order: "04",
    title: "ItsHemp",
    kind: "frontend",
    pathLabel: "wordpress_frontend/",
    oneLiner:
      "React frontend integrated with a WordPress CMS; restructured component rendering for a ~300ms page-load improvement.",
    tags: ["react", "wordpress", "javascript"],
    badges: [],
    links: {},
    featured: false,
    hasCaseStudy: false,
  },
];
