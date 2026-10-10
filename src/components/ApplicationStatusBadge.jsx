const STYLES = {
  new: "bg-sand text-slate-700",
  under_review: "bg-sky-50 text-sky-800",
  shortlisted: "bg-lilac/60 text-violet-900",
  interview: "bg-amber-50 text-amber-800",
  offer: "bg-lime-soft text-[#1f6b3b]",
  hired: "bg-lime text-ink",
  rejected: "bg-red-50 text-red-700",
  withdrawn: "bg-slate-100 text-slate-500",
};

export const STATUS_LABELS = {
  new: "New",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  interview: "Interview",
  offer: "Offer",
  hired: "Hired",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export default function ApplicationStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
        STYLES[status] || "bg-sand text-slate-700"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {STATUS_LABELS[status] || status}
    </span>
  );
}
