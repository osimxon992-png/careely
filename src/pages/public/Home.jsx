import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Megaphone,
  Landmark,
  Palette,
  TrendingUp,
  GraduationCap,
  Stethoscope,
  HardHat,
  UserRound,
  Compass,
  Send,
  SlidersHorizontal,
  ListChecks,
  Bookmark,
  ShieldCheck,
  Languages,
  Check,
  Plus,
  Asterisk,
} from "lucide-react";
import { useLocale } from "../../i18n/LocaleContext";
import { fetchJobs } from "../../lib/jobs";
import { ARTICLES } from "../../lib/articles";
import JobCard from "../../components/JobCard";
import SkeletonLoader from "../../components/SkeletonLoader";
import CompanyLogo from "../../components/CompanyLogo";
import ArticleCard from "../../components/ArticleCard";
import EmploymentTypeBadge from "../../components/EmploymentTypeBadge";

const CATEGORIES = [
  ["cat_it", "Developer", Code2],
  ["cat_marketing", "Marketing", Megaphone],
  ["cat_finance", "Financial", Landmark],
  ["cat_design", "Designer", Palette],
  ["cat_sales", "Sales", TrendingUp],
  ["cat_education", "Teacher", GraduationCap],
  ["cat_healthcare", "Nurse", Stethoscope],
  ["cat_engineering", "Engineer", HardHat],
];

const POPULAR = ["React", "Marketing", "Designer", "Analyst", "Intern"];

