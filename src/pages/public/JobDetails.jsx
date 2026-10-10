import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MapPin,
  Briefcase,
  Clock,
  Share2,
  Bookmark,
  ChevronRight,
  BarChart3,
  CalendarDays,
  Building2,
  CheckCircle2,
  Wallet,
  Send,
} from "lucide-react";
import { fetchJobById, fetchJobs } from "../../lib/jobs";
import { useAuth } from "../../context/AuthContext";
import { useLocale } from "../../i18n/LocaleContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { EMPLOYMENT_TYPES, WORK_ARRANGEMENTS, EXPERIENCE_LEVELS, timeAgo } from "../../lib/labels";
import SalaryDisplay from "../../components/SalaryDisplay";
import EmploymentTypeBadge from "../../components/EmploymentTypeBadge";
import SkeletonLoader from "../../components/SkeletonLoader";
import CompanyLogo from "../../components/CompanyLogo";
import JobCard from "../../components/JobCard";
import EmptyState from "../../components/EmptyState";

const toList = (text) =>
  (text || "")
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);

export default function JobDetails() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const { t } = useLocale();
  const [job, setJob] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [applying, setApplying] = useState(false);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    setJob(null);
    fetchJobById(jobId).then(({ job, isDemo }) => {
      setJob(job);
      setIsDemo(isDemo);
      if (job) {
        fetchJobs().then(({ jobs }) =>
          setSimilar(
            jobs
              .filter((j) => j.id !== job.id)
              .sort(
                (a, b) =>
                  Number(b.employment_type === job.employment_type) -
                  Number(a.employment_type === job.employment_type)
              )
              .slice(0, 3)
          )
        );
      }
    });
  }, [jobId]);

  async function handleApply() {
    if (!user) {
      toast.error("Please log in to apply.");
      return;
    }
    if (isDemo || !isSupabaseConfigured) {
      toast("This is a demo job. Connect Supabase to submit real applications.", {
        icon: "ℹ️",
      });
      return;
    }
    setApplying(true);
    const { error } = await supabase.from("applications").insert({
      job_id: job.id,
      applicant_id: user.id,
      status: "new",
    });
    setApplying(false);
    if (error) {
      if (error.code === "23505") toast.error("You already applied to this job.");
      else toast.error("Could not submit application.");
      return;
    }
    toast.success("Application submitted!");
  }

  async function handleSave() {
    if (!user) {
      toast.error("Please log in to save jobs.");
      return;
    }
    if (isDemo || !isSupabaseConfigured) {
      toast("This is a demo job. Connect Supabase to save real jobs.", { icon: "ℹ️" });
      return;
    }
    const { error } = await supabase
      .from("saved_jobs")
      .insert({ job_id: job.id, user_id: user.id });
    if (error) toast.error("Could not save job.");
    else toast.success("Job saved.");
  }

  function handleShare() {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  }

  if (job === null) {
    return (
      <div className="container-x py-14">
        <SkeletonLoader rows={2} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container-x py-20">
        <EmptyState
          icon={Briefcase}
          title="Job not found"
          description="This listing may have been closed or removed."
          action={
            <Link to="/jobs" className="btn btn-primary">
              Back to all jobs
            </Link>
          }
        />
      </div>
    );
  }

  const sections = [
    ["Responsibilities", toList(job.responsibilities)],
    ["Requirements", toList(job.qualifications)],
    ["Benefits", toList(job.benefits)],
  ].filter(([, items]) => items.length > 0);

  const overview = [
    [Briefcase, "Employment type", EMPLOYMENT_TYPES[job.employment_type] || job.employment_type],
    [Building2, "Work arrangement", WORK_ARRANGEMENTS[job.work_arrangement] || job.work_arrangement],
    job.experience_level && [BarChart3, "Experience", EXPERIENCE_LEVELS[job.experience_level]],
    [MapPin, "Location", job.location],
    [Clock, "Posted", timeAgo(job.created_at)],
    job.application_deadline && [
      CalendarDays,
      "Apply before",
      new Date(job.application_deadline).toLocaleDateString(),
    ],
  ].filter(Boolean);

  return (
    <div className="pb-20">
      {/* Header band */}
      <div className="border-b border-border bg-surface">
        <div className="container-x py-10 lg:py-12">
          <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/jobs" className="hover:text-primary">{t("navJobs")}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="truncate font-medium text-text">{job.title}</span>
          </nav>

          {isDemo && <p className="notice-warning mb-6">Demo data — not a real job listing</p>}

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <CompanyLogo name={job.company_name} size="lg" />
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-extrabold text-text sm:text-4xl">{job.title}</h1>
                  <EmploymentTypeBadge type={job.employment_type} />
                </div>
                <p className="mt-2 text-lg font-medium text-muted">{job.company_name}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{WORK_ARRANGEMENTS[job.work_arrangement] || job.work_arrangement}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{timeAgo(job.created_at)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} className="btn btn-secondary" aria-label={t("saveJob")}>
                <Bookmark className="h-4 w-4" /> <span className="hidden sm:inline">{t("saveJob")}</span>
              </button>
              <button onClick={handleShare} className="btn btn-secondary" aria-label="Share">
                <Share2 className="h-4 w-4" /> <span className="hidden sm:inline">Share</span>
              </button>
              <button onClick={handleApply} disabled={applying} className="btn btn-primary">
                <Send className="h-4 w-4" /> {t("applyNow")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main content */}
        <div className="space-y-6">
          <article className="card p-7 lg:p-9">
            <h2 className="text-2xl font-bold text-text">Job description</h2>
            <p className="mt-4 text-[17px] leading-relaxed whitespace-pre-line text-slate-700">
              {job.description}
            </p>

            {sections.map(([title, items]) => (
              <div key={title} className="mt-9">
                <h3 className="text-xl font-bold text-text">{title}</h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {job.skills?.length > 0 && (
              <div className="mt-9">
                <h3 className="text-xl font-bold text-text">Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span key={skill} className="rounded-xl bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-7">
            <p className="flex items-center gap-2 text-sm font-semibold text-muted">
              <Wallet className="h-4 w-4" /> Salary (monthly)
            </p>
            <SalaryDisplay
              min={job.salary_min}
              max={job.salary_max}
              currency={job.currency}
              className="mt-2 block font-display text-2xl"
            />
            <button onClick={handleApply} disabled={applying} className="btn btn-primary btn-lg mt-6 w-full">
              {applying ? "Submitting…" : t("applyNow")}
            </button>
            <button onClick={handleSave} className="btn btn-secondary mt-3 w-full">
              <Bookmark className="h-4 w-4" /> {t("saveJob")}
            </button>
          </div>

          <div className="card p-7">
            <h3 className="text-lg font-bold text-text">Job overview</h3>
            <dl className="mt-5 space-y-4">
              {overview.map(([Icon, label, value]) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <dt className="text-xs font-medium text-muted">{label}</dt>
                    <dd className="font-semibold text-text">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="card p-7">
            <div className="flex items-center gap-4">
              <CompanyLogo name={job.company_name} />
              <div>
                <p className="font-bold text-text">{job.company_name}</p>
                <Link to="/companies" className="text-sm font-semibold text-primary hover:underline">
                  View company
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <div className="container-x mt-16">
          <h2 className="text-2xl font-extrabold text-text sm:text-3xl">Similar jobs</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {similar.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
