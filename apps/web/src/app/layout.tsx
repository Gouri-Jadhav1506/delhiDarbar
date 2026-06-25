import type { Metadata } from "next";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = "https://delhidarbargroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Delhi Darbar Group",
    template: "%s | Delhi Darbar Group",
  },
  description: "Delhi Darbar Group hospitality destinations, including Skyline rooftop dining in Abidjan.",
  applicationName: "Delhi Darbar Group",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Delhi Darbar Group",
    url: siteUrl,
    title: "Delhi Darbar Group",
    description: "Delhi Darbar Group hospitality destinations, including Skyline rooftop dining in Abidjan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delhi Darbar Group",
    description: "Delhi Darbar Group hospitality destinations, including Skyline rooftop dining in Abidjan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
