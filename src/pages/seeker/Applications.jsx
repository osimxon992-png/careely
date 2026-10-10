import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import EmptyState from "../../components/EmptyState";
import SkeletonLoader from "../../components/SkeletonLoader";
import ApplicationStatusBadge from "../../components/ApplicationStatusBadge";

export default function Applications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setApplications([]);
      return;
    }
    supabase
      .from("applications")
      .select("id, status, created_at, jobs(id, title, company_name)")
      .eq("applicant_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setApplications(data || []));
  }, [user]);

  return (
    <div className="max-w-4xl">
      <h1 className="page-title">Your Applications</h1>

      <div className="mt-6">
        {applications === null ? (
          <SkeletonLoader rows={4} />
        ) : applications.length === 0 ? (
          <EmptyState
            title="No applications yet"
            action={
              <Link to="/jobs" className="btn btn-primary">
                Browse jobs
              </Link>
            }
          />
        ) : (
          <div className="card divide-y divide-border">
            {applications.map((app) => (
              <div key={app.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-semibold text-text">{app.jobs?.title}</p>
                  <p className="text-sm text-muted">{app.jobs?.company_name}</p>
                  <p className="text-xs text-muted">
                    Applied {new Date(app.created_at).toLocaleDateString()}
                  </p>
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
