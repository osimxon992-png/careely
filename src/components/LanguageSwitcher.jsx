import { useLocale } from "../i18n/LocaleContext";

const LABELS = { uz: "UZ", en: "EN", ru: "RU" };

export default function LanguageSwitcher({ dark = false }) {
  const { locale, setLocale, supportedLocales } = useLocale();
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-1 text-xs ${
        dark ? "bg-white/10" : "bg-ink/5"
      }`}
    >
      {supportedLocales.map((code) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={`rounded-full px-2.5 py-1.5 font-semibold transition ${
            locale === code
              ? dark
                ? "bg-lime text-ink"
                : "bg-surface text-ink shadow-sm"
              : dark
                ? "text-slate-300 hover:text-white"
                : "text-muted hover:text-ink"
          }`}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
