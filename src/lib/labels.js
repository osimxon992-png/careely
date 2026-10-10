export const EMPLOYMENT_TYPES = {
  full_time: "Full-time",
  part_time: "Part-time",
  internship: "Internship",
  contract: "Contract",
  freelance: "Freelance",
};

export const WORK_ARRANGEMENTS = {
  remote: "Remote",
  hybrid: "Hybrid",
  on_site: "On-site",
};

export const EXPERIENCE_LEVELS = {
  entry: "Entry level",
  mid: "Mid level",
  senior: "Senior",
  lead: "Lead",
};

export function timeAgo(date) {
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return new Date(date).toLocaleDateString();
}
