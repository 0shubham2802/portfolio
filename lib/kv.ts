import { createClient } from "@vercel/kv";

// Works whether the connected store exposes Vercel-KV-style env (KV_REST_API_*)
// or Upstash-style env (UPSTASH_REDIS_REST_*).
const url =
  process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
const token =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";

export const kvConfigured = Boolean(url && token);

const kv = createClient({ url, token });

const HEATMAP_KEY = "heatmap:v1:cells";
const RECENT_KEY = "heatmap:v1:recent";
const RATE_LIMIT_PREFIX = "heatmap:v1:rl:";

export interface RecentPaint {
  cell: string;
  value: number;
  t: number;
}

export async function getHeatmap(): Promise<Record<string, number>> {
  return (await kv.hgetall<Record<string, number>>(HEATMAP_KEY)) ?? {};
}

export async function getRecent(): Promise<RecentPaint[]> {
  return (await kv.lrange<RecentPaint>(RECENT_KEY, 0, 9)) ?? [];
}

export async function paintCell(cellKey: string): Promise<number> {
  const current = (await kv.hget<number>(HEATMAP_KEY, cellKey)) ?? 0;
  const next = Math.min(4, current + 1);
  await kv.hset(HEATMAP_KEY, { [cellKey]: next });
  await kv.lpush(RECENT_KEY, { cell: cellKey, value: next, t: Date.now() });
  await kv.ltrim(RECENT_KEY, 0, 9);
  return next;
}

export async function isRateLimited(ip: string): Promise<boolean> {
  const key = `${RATE_LIMIT_PREFIX}${ip}`;
  const count = await kv.incr(key);
  if (count === 1) await kv.expire(key, 2); // 2-second window
  return count > 1;
}

export async function clearHeatmap(): Promise<void> {
  await kv.del(HEATMAP_KEY);
}
