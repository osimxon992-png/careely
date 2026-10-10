import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLocale } from "../i18n/LocaleContext";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useLocale();
  const columns = [
    [
      t("footerSeekers"),
      [
        ["/jobs", t("footerBrowse")],
        ["/internships", t("navInternships")],
        ["/career-advice", t("navAdvice")],
        ["/signup", t("signup")],
      ],
    ],
    [
      t("footerEmployers"),
      [
        ["/signup", t("footerPost")],
        ["/pricing", t("navPricing")],
        ["/companies", t("navCompanies")],
      ],
    ],
    [
      t("footerCompany"),
      [
        ["/about", t("navAbout")],
        ["/contact", t("footerContact")],
        ["/privacy", t("footerPrivacy")],
        ["/terms", t("footerTerms")],
      ],
    ],
  ];

  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[2rem] bg-ink text-slate-300 sm:rounded-[2.5rem]">
        <div className="bg-grid-light pointer-events-none absolute inset-0" />
        <div className="relative grid gap-12 px-6 pt-14 pb-10 sm:grid-cols-3 sm:px-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-14 lg:pt-20">
          <div className="max-w-sm sm:col-span-3 lg:col-span-1">
            <Logo dark />
            <p className="mt-5 text-[15px] leading-relaxed text-slate-400">{t("footerTagline")}</p>
            <div className="mt-7 space-y-3 text-sm">
              <a
                href="mailto:support@careerly.example"
                className="flex items-center gap-2.5 transition hover:text-lime"
              >
                <Mail className="h-4 w-4 text-lime" /> support@careerly.example
              </a>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-lime" /> Tashkent, Uzbekistan
              </p>
            </div>
          </div>
          {columns.map(([title, links]) => (
            <div key={title}>
              <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
                {title}
              </p>
              <ul className="space-y-3 text-[15px]">
                {links.map(([to, label]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="group inline-flex items-center gap-1 text-slate-300 transition hover:text-white"
                    >
                      {label}
                      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:text-lime group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          aria-hidden="true"
          className="relative -mb-[0.22em] px-4 text-center text-[22vw] leading-none font-semibold tracking-[-0.07em] text-white/[0.06] select-none lg:text-[15.5rem]"
        >
          careerly
        </p>

        <div className="relative border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:px-10 lg:px-14">
            <p>
              © {new Date().getFullYear()} Careerly. {t("footerRights")}
            </p>
            <p className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Made in Uzbekistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
