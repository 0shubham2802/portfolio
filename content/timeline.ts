export interface TimelineEntry {
  when: string;
  title: string;
  org?: string;
  points?: string[];
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    when: "Jul – Sep 2025",
    title: "Software Developer Intern",
    org: "WorkAssist",
    points: [
      "Built Laravel/PHP backend modules and REST endpoints across two production projects.",
      "Tuned query performance and hardened third-party API integrations for reliability.",
    ],
    current: true,
  },
  {
    when: "Aug 2024 – Jan 2025",
    title: "Tech & SWE Intern",
    org: "ItsHemp",
    points: [
      "Built the React frontend on top of a WordPress CMS.",
      "Restructured component rendering for a ~300ms page-load improvement.",
    ],
  },
  {
    when: "2023 – 2025",
    title: "Manipal University Jaipur",
    points: ["MCA — Master of Computer Applications", "CGPA 8.20"],
  },
  {
    when: "2020 – 2023",
    title: "Chandigarh University, Mohali",
    points: ["BCA — Bachelor of Computer Applications"],
  },
];
