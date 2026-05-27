import { NextRequest, NextResponse } from "next/server";
import {
  getHeatmap,
  getRecent,
  paintCell,
  isRateLimited,
  clearHeatmap,
  kvConfigured,
} from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!kvConfigured) {
    return NextResponse.json({ cells: {}, recent: [], configured: false });
  }
  try {
    const [cells, recent] = await Promise.all([getHeatmap(), getRecent()]);
    return NextResponse.json({ cells, recent, configured: true });
  } catch {
    return NextResponse.json({ cells: {}, recent: [], configured: false });
  }
}

export async function POST(req: NextRequest) {
  if (!kvConfigured) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { cell, intensity } = (body ?? {}) as {
    cell?: unknown;
    intensity?: unknown;
  };

  if (typeof cell !== "string" || !/^\d{1,2},\d{1,2}$/.test(cell)) {
    return NextResponse.json({ error: "invalid_cell" }, { status: 400 });
  }
  if (intensity !== 1) {
    return NextResponse.json({ error: "invalid_intensity" }, { status: 400 });
  }

  try {
    if (await isRateLimited(ip)) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    const value = await paintCell(cell);
    return NextResponse.json({ ok: true, cell, value });
  } catch {
    return NextResponse.json({ error: "kv_error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await clearHeatmap();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "kv_error" }, { status: 500 });
  }
}
