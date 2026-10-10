import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Bookmark, FileText, ArrowRight, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import EmptyState from "../../components/EmptyState";
import SkeletonLoader from "../../components/SkeletonLoader";
import ApplicationStatusBadge from "../../components/ApplicationStatusBadge";
import CompanyLogo from "../../components/CompanyLogo";

export default function Dashboard() {
  const { user, profile } = useAuth();
  const [applications, setApplications] = useState(null);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setApplications([]);
      return;
    }
    supabase
      .from("applications")
      .select("id, status, created_at, jobs(title, company_name)")
      .eq("applicant_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => setApplications(data || []));

    supabase
      .from("saved_jobs")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .then(({ count }) => setSavedCount(count || 0));
  }, [user]);

  const completion = profile
    ? [profile.full_name, profile.headline, profile.location].filter(Boolean).length / 3
    : 0;
  const percent = Math.round(completion * 100);

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary via-indigo-600 to-accent p-8 text-white lg:p-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold">
              Welcome{profile?.full_name ? `, ${profile.full_name}` : ""} 👋
            </h1>
            <p className="mt-2 text-blue-100">Here's what's happening with your job search.</p>
          </div>
          <Link to="/jobs" className="btn btn-white">
            <Search className="h-4 w-4" /> Find jobs
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-muted">Profile completion</p>
            <UserRound className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold text-text">{percent}%</p>
          <div className="mt-3 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-linear-to-r from-primary to-accent" style={{ width: `${percent}%` }} />
          </div>
          <Link to="/profile" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Complete your profile <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <StatCard icon={Bookmark} label="Saved jobs" value={savedCount} to="/saved-jobs" cta="View saved jobs" />
        <StatCard
          icon={FileText}
          label="Applications"
          value={applications ? applications.length : "—"}
          to="/applications"
          cta="Track applications"
        />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold text-text">Recent applications</h2>
        {applications === null ? (
          <SkeletonLoader rows={3} />
        ) : applications.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No applications yet"
            description="Start applying to jobs to track your progress here."
            action={<Link to="/jobs" className="btn btn-primary">Browse jobs</Link>}
          />
        ) : (
          <div className="card divide-y divide-border">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between gap-4 p-5">
                <div className="flex min-w-0 items-center gap-4">
                  <CompanyLogo name={app.jobs?.company_name || ""} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-text">{app.jobs?.title}</p>
                    <p className="truncate text-sm text-muted">{app.jobs?.company_name}</p>
                  </div>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, to, cta }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">{label}</p>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold text-text">{value}</p>
      <Link to={to} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
