import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, SlidersHorizontal, X } from "lucide-react";
import { fetchJobs } from "../../lib/jobs";
import { useLocale } from "../../i18n/LocaleContext";
import { EMPLOYMENT_TYPES, WORK_ARRANGEMENTS, EXPERIENCE_LEVELS } from "../../lib/labels";
import JobCard from "../../components/JobCard";
import JobFilters from "../../components/JobFilters";
import SkeletonLoader from "../../components/SkeletonLoader";
import EmptyState from "../../components/EmptyState";
import PageHero from "../../components/PageHero";

const FILTER_KEYS = ["location", "employmentType", "workArrangement", "experienceLevel", "internshipsOnly"];

export default function Jobs() {
  const { t } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filters = {
    keyword: searchParams.get("q") || undefined,
    location: searchParams.get("location") || undefined,
    employmentType: searchParams.get("employmentType") || undefined,
    workArrangement: searchParams.get("workArrangement") || undefined,
    experienceLevel: searchParams.get("experienceLevel") || undefined,
    internshipsOnly: searchParams.get("internshipsOnly") === "true" || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  useEffect(() => {
    let cancelled = false;
    setJobs(null);
    fetchJobs(filters).then(({ jobs, isDemo }) => {
      if (cancelled) return;
      setJobs(jobs);
      setIsDemo(isDemo);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function updateFilters(next) {
    const params = new URLSearchParams();
    if (filters.keyword) params.set("q", filters.keyword);
    if (filters.sort) params.set("sort", filters.sort);
    FILTER_KEYS.forEach((key) => {
      if (next[key]) params.set(key, String(next[key]));
    });
    setSearchParams(params);
  }

  function setParam(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
  }

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const q = e.target.elements.keyword.value.trim();
    const loc = e.target.elements.location.value.trim();
    if (q) params.set("q", q);
    else params.delete("q");
    if (loc) params.set("location", loc);
    else params.delete("location");
    setSearchParams(params);
  }

  const activeChips = [
    filters.keyword && ["q", `“${filters.keyword}”`],
    filters.location && ["location", filters.location],
    filters.employmentType && ["employmentType", EMPLOYMENT_TYPES[filters.employmentType]],
    filters.workArrangement && ["workArrangement", WORK_ARRANGEMENTS[filters.workArrangement]],
    filters.experienceLevel && ["experienceLevel", EXPERIENCE_LEVELS[filters.experienceLevel]],
    filters.internshipsOnly && ["internshipsOnly", "Internships"],
  ].filter(Boolean);

  return (
    <div>
      <PageHero eyebrow={t("recentJobs")} title={t("navJobs")} sub={t("featuredSub")}>
        <form
          key={searchParams.toString()}
          onSubmit={handleSearch}
          className="mt-9 flex max-w-3xl flex-col gap-1.5 rounded-[1.75rem] border border-border bg-surface p-2 shadow-(--shadow-lift) sm:flex-row sm:rounded-full"
        >
          <label className="flex flex-1 items-center gap-3 rounded-full px-4 py-3 transition focus-within:bg-bg">
            <Search className="h-5 w-5 shrink-0 text-muted" />
            <input
              name="keyword"
              defaultValue={filters.keyword}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
            />
          </label>
          <span className="hidden w-px self-stretch bg-border sm:block" />
          <label className="flex items-center gap-3 rounded-full px-4 py-3 transition focus-within:bg-bg sm:w-52">
            <MapPin className="h-5 w-5 shrink-0 text-muted" />
            <input
              name="location"
              defaultValue={filters.location}
              placeholder={t("location")}
              aria-label={t("location")}
              className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
            />
          </label>
          <button className="btn btn-primary btn-lg">{t("findJobs")}</button>
        </form>
      </PageHero>

      <div className="container-x pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="lg:sticky lg:top-24">
              <JobFilters filters={filters} onChange={updateFilters} />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-muted">
                <span className="text-2xl font-semibold tracking-tight text-text">
                  {jobs === null ? "…" : jobs.length}
                </span>{" "}
                {jobs?.length === 1 ? "job found" : "jobs found"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters((s) => !s)}
                  className="btn btn-sm btn-secondary lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <select
                  value={filters.sort || "newest"}
                  onChange={(e) => setParam("sort", e.target.value === "newest" ? "" : e.target.value)}
                  className="input w-auto rounded-full py-2"
                  aria-label="Sort jobs"
                >
                  <option value="newest">Newest first</option>
                  <option value="salary">Highest salary</option>
                </select>
              </div>
            </div>

            {activeChips.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {activeChips.map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setParam(key, "")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-ink-2"
                  >
                    {label} <X className="h-3.5 w-3.5 text-lime" />
                  </button>
                ))}
              </div>
            )}

            {isDemo && jobs !== null && <p className="notice-warning mb-6">{t("demoNotice")}</p>}

            {jobs === null ? (
              <SkeletonLoader rows={4} className="grid gap-4 xl:grid-cols-2" />
            ) : jobs.length === 0 ? (
              <EmptyState
                icon={Search}
                title={t("noResults")}
                description="Try removing a filter or searching a different keyword."
                action={
                  <button onClick={() => setSearchParams({})} className="btn btn-primary">
                    Clear all filters
                  </button>
                }
              />
            ) : (
              <div className="grid gap-4 xl:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
