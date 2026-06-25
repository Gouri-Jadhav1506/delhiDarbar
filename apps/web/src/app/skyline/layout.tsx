import SiteLayout from "@/components/layouts/SiteLayout";

export default function SkylineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
