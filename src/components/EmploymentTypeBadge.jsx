import { EMPLOYMENT_TYPES } from "../lib/labels";

const DOTS = {
  full_time: "bg-[#1f6b3b]",
  part_time: "bg-violet-500",
  internship: "bg-lime-dark",
  contract: "bg-amber-500",
  freelance: "bg-rose-500",
};

export default function EmploymentTypeBadge({ type }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium whitespace-nowrap text-text">
      <span className={`h-1.5 w-1.5 rounded-full ${DOTS[type] || "bg-slate-400"}`} />
      {EMPLOYMENT_TYPES[type] || type}
    </span>
  );
}
