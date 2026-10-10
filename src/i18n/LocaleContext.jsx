import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { translations, supportedLocales } from "./translations";

const LocaleContext = createContext(null);

function detectInitialLocale() {
  const stored = localStorage.getItem("careerly_locale");
  if (stored && supportedLocales.includes(stored)) return stored;
  const envDefault = import.meta.env.VITE_DEFAULT_LOCALE;
  if (envDefault && supportedLocales.includes(envDefault)) return envDefault;
  return "uz";
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(detectInitialLocale);

  useEffect(() => {
    localStorage.setItem("careerly_locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next) => {
    if (supportedLocales.includes(next)) setLocaleState(next);
  };

  const t = useMemo(() => {
    const dict = translations[locale] || translations.uz;
    return (key) => dict[key] ?? translations.en[key] ?? key;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t, supportedLocales }),
    [locale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
