import { renderGameOg } from "@/lib/gameOg";

export const alt = "SCHEDULE_HACK — Shubham Pant arcade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGameOg(
    "SCHEDULE_HACK",
    "dispatch jobs before they expire to the DLQ",
  );
}
