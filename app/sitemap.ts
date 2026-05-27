import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/work",
    "/about",
    "/contact",
    "/writing",
    "/play",
    "/play/heatmap",
    "/play/race",
    "/play/schedule-hack",
  ];
  const caseStudyRoutes = projects
    .filter((project) => project.hasCaseStudy)
    .map((project) => `/work/${project.slug}`);

  return [...staticRoutes, ...caseStudyRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
