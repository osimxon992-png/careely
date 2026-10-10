import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Hourglass, PlusCircle, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import EmptyState from "../../components/EmptyState";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setStats({ activeJobs: 0, totalApplications: 0, awaitingReview: 0 });
      return;
    }
    (async () => {
      const { data: company } = await supabase
        .from("companies")
        .select("id")
        .eq("owner_id", user.id)
        .single();

      if (!company) {
        setStats({ activeJobs: 0, totalApplications: 0, awaitingReview: 0, noCompany: true });
        return;
      }

      const { count: activeJobs } = await supabase
        .from("jobs")
        .select("id", { count: "exact", head: true })
        .eq("company_id", company.id)
        .eq("status", "published");

      const { count: totalApplications } = await supabase
        .from("applications")
        .select("id, jobs!inner(company_id)", { count: "exact", head: true })
        .eq("jobs.company_id", company.id);

      const { count: awaitingReview } = await supabase
        .from("applications")
        .select("id, jobs!inner(company_id)", { count: "exact", head: true })
        .eq("jobs.company_id", company.id)
        .eq("status", "new");

      setStats({ activeJobs: activeJobs || 0, totalApplications: totalApplications || 0, awaitingReview: awaitingReview || 0 });
    })();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Employer Dashboard</h1>
          <p className="mt-1 text-muted">Manage your job postings and candidates.</p>
        </div>
        <Link to="/employer/jobs/new" className="btn btn-primary">
          <PlusCircle className="h-4 w-4" /> Post a Job
        </Link>
      </div>

      {stats?.noCompany ? (
        <EmptyState
          icon={Building2}
          title="Set up your company profile"
          description="Create a company profile before posting jobs."
          action={<Link to="/employer/company" className="btn btn-primary">Set up company</Link>}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard icon={Briefcase} color="bg-blue-50 text-blue-600" label="Active job listings" value={stats?.activeJobs} />
          <StatCard icon={Users} color="bg-violet-50 text-violet-600" label="Total applications" value={stats?.totalApplications} />
          <StatCard icon={Hourglass} color="bg-amber-50 text-amber-600" label="Awaiting review" value={stats?.awaitingReview} />
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, color, label, value }) {
  return (
    <div className="card flex items-center gap-5 p-6">
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}>
        <Icon className="h-7 w-7" />
      </span>
      <div>
        <p className="text-sm font-semibold text-muted">{label}</p>
        <p className="mt-1 font-display text-3xl font-extrabold text-text">{value ?? "—"}</p>
      </div>
    </div>
  );
}
