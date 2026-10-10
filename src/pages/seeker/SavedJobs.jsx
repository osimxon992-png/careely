import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import JobCard from "../../components/JobCard";
import EmptyState from "../../components/EmptyState";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function SavedJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !user) {
      setJobs([]);
      return;
    }
    supabase
      .from("saved_jobs")
      .select("jobs(*)")
      .eq("user_id", user.id)
      .then(({ data }) => setJobs((data || []).map((d) => d.jobs).filter(Boolean)));
  }, [user]);

  return (
    <div className="max-w-4xl">
      <h1 className="page-title">Saved Jobs</h1>
      <div className="mt-6">
        {jobs === null ? (
          <SkeletonLoader rows={3} />
        ) : jobs.length === 0 ? (
          <EmptyState
            title="No saved jobs yet"
            action={
              <Link to="/jobs" className="btn btn-primary">
                Browse jobs
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
