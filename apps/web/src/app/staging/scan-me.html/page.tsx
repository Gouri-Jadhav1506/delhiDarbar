import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | Delhi Darbar Group",
  description: "Scan to view our menu",
  robots: "noindex, nofollow",
};

export default function ScanMePage() {
  return (
    <div className="min-h-screen bg-[#031112] flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-International-Orange/10 flex items-center justify-center mx-auto animate-pulse">
          <svg className="w-8 h-8 text-International-Orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 className="text-2xl font-plus-jakarta-sans font-semibold text-white">
          Loading Menu...
        </h1>
        <p className="text-white/60 font-jost">
          Please wait while we redirect you to our menu
        </p>
        <a
          href="/skyline/our-menu"
          className="inline-flex items-center gap-2 text-International-Orange hover:underline font-jost"
        >
          Click here if not redirected
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      {/* Auto-redirect script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace('/skyline/our-menu');`,
        }}
      />
    </div>
  );
}
