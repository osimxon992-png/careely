import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Lightbulb, Users, Rocket, ArrowRight } from "lucide-react";
import { fetchJobs } from "../../lib/jobs";
import { useLocale } from "../../i18n/LocaleContext";
import JobCard from "../../components/JobCard";
import SkeletonLoader from "../../components/SkeletonLoader";
import EmptyState from "../../components/EmptyState";
import PageHero from "../../components/PageHero";

const PERKS = [
  [Lightbulb, "Learn by doing", "Work on real projects alongside experienced professionals."],
  [Users, "Build your network", "Meet mentors and peers who can open doors later in your career."],
  [Rocket, "Launch your career", "Many internships lead directly to full-time offers."],
];

export default function Internships() {
  const { t } = useLocale();
  const [jobs, setJobs] = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    fetchJobs({ internshipsOnly: true }).then(({ jobs, isDemo }) => {
      setJobs(jobs);
      setIsDemo(isDemo);
    });
  }, []);

  return (
    <div>
      <PageHero
        eyebrow={t("navInternships")}
        title={t("internships")}
        sub="Internships, trainee roles and entry-level positions for students and early-career candidates."
      />

      <div className="container-x py-14 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {PERKS.map(([Icon, title, desc]) => (
            <div key={title} className="card p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-text">{title}</h3>
              <p className="mt-2 text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="section-title">Open internships</h2>
          <Link to="/career-advice/landing-your-first-internship" className="link flex items-center gap-1">
            How to land your first internship <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {isDemo && jobs !== null && <p className="notice-warning mt-6">{t("demoNotice")}</p>}
        <div className="mt-8">
          {jobs === null ? (
            <SkeletonLoader rows={2} className="grid gap-6 md:grid-cols-2" />
          ) : jobs.length === 0 ? (
            <EmptyState icon={GraduationCap} title="No internships available right now" />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
