import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  FileText,
  Bookmark,
  Settings,
  Building2,
  Briefcase,
  PlusCircle,
  ShieldCheck,
  Search,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV = {
  seeker: [
    ["/dashboard", "Overview", LayoutDashboard],
    ["/profile", "Profile", UserRound],
    ["/applications", "Applications", FileText],
    ["/saved-jobs", "Saved jobs", Bookmark],
    ["/jobs", "Find jobs", Search],
    ["/settings", "Settings", Settings],
  ],
  employer: [
    ["/employer", "Overview", LayoutDashboard],
    ["/employer/company", "Company", Building2],
    ["/employer/jobs", "Job postings", Briefcase],
    ["/employer/jobs/new", "Post a job", PlusCircle],
    ["/settings", "Settings", Settings],
  ],
  admin: [
    ["/admin", "Administration", ShieldCheck],
    ["/settings", "Settings", Settings],
  ],
};

export default function DashboardLayout() {
  const { role, profile, user } = useAuth();
  const links = NAV[role] || NAV.seeker;
  const name = profile?.full_name || user?.email || "";

  const linkClass = ({ isActive }) =>
    `group flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition ${
      isActive ? "bg-ink text-white" : "text-slate-600 hover:bg-ink/5 hover:text-ink"
    }`;

  return (
    <div className="container-x py-8 lg:py-12">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-3">
            <div className="hidden items-center gap-3 rounded-2xl bg-bg p-3 lg:flex">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-lg font-semibold text-ink">
                {(name[0] || "?").toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-text">{name}</p>
                <p className="text-xs text-muted capitalize">{role || "member"}</p>
              </div>
            </div>
            <nav className="flex gap-1 overflow-x-auto lg:mt-3 lg:flex-col lg:overflow-visible">
              {links.map(([to, label, Icon]) => (
                <NavLink key={to} to={to} end className={linkClass}>
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4.5 w-4.5 ${isActive ? "text-lime" : ""}`} /> {label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
