'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    const isFirefox =
      typeof navigator !== "undefined" && navigator.userAgent.includes("Firefox");

    if (isFirefox && typeof document !== "undefined") {
      document.body.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;
