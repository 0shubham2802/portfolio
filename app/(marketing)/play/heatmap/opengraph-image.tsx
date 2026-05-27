import { renderGameOg } from "@/lib/gameOg";

export const alt = "CONTRIBUTION_HEATMAP — Shubham Pant arcade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGameOg(
    "CONTRIBUTION_HEATMAP",
    "paint a cell — everyone shares one grid",
  );
}
