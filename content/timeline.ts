export interface TimelineEntry {
  when: string;
  title: string;
  org: string;
  detail?: string;
  current?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    when: "Jul – Sep 2025",
    title: "Software Developer Intern",
    org: "WorkAssist",
    detail:
      "Laravel/PHP backend modules + REST endpoints across 2 production projects.",
    current: true,
  },
  {
    when: "Aug 2024 – Jan 2025",
    title: "Tech & SWE Intern",
    org: "ItsHemp",
    detail: "React frontend on a WordPress CMS; cut page load ~300ms.",
  },
  {
    when: "2023 – 2025",
    title: "MCA · 8.20 CGPA",
    org: "Manipal University Jaipur",
  },
  {
    when: "2020 – 2023",
    title: "BCA",
    org: "Chandigarh University, Mohali",
  },
];
