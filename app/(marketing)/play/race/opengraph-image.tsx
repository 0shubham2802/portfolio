import { renderGameOg } from "@/lib/gameOg";

export const alt = "RACE_CONDITION — Shubham Pant arcade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderGameOg(
    "RACE_CONDITION",
    "grab the lock before the CPU — don't collide",
  );
}
