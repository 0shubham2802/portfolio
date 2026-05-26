export type FeatureStatus = "shipped" | "inProgress" | "roadmap";

export const chronosFeatures: Record<FeatureStatus, string[]> = {
  shipped: [
    "JWT authentication with secure login/register",
    "One-time jobs scheduled to specific datetime",
    "Recurring jobs via cron expressions",
    "Manual job trigger (run on demand)",
    "Pause / resume for recurring jobs",
    "Exponential-backoff retry (1s → 2s → 4s → 8s, max 60s)",
    "Email jobs as a first-class scheduled type",
    "Failure notifications via email or webhook",
    "Full execution logs (attempt, status, duration, errors)",
    "Redisson-backed distributed locking — single-execution guarantee",
    "Flyway-managed Postgres schema migrations",
    "Docker Compose orchestration (Postgres + Redis + backend + frontend)",
    "React 18 + Vite frontend with nginx reverse proxy",
  ],
  inProgress: [
    "OAuth2 social login (Google / GitHub) via Spring Security",
    "Rate limiting with Bucket4j token-bucket throttling",
  ],
  roadmap: [
    "True multi-tenancy with tenant_id-scoped queries",
    "Dead-letter queue as a distinct persisted entity",
    "Prometheus metrics + Grafana dashboards",
    "Testcontainers-backed integration test suite",
    "Admin dashboard for cross-tenant ops",
  ],
};
