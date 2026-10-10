import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogOut, ArrowUpRight } from "lucide-react";
import { useLocale } from "../i18n/LocaleContext";
import { useAuth } from "../context/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const LINKS = [
  ["/jobs", "navJobs"],
  ["/companies", "navCompanies"],
  ["/internships", "navInternships"],
  ["/career-advice", "navAdvice"],
  ["/pricing", "navPricing"],
  ["/about", "navAbout"],
];

export default function PublicNavbar() {
  const { t } = useLocale();
  const { user, role, signOut } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition ${
      isActive ? "bg-ink text-white" : "text-slate-600 hover:bg-ink/5 hover:text-ink"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition ${
      isActive ? "bg-ink text-white" : "text-text hover:bg-ink/5"
    }`;

  const dashboardPath =
    role === "employer" ? "/employer" : role === "admin" ? "/admin" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-4 rounded-full border pr-2 pl-5 transition duration-300 ${
          scrolled || open
            ? "border-border bg-surface/85 shadow-(--shadow-soft) backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map(([to, key]) => (
            <NavLink key={to} to={to} className={linkClass}>
              {t(key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          {user ? (
            <div className="hidden items-center gap-1.5 md:flex">
              <Link to={dashboardPath} className="btn btn-sm btn-ghost">
                <LayoutDashboard className="h-4 w-4" /> {t("dashboard")}
              </Link>
              <button onClick={signOut} className="btn btn-sm btn-primary">
                {t("signOut")}
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-1.5 md:flex">
              <Link to="/login" className="btn btn-sm btn-ghost">
                {t("login")}
              </Link>
              <Link to="/signup" className="btn btn-sm btn-primary group">
                {t("signup")}
                <ArrowUpRight className="h-4 w-4 text-lime transition group-hover:rotate-45" />
              </Link>
            </div>
          )}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-up mx-auto mt-2 max-w-[1320px] rounded-[1.75rem] border border-border bg-surface p-3 shadow-(--shadow-lift) xl:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map(([to, key]) => (
              <NavLink key={to} to={to} className={mobileLinkClass}>
                {t(key)}
                <ArrowUpRight className="h-4 w-4 opacity-40" />
              </NavLink>
            ))}
            <div className="mt-2 border-t border-border px-1 pt-3 sm:hidden">
              <LanguageSwitcher />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 md:hidden">
              {user ? (
                <>
                  <Link to={dashboardPath} className="btn btn-secondary">
                    <LayoutDashboard className="h-4 w-4" /> {t("dashboard")}
                  </Link>
                  <button onClick={signOut} className="btn btn-primary">
                    <LogOut className="h-4 w-4" /> {t("signOut")}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary">
                    {t("login")}
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    {t("signup")}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
