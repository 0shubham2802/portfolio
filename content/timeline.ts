export type TimelineItem = {
  when: string;
  org: string;
  current?: boolean;
  bullets: string[];
};

export const timeline: TimelineItem[] = [
  {
    when: "Jul – Sep 2025",
    org: "WorkAssist",
    current: true,
    bullets: [
      "Software Developer Intern",
      "Laravel/PHP backend modules + REST endpoints",
      "Shipped across 2 production projects",
    ],
  },
  {
    when: "Aug 2024 – Jan 2025",
    org: "ItsHemp",
    bullets: [
      "Tech & SWE Intern",
      "React frontend integrated with a WordPress CMS",
      "Restructured component rendering for ~300ms TTI improvement",
    ],
  },
  {
    when: "2023 – 2025",
    org: "Manipal University Jaipur",
    bullets: ["Master of Computer Applications (MCA)", "CGPA 8.20"],
  },
  {
    when: "2020 – 2023",
    org: "Chandigarh University, Mohali",
    bullets: ["Bachelor of Computer Applications (BCA)"],
  },
];
