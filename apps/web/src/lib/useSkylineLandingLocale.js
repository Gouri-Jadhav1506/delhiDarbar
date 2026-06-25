'use client';

import { useSkylineLanguage } from "@/context/SkylineLanguageContext";
import { usePathname } from "next/navigation";

export const useSkylineLandingLocale = () => {
  const pathname = usePathname();
  const { locale } = useSkylineLanguage();
  const isSkylinePage = pathname.startsWith("/skyline");
  const isFrench = isSkylinePage && locale === "fr";

  return {
    locale,
    isSkylinePage,
    isFrench,
  };
};
