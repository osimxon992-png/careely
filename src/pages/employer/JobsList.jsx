import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import EmptyState from "../../components/EmptyState";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function JobsList() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setJobs([]);
      return;
    }
    (async () => {
      const { data: company } = await supabase
        .from("companies")
        .select("id")
        .eq("owner_id", user.id)
        .single();
      if (!company) {
        setJobs([]);
        return;
      }
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });
      setJobs(data || []);
    })();
  }, [user]);

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="page-title">Your Job Postings</h1>
        <Link
          to="/employer/jobs/new"
          className="btn btn-primary"
        >
          Post a Job
        </Link>
      </div>

      {jobs === null ? (
        <SkeletonLoader rows={3} />
      ) : jobs.length === 0 ? (
        <EmptyState title="No job postings yet" />
      ) : (
        <div className="card divide-y divide-border">
          {jobs.map((job) => (
            <div key={job.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="font-semibold text-text">{job.title}</p>
                <p className="text-sm text-muted capitalize">{job.status}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link to={`/employer/jobs/${job.id}/edit`} className="text-primary hover:underline">
                  Edit
                </Link>
                <Link to={`/employer/jobs/${job.id}/applications`} className="text-primary hover:underline">
                  Applications
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