export default function Home() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    fetchJobs().then(({ jobs, isDemo }) => {
      setJobs(jobs);
      setIsDemo(isDemo);
    });
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (location) params.set("location", location);
    navigate(`/jobs?${params.toString()}`);
  }

  return (
    <div>
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />

        <div className="container-x relative pt-12 pb-16 lg:pt-20 lg:pb-24">
          <div className="animate-fade-up mx-auto max-w-5xl text-center">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t("heroBadge")}
            </span>
            <h1 className="mt-7 text-[2.75rem] font-semibold text-text sm:text-7xl lg:text-[5.5rem]">
              {t("heroHeadline")}
              <br />
              <span className="serif text-[1.08em] text-primary">{t("heroHeadlineAccent")}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {t("heroSub")}
            </p>

            <form
              onSubmit={handleSearch}
              className="mx-auto mt-10 flex max-w-3xl flex-col gap-1.5 rounded-[1.75rem] border border-border bg-surface p-2 shadow-(--shadow-lift) sm:flex-row sm:rounded-full"
            >
              <label className="flex flex-1 items-center gap-3 rounded-full px-4 py-3 transition focus-within:bg-bg">
                <Search className="h-5 w-5 shrink-0 text-muted" />
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchPlaceholder")}
                  className="w-full bg-transparent text-base text-text outline-none placeholder:text-slate-400"
                />
              </label>
              <span className="hidden w-px self-stretch bg-border sm:block" />
              <label className="flex items-center gap-3 rounded-full px-4 py-3 transition focus-within:bg-bg sm:w-52">
                <MapPin className="h-5 w-5 shrink-0 text-muted" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t("location")}
                  aria-label={t("location")}
                  className="w-full bg-transparent text-base text-text outline-none placeholder:text-slate-400"
                />
              </label>
              <button type="submit" className="btn btn-primary btn-lg group">
                {t("findJobs")}
                <ArrowRight className="h-4 w-4 text-lime transition group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-muted">{t("popular")}</span>
              {POPULAR.map((tag) => (
                <Link
                  key={tag}
                  to={`/jobs?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 font-medium text-text transition hover:border-ink hover:bg-ink hover:text-white"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <HeroBento jobs={jobs} t={t} />
        </div>
      </section>

      {/* ───────── Marquee ───────── */}
      <div className="overflow-hidden border-y border-border bg-surface py-5" aria-hidden="true">
        <div className="animate-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {CATEGORIES.map(([key]) => (
                <span key={key} className="flex items-center text-2xl font-medium tracking-tight text-text sm:text-3xl">
                  <span className="px-7">{t(key)}</span>
                  <Asterisk className="animate-spin-slow h-6 w-6 text-primary" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ───────── Categories ───────── */}
      <section className="section">
        <div className="container-x">
          <SectionHeader eyebrow="01" title={t("categoriesTitle")} sub={t("categoriesSub")} />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {CATEGORIES.map(([key, query, Icon], i) => (
              <Link
                key={key}
                to={`/jobs?q=${encodeURIComponent(query)}`}
                className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-5 transition duration-300 hover:border-ink hover:bg-ink sm:p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bg text-ink transition duration-300 group-hover:bg-lime">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium text-muted tabular-nums transition group-hover:text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-8 flex items-end justify-between gap-2">
                  <span className="text-lg font-semibold tracking-tight text-text transition group-hover:text-white sm:text-xl">
                    {t(key)}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition duration-300 group-hover:rotate-45 group-hover:text-lime" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Featured jobs ───────── */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader eyebrow="02" title={t("featuredJobs")} sub={t("featuredSub")} />
            <Link to="/jobs" className="btn btn-secondary shrink-0">
              {t("viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {isDemo && <p className="notice-warning mt-8">{t("demoNotice")}</p>}
          <div className="mt-10">
            {jobs === null ? (
              <SkeletonLoader rows={6} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" />
            ) : jobs.length === 0 ? (
              <p className="text-muted">{t("noResults")}</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {jobs.slice(0, 6).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section className="px-3 sm:px-4">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[2rem] bg-ink sm:rounded-[2.5rem]">
          <div className="bg-grid-light pointer-events-none absolute inset-0" />
          <div className="relative px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" /> 03
              </span>
              <h2 className="mt-5 text-4xl font-semibold text-white sm:text-5xl lg:text-[3.5rem]">
                {t("howItWorks")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-slate-400">{t("howSub")}</p>
            </div>
            <div className="mt-16 grid gap-3 md:grid-cols-3">
              {[
                [UserRound, t("step1T"), t("step1D")],
                [Compass, t("step2T"), t("step2D")],
                [Send, t("step3T"), t("step3D")],
              ].map(([Icon, title, desc], i) => (
                <div
                  key={title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-lime/40 hover:bg-white/[0.06] lg:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-7xl leading-none text-lime italic">{`0${i + 1}`}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:bg-lime group-hover:text-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-12 text-2xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Features (bento) ───────── */}
      <section className="section">
        <div className="container-x">
          <SectionHeader eyebrow="04" title={t("featuresTitle")} sub={t("featuresSub")} />
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            <FeatureTile className="md:col-span-2" icon={SlidersHorizontal} title={t("feat1T")} desc={t("feat1D")}>
              <div className="mt-8 flex flex-wrap gap-2" aria-hidden="true">
                {["Tashkent", "Remote", "Full-time", "Hybrid", "Internship", "Senior"].map((c, i) => (
                  <span
                    key={c}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      i === 1 || i === 2 ? "bg-ink text-white" : "bg-bg text-slate-700"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </FeatureTile>
            <FeatureTile tone="lime" icon={ListChecks} title={t("feat2T")} desc={t("feat2D")} />
            <FeatureTile icon={Bookmark} title={t("feat3T")} desc={t("feat3D")} />
            <FeatureTile className="md:col-span-2" tone="ink" icon={GraduationCap} title={t("feat4T")} desc={t("feat4D")}>
              <Link
                to="/internships"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-lime hover:underline"
              >
                {t("navInternships")} <ArrowRight className="h-4 w-4" />
              </Link>
            </FeatureTile>
            <FeatureTile icon={ShieldCheck} title={t("feat5T")} desc={t("feat5D")} />
            <FeatureTile className="md:col-span-2" tone="lilac" icon={Languages} title={t("feat6T")} desc={t("feat6D")}>
              <div className="mt-8 flex gap-2" aria-hidden="true">
                {["O'zbekcha", "English", "Русский"].map((l) => (
                  <span key={l} className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-ink">
                    {l}
                  </span>
                ))}
              </div>
            </FeatureTile>
          </div>
        </div>
      </section>

      {/* ───────── For employers ───────── */}
      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-between rounded-[2rem] bg-lime p-8 sm:p-12 lg:p-14">
              <div>
                <span className="inline-flex rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-lime">
                  {t("empEyebrow")}
                </span>
                <h2 className="mt-6 text-4xl font-semibold text-ink sm:text-5xl">{t("empTitle")}</h2>
                <p className="mt-5 max-w-xl text-lg text-ink/70">{t("empSub")}</p>
                <ul className="mt-8 space-y-3">
                  {[t("empPoint1"), t("empPoint2"), t("empPoint3")].map((p) => (
                    <li key={p} className="flex items-center gap-3 font-medium text-ink">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  {t("empCta")} <ArrowRight className="h-4 w-4 text-lime" />
                </Link>
                <Link to="/pricing" className="btn btn-lg border border-ink/20 text-ink hover:bg-ink/5">
                  {t("navPricing")}
                </Link>
              </div>
            </div>
            <PipelineVisual />
          </div>
        </div>
      </section>

      {/* ───────── Career advice ───────── */}
      <section className="section border-t border-border bg-surface">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader eyebrow="05" title={t("adviceTitle")} sub={t("adviceSub")} />
            <Link to="/career-advice" className="btn btn-secondary shrink-0">
              {t("navAdvice")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} cta={t("readMore")} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">
              <span className="eyebrow-dot" /> FAQ
            </span>
            <h2 className="section-title mt-5">{t("faqTitle")}</h2>
            <Link to="/contact" className="btn btn-secondary mt-8">
              {t("footerContact")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {[1, 2, 3, 4, 5].map((n) => (
              <details key={n} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-tight text-text sm:text-xl [&::-webkit-details-marker]:hidden">
                  {t(`faq${n}Q`)}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition duration-300 group-open:rotate-45 group-open:border-lime group-open:bg-lime">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl pr-14 text-muted">{t(`faq${n}A`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="pb-6 sm:pb-8">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-16 text-center sm:rounded-[2.5rem] sm:px-12 lg:py-24">
            <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
            <div className="relative">
              <h2 className="mx-auto max-w-4xl text-4xl font-semibold text-text sm:text-6xl lg:text-7xl">
                <span className="highlight">{t("ctaTitle")}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{t("ctaSub")}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  {t("ctaSeeker")} <ArrowRight className="h-4 w-4 text-lime" />
                </Link>
                <Link to="/signup" className="btn btn-secondary btn-lg">
                  {t("ctaEmployer")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <span className="eyebrow">
          <span className="eyebrow-dot" /> {eyebrow}
        </span>
      )}
      <h2 className="section-title mt-5">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}

const TONES = {
  white: ["bg-surface border border-border", "bg-bg text-ink", "text-text", "text-muted"],
  lime: ["bg-lime", "bg-ink text-lime", "text-ink", "text-ink/70"],
  ink: ["bg-ink", "bg-lime text-ink", "text-white", "text-slate-400"],
  lilac: ["bg-lilac", "bg-ink text-white", "text-ink", "text-ink/70"],
};

function FeatureTile({ icon: Icon, title, desc, tone = "white", className = "", children }) {
  const [bg, iconCls, titleCls, descCls] = TONES[tone];
  return (
    <div className={`flex flex-col rounded-3xl p-7 lg:p-9 ${bg} ${className}`}>
      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconCls}`}>
        <Icon className="h-5 w-5" />
      </span>
      <h3 className={`mt-8 text-2xl font-semibold ${titleCls}`}>{title}</h3>
      <p className={`mt-2.5 max-w-md ${descCls}`}>{desc}</p>
      {children}
    </div>
  );
}

function HeroBento({ jobs, t }) {
  const sample = (jobs || []).slice(0, 3);
  return (
    <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:grid-rows-2">
      {/* Live jobs */}
      <div
        className="animate-fade-up card flex flex-col p-5 sm:col-span-2 lg:row-span-2 lg:p-6"
        style={{ animationDelay: "120ms" }}
      >
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-text">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t("recentJobs")}
          </p>
          <Link to="/jobs" className="text-sm font-medium text-muted transition hover:text-ink">
            {t("viewAll")} →
          </Link>
        </div>
        <div className="mt-5 flex flex-1 flex-col gap-2">
          {sample.length === 0
            ? [0, 1, 2].map((i) => <div key={i} className="h-[76px] animate-pulse rounded-2xl bg-bg" />)
            : sample.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  className="group flex items-center gap-4 rounded-2xl bg-bg p-3.5 transition hover:bg-ink"
                >
                  <CompanyLogo name={job.company_name} size="sm" />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate font-medium text-text transition group-hover:text-white">{job.title}</p>
                    <p className="truncate text-sm text-muted transition group-hover:text-slate-400">
                      {job.company_name} · {job.location}
                    </p>
                  </div>
                  <span className="hidden sm:block">
                    <EmploymentTypeBadge type={job.employment_type} />
                  </span>
                </Link>
              ))}
        </div>
      </div>

      {/* Free */}
      <div
        className="animate-fade-up flex min-h-44 flex-col justify-between rounded-3xl bg-lime p-6"
        style={{ animationDelay: "200ms" }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-lime">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
        <div className="text-left">
          <p className="text-5xl font-semibold tracking-tight text-ink">{t("factFree")}</p>
          <p className="mt-1 text-sm text-ink/70">{t("factFreeLabel")}</p>
        </div>
      </div>

      {/* Regions */}
      <div
        className="animate-fade-up relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl bg-ink p-6"
        style={{ animationDelay: "280ms" }}
      >
        <div className="bg-grid-light pointer-events-none absolute inset-0" />
        <MapPin className="relative h-6 w-6 text-lime" />
        <div className="relative text-left">
          <p className="text-5xl font-semibold tracking-tight text-white">{t("factRegions")}</p>
          <p className="mt-1 text-sm text-slate-400">{t("factRegionsLabel")}</p>
        </div>
      </div>

      {/* Languages */}
      <div
        className="animate-fade-up flex min-h-44 flex-col justify-between rounded-3xl bg-lilac p-6"
        style={{ animationDelay: "360ms" }}
      >
        <div className="flex gap-1.5">
          {["UZ", "EN", "RU"].map((l) => (
            <span key={l} className="rounded-full bg-white/70 px-2.5 py-1 text-xs font-semibold text-ink">
              {l}
            </span>
          ))}
        </div>
        <div className="text-left">
          <p className="font-serif text-5xl text-ink italic">{t("factLangs")}</p>
          <p className="mt-1 text-sm text-ink/70">{t("factLangsLabel")}</p>
        </div>
      </div>

      {/* Application tracking */}
      <div
        className="animate-fade-up card flex min-h-44 flex-col justify-between p-6"
        style={{ animationDelay: "440ms" }}
        aria-hidden="true"
      >
        <div className="animate-float flex items-center gap-3 rounded-2xl bg-ink p-3 text-left text-white shadow-(--shadow-lift)">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Application sent</p>
            <p className="truncate text-xs text-slate-400">Tracked in your dashboard</p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-1.5">
          {["Applied", "Review", "Interview"].map((s, i) => (
            <div key={s} className="flex-1 text-left">
              <div className={`h-1.5 rounded-full ${i < 2 ? "bg-ink" : "bg-sand"}`} />
              <p className={`mt-2 text-[11px] font-medium ${i < 2 ? "text-text" : "text-muted"}`}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PipelineVisual() {
  const stages = [
    ["New", 100, "bg-white/25"],
    ["Under review", 72, "bg-white/50"],
    ["Interview", 44, "bg-lime/70"],
    ["Offer", 20, "bg-lime"],
  ];
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 sm:p-10" aria-hidden="true">
      <div className="bg-grid-light pointer-events-none absolute inset-0" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white">Hiring pipeline</p>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-400">Illustration</span>
        </div>
        <div className="mt-10 flex-1 space-y-6">
          {stages.map(([label, width, color]) => (
            <div key={label}>
              <div className="mb-2.5 flex justify-between text-sm">
                <span className="text-slate-300">{label}</span>
              </div>
              <div className="h-10 rounded-xl bg-white/[0.06] p-1">
                <div className={`h-full rounded-lg ${color}`} style={{ width: `${width}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/[0.06] p-4">
          <div className="flex -space-x-2">
            {["AK", "DS", "MR"].map((n, i) => (
              <span
                key={n}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ring-2 ring-ink ${
                  ["bg-lime text-ink", "bg-lilac text-ink", "bg-clay text-ink"][i]
                }`}
              >
                {n}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-300">Candidates moving forward</p>
        </div>
      </div>
    </div>
  );
}
