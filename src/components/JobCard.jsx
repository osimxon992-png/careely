import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, ArrowUpRight } from "lucide-react";
import SalaryDisplay from "./SalaryDisplay";
import EmploymentTypeBadge from "./EmploymentTypeBadge";
import CompanyLogo from "./CompanyLogo";
import { WORK_ARRANGEMENTS, timeAgo } from "../lib/labels";

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="card card-hover group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <CompanyLogo name={job.company_name} />
        <div className="flex items-center gap-2">
          {job.is_demo && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
              Demo
            </span>
          )}
          <EmploymentTypeBadge type={job.employment_type} />
        </div>
      </div>

      <div className="mt-5 min-w-0">
        <p className="truncate text-sm text-muted">{job.company_name}</p>
        <h3 className="mt-1 line-clamp-2 text-xl font-semibold tracking-tight text-text">{job.title}</h3>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5" />
          {WORK_ARRANGEMENTS[job.work_arrangement] || job.work_arrangement}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {timeAgo(job.created_at)}
        </span>
      </div>

      {job.skills?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 4).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-3 border-t border-dashed border-border pt-5">
          <SalaryDisplay min={job.salary_min} max={job.salary_max} currency={job.currency} />
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink transition duration-300 group-hover:rotate-45 group-hover:bg-lime">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
