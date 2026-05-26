function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Shubham Pant",
  title: "Shubham Pant — Backend Engineer",
  description:
    "Backend engineer designing distributed systems in Java & Spring Boot. Currently shipping Chronos, a distributed job scheduler.",
  url: siteUrl,
};
