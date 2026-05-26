import { SiteNav } from "@/components/sections/SiteNav";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="top" className="mx-auto w-full max-w-screen-2xl px-8 lg:px-12">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
