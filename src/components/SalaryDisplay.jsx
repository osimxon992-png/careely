import { useLocale } from "../i18n/LocaleContext";

export default function SalaryDisplay({ min, max, currency = "UZS", className = "" }) {
  const { t, locale } = useLocale();
  if (!min && !max) {
    return <span className={`text-sm text-muted ${className}`}>{t("salaryNotSpecified")}</span>;
  }
  const size = /text-(xs|sm|base|lg|xl|\dxl)/.test(className) ? "" : "text-sm";
  const fmt = (n) =>
    new Intl.NumberFormat(locale === "uz" ? "uz-UZ" : locale, {
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <span className={`${size} font-semibold tracking-tight text-text ${className}`}>
      {min && max ? `${fmt(min)} – ${fmt(max)}` : fmt(min || max)}{" "}
      <span className="font-normal text-muted">{currency}</span>
    </span>
  );
}
