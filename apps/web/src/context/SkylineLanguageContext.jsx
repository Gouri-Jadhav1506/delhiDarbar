'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "skyline-language";

const SkylineLanguageContext = createContext(null);

export const SkylineLanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    return window.localStorage.getItem(STORAGE_KEY) === "fr" ? "fr" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <SkylineLanguageContext.Provider value={value}>
      {children}
    </SkylineLanguageContext.Provider>
  );
};

export const useSkylineLanguage = () => {
  const context = useContext(SkylineLanguageContext);

  if (!context) {
    throw new Error("useSkylineLanguage must be used within SkylineLanguageProvider");
  }

  return context;
};
