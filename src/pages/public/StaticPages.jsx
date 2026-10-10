import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Target,
  Eye,
  HeartHandshake,
  Mail,
  MapPin,
  MessageSquare,
  Check,
  Building2,
  ArrowRight,
  ArrowLeft,
  Clock,
  BookOpen,
  Send,
} from "lucide-react";
import SimplePage from "./SimplePage";
import PageHero from "../../components/PageHero";
import CompanyLogo from "../../components/CompanyLogo";
import ArticleCard from "../../components/ArticleCard";
import EmptyState from "../../components/EmptyState";
import SkeletonLoader from "../../components/SkeletonLoader";
import { fetchJobs, groupByCompany } from "../../lib/jobs";
import { ARTICLES, findArticle } from "../../lib/articles";
import { useLocale } from "../../i18n/LocaleContext";

export function About() {
  const values = [
    [Target, "Our mission", "Make it simple for every person in Uzbekistan to find meaningful work — and for every employer to find the right people."],
    [Eye, "Our vision", "A transparent job market where opportunities are visible, applications are tracked, and nobody is left guessing."],
    [HeartHandshake, "Our values", "Honesty with users, respect for privacy, and tools that save time for both candidates and recruiters."],
  ];
  return (
    <div>
      <PageHero
        eyebrow="About us"
        title="About Careerly"
        sub="Careerly is a career platform that helps job seekers in Uzbekistan discover opportunities, build professional profiles, and connect with employers — while giving employers the tools to find qualified candidates."
      />
      <div className="container-x py-16 lg:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(([Icon, title, desc]) => (
            <div key={title} className="card p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-xl font-bold text-text">{title}</h2>
              <p className="mt-3 text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Built for job seekers and employers</h2>
            <p className="section-sub">
              Job seekers get a free profile, powerful search, saved jobs and a
              dashboard that shows where every application stands. Employers get
              a company page, job posting tools and a stage-based pipeline to
              review candidates.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="btn btn-primary">Browse jobs</Link>
              <Link to="/contact" className="btn btn-secondary">Contact us</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["UZ · EN · RU", "Available in three languages"],
              ["Free", "For job seekers, always"],
              ["14", "Regions of Uzbekistan"],
              ["RLS", "Database-level data protection"],
            ].map(([value, label]) => (
              <div key={label} className="card p-6">
                <p className="font-display text-2xl font-extrabold text-primary">{value}</p>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function handleSubmit(e) {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:support@careerly.example?subject=${encodeURIComponent(
      form.subject || "Careerly inquiry"
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div>
      <PageHero eyebrow="Contact" title="Get in touch" sub="Have a question, feedback or a partnership idea? We'd love to hear from you." />
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            {[
              [Mail, "Email", "support@careerly.example", "mailto:support@careerly.example"],
              [MapPin, "Office", "Tashkent, Uzbekistan"],
              [MessageSquare, "Response time", "We usually reply within 1–2 business days"],
            ].map(([Icon, label, value, href]) => (
              <div key={label} className="card flex items-start gap-4 p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-muted">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-text hover:text-primary">{value}</a>
                  ) : (
                    <p className="font-semibold text-text">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="card space-y-5 p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-text">Send us a message</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="c-name">Name</label>
                <input id="c-name" required className="input" value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="c-email">Email</label>
                <input id="c-email" type="email" required className="input" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="c-subject">Subject</label>
              <input id="c-subject" className="input" value={form.subject} onChange={(e) => set("subject", e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="c-message">Message</label>
              <textarea id="c-message" required rows={6} className="input" value={form.message} onChange={(e) => set("message", e.target.value)} />
            </div>
            <button className="btn btn-primary btn-lg">
              <Send className="h-4 w-4" /> Send message
            </button>
            <p className="text-xs text-muted">This opens your email app with the message pre-filled.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <SimplePage title="Privacy Policy" sub="How we handle your personal information.">
      <p className="notice-warning">
        This is a draft privacy policy template. It must be reviewed by
        qualified legal counsel before production launch. It does not yet
        constitute a binding legal document.
      </p>
      <h2>Information we collect</h2>
      <p>Account details you provide (such as email, name and profile information), the jobs you save and the applications you submit.</p>
      <h2>How we use it</h2>
      <p>To operate the platform: showing your profile to employers when you choose to make it public, delivering your applications, and improving the service.</p>
      <h2>Your choices</h2>
      <p>You can edit your profile, hide it from employers, or contact us to request deletion of your account.</p>
    </SimplePage>
  );
}

export function Terms() {
  return (
    <SimplePage title="Terms of Service" sub="The rules for using Careerly.">
      <p className="notice-warning">
        This is a draft terms-of-service template. It must be reviewed by
        qualified legal counsel before production launch. It does not yet
        constitute a binding legal document.
      </p>
      <h2>Using the platform</h2>
      <p>You agree to provide accurate information and to use Careerly only for legitimate job seeking and recruiting purposes.</p>
      <h2>Employer responsibilities</h2>
      <p>Employers must post genuine vacancies and treat candidate data in line with applicable law.</p>
      <h2>Changes</h2>
      <p>We may update these terms as the platform evolves. Significant changes will be communicated to users.</p>
    </SimplePage>
  );
}

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0 UZS",
      audience: "Job seekers",
      features: ["Profile & resume builder", "Job search & saved jobs", "Apply to unlimited jobs", "Basic application tracking"],
      cta: ["Get started", "/signup"],
    },
    {
      name: "Premium",
      price: "Proposed",
      audience: "Job seekers",
      features: ["Advanced resume templates", "Deeper AI feedback", "Personalized learning roadmap", "Interview practice tools"],
      highlighted: true,
      cta: ["Join the waitlist", "/contact"],
    },
    {
      name: "Employer",
      price: "Proposed",
      audience: "Employers",
      features: ["Job postings", "Candidate management", "Team recruitment tools", "Analytics dashboard"],
      cta: ["Contact sales", "/contact"],
    },
  ];
  return (
    <div>
      <PageHero
        center
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        sub="Proposed plans — payment processing is not yet enabled. No charges will occur."
      />
      <div className="container-x py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-8 lg:p-10 ${
                plan.highlighted
                  ? "bg-linear-to-b from-navy to-navy-2 text-white shadow-(--shadow-lift) ring-2 ring-primary lg:-my-4"
                  : "card"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-primary to-accent px-4 py-1 text-xs font-bold text-white">
                  Coming soon
                </span>
              )}
              <p className={`text-sm font-semibold uppercase ${plan.highlighted ? "text-sky-300" : "text-primary"}`}>
                {plan.audience}
              </p>
              <h2 className={`mt-2 text-2xl font-bold ${plan.highlighted ? "text-white" : "text-text"}`}>{plan.name}</h2>
              <p className={`mt-4 font-display text-4xl font-extrabold ${plan.highlighted ? "text-white" : "text-text"}`}>
                {plan.price}
              </p>
              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-3 ${plan.highlighted ? "text-slate-200" : "text-slate-600"}`}>
                    <Check className={`mt-0.5 h-5 w-5 shrink-0 ${plan.highlighted ? "text-sky-300" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={plan.cta[1]}
                className={`btn btn-lg mt-10 w-full ${plan.highlighted ? "btn-white" : "btn-secondary"}`}
              >
                {plan.cta[0]}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Companies() {
  const { t } = useLocale();
  const [companies, setCompanies] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchJobs().then(({ jobs, isDemo }) => {
      setCompanies(groupByCompany(jobs));
      setIsDemo(isDemo);
    });
  }, []);

  const visible = (companies || []).filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <PageHero eyebrow={t("navCompanies")} title="Companies hiring now" sub="Explore employers on Careerly and see their open positions.">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search companies…"
          aria-label="Search companies"
          className="input mt-8 max-w-xl py-4 text-base shadow-2xl shadow-black/30"
        />
      </PageHero>
      <div className="container-x py-14 lg:py-20">
        {isDemo && companies !== null && (
          <p className="notice-warning mb-8">Demo companies — connect Supabase to see real employers.</p>
        )}
        {companies === null ? (
          <SkeletonLoader rows={6} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" />
        ) : visible.length === 0 ? (
          <EmptyState icon={Building2} title="No companies found" />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((c) => (
              <div key={c.name} className="card card-hover flex flex-col p-7">
                <div className="flex items-center gap-4">
                  <CompanyLogo name={c.name} size="lg" />
                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-bold text-text">{c.name}</h2>
                    <p className="flex items-center gap-1.5 truncate text-sm text-muted">
                      <MapPin className="h-4 w-4 shrink-0" /> {c.locations.join(" · ")}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 flex-1 space-y-2 border-t border-border pt-5">
                  {c.jobs.slice(0, 3).map((job) => (
                    <li key={job.id}>
                      <Link
                        to={`/jobs/${job.id}`}
                        className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
                      >
                        <span className="truncate">{job.title}</span>
                        <ArrowRight className="h-4 w-4 shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold text-primary">
                  {c.jobs.length} open {c.jobs.length === 1 ? "position" : "positions"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CareerAdvice() {
  const { t } = useLocale();
  const categories = ["All", ...new Set(ARTICLES.map((a) => a.category))];
  const [active, setActive] = useState("All");
  const list = active === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === active);

  return (
    <div>
      <PageHero eyebrow={t("navAdvice")} title={t("adviceTitle")} sub={t("adviceSub")} />
      <div className="container-x py-14 lg:py-20">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === c ? "bg-primary text-white shadow-sm" : "bg-surface text-slate-600 ring-1 ring-border hover:text-text"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.slug} article={a} index={ARTICLES.indexOf(a)} cta={t("readMore")} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArticleDetail() {
  const { slug } = useParams();
  const article = findArticle(slug);

  if (!article) {
    return (
      <div className="container-x py-20">
        <EmptyState
          icon={BookOpen}
          title="Article not found"
          action={<Link to="/career-advice" className="btn btn-primary">All articles</Link>}
        />
      </div>
    );
  }

  const more = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div>
      <PageHero eyebrow={article.category} title={article.title} sub={article.excerpt}>
        <p className="mt-6 flex items-center gap-2 text-sm text-slate-400">
          <Clock className="h-4 w-4" /> {article.readMinutes} min read
        </p>
      </PageHero>
      <div className="container-x py-14 lg:py-20">
        <article className="card mx-auto max-w-3xl p-8 lg:p-12">
          {article.sections.map((s) => (
            <section key={s.heading} className="mb-10 last:mb-0">
              <h2 className="text-2xl font-bold text-text">{s.heading}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-slate-700">{s.body}</p>
            </section>
          ))}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <Link to="/career-advice" className="btn btn-secondary">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <Link to="/jobs" className="btn btn-primary">
              Browse jobs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>

        <h2 className="mt-20 text-2xl font-extrabold text-text sm:text-3xl">Keep reading</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {more.map((a) => (
            <ArticleCard key={a.slug} article={a} index={ARTICLES.indexOf(a)} />
          ))}
        </div>
      </div>
    </div>
  );
}
