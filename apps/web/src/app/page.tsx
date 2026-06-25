import Link from "next/link";
import Image from "next/image";

export default function GatewayPage() {
  return (
    <div className="min-h-screen bg-[#0D2221] flex flex-col">
      {/* main gateway */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
        <div className="text-center mb-12 md:mb-16 space-y-4 max-w-2xl">
          <p className="text-[#FADFA1] font-satisfy text-xl md:text-2xl">
            Welcome to
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-plus-jakarta-sans font-bold text-white leading-tight">
            Delhi Darbar Group
          </h1>
          <p className="text-[#B4C4C4] font-jost text-base md:text-lg leading-relaxed">
            Choose your experience
          </p>
        </div>

        {/* Mobile: Tile Grid Layout | Desktop: Original Cards */}
        <div className="w-full max-w-5xl">
          {/* Mobile Tile Grid - 2 columns, compact and aesthetic */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {/* Skyline Tile */}
            <Link
              href="/skyline"
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 active:scale-95"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FADFA1]/20 via-transparent to-[#FADFA1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col items-center text-center gap-3">
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center p-2">
                  <Image
                    src="/assets/images/skyline.png"
                    alt="Skyline"
                    width={60}
                    height={40}
                    className="w-full h-full object-contain"
                    style={{ height: 'auto' }}
                  />
                </div>
                
                {/* Title */}
                <div className="space-y-1">
                  <h3 className="text-lg font-plus-jakarta-sans font-semibold text-white">
                    Skyline
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#FADFA1]/70 font-jost">
                    Rooftop Dining
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="w-8 h-8 rounded-full bg-[#FADFA1]/10 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-[#FADFA1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Spice n Bliss Tile */}
            <Link
              href="/spicenbliss"
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 active:scale-95"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFD84D]/20 via-transparent to-[#FFD84D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex flex-col items-center text-center gap-3">
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center p-2">
                  <Image
                    src="/assets/images/spice_n_bliss_logo.png"
                    alt="Spice n Bliss"
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                    style={{ height: 'auto' }}
                  />
                </div>
                
                {/* Title */}
                <div className="space-y-1">
                  <h3 className="text-lg font-plus-jakarta-sans font-semibold text-white">
                    Spice n Bliss
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#FFD84D]/70 font-jost">
                    E-Commerce
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="w-8 h-8 rounded-full bg-[#FFD84D]/10 flex items-center justify-center mt-1">
                  <svg className="w-4 h-4 text-[#FFD84D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop: Original Cards Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Skyline Card */}
            <Link
              href="/skyline"
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a1c1c] to-[#031514] p-[1px] transition-all duration-500 hover:border-[#FADFA1]/30 hover:shadow-2xl hover:shadow-[#FADFA1]/5"
            >
              <div className="rounded-3xl bg-gradient-to-br from-[#0a1c1c] to-[#031514] p-8 md:p-10 lg:p-12 flex flex-col gap-6 min-h-[400px] justify-between relative overflow-hidden">
                {/* ambient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD84D]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#FFD84D]/10 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFD84D]/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* icon/logo */}
                  <div className="w-20 h-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center p-2.5 group-hover:border-[#FADFA1]/30 transition-colors duration-500">
                    <Image
                      src="/assets/images/skyline.png"
                      alt="Skyline logo"
                      width={100}
                      height={40}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(250,223,161,0.2)]"
                      style={{ height: 'auto' }}
                    />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-plus-jakarta-sans font-semibold text-white group-hover:text-[#FADFA1] transition-colors duration-300">
                    Skyline
                  </h2>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#FADFA1]/60 font-plus-jakarta-sans">
                    By Delhi Darbar
                  </p>
                </div>

                <div className="relative z-10 space-y-4">
                  <p className="text-[#B4C4C4] font-jost leading-relaxed text-sm md:text-base">
                    Rooftop lounge bar &amp; Indian restaurant with panoramic city
                    views, signature cocktails, and authentic cuisine.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#FADFA1]/50 group-hover:w-14 transition-all duration-500" />
                    <span className="text-[#FADFA1]/60 font-jost text-xs uppercase tracking-[0.3em] group-hover:text-[#FADFA1] transition-colors duration-300">
                      Explore
                    </span>
                    <svg className="w-4 h-4 text-[#FADFA1]/60 group-hover:text-[#FADFA1] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Spice n Bliss Card */}
            <Link
              href="/spicenbliss"
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0a1c1c] to-[#031514] p-[1px] transition-all duration-500 hover:border-[#FFD84D]/30 hover:shadow-2xl hover:shadow-[#FFD84D]/5"
            >
              <div className="rounded-3xl bg-gradient-to-br from-[#0a1c1c] to-[#031514] p-8 md:p-10 lg:p-12 flex flex-col gap-6 min-h-[400px] justify-between relative overflow-hidden">
                {/* ambient glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD84D]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#FFD84D]/10 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FADFA1]/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* icon */}
                  <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur flex items-center justify-center p-1.5 group-hover:border-[#FFD84D]/30 transition-colors duration-500">
                    <Image
                      src="/assets/images/spice_n_bliss_logo.png"
                      alt="Spice n Bliss logo"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,216,77,0.2)]"
                      style={{ height: 'auto' }}
                    />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-plus-jakarta-sans font-semibold text-white group-hover:text-[#FFD84D] transition-colors duration-300">
                    Spice n Bliss
                  </h2>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#FFD84D]/60 font-plus-jakarta-sans">
                    E-Commerce
                  </p>
                </div>

                <div className="relative z-10 space-y-4">
                  <p className="text-[#B4C4C4] font-jost leading-relaxed text-sm md:text-base">
                    A curated collection of bracelets, earrings, and accessories delivered to your door.
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#FFD84D]/50 group-hover:w-14 transition-all duration-500" />
                    <span className="text-[#FFD84D]/60 font-jost text-xs uppercase tracking-[0.3em] group-hover:text-[#FFD84D] transition-colors duration-300">
                      Explore Shop
                    </span>
                    <svg className="w-4 h-4 text-[#FFD84D]/60 group-hover:text-[#FFD84D] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* footer */}
      <footer className="py-6 text-center">
        <p className="text-[#B4C4C4]/50 font-jost text-sm">
          &copy; {new Date().getFullYear()} Delhi Darbar Group. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
