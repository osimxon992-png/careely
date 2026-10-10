import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";
import ApplicationStatusBadge from "../../components/ApplicationStatusBadge";
import EmptyState from "../../components/EmptyState";
import SkeletonLoader from "../../components/SkeletonLoader";

const STAGES = [
  "new",
  "under_review",
  "shortlisted",
  "interview",
  "offer",
  "hired",
  "rejected",
];

export default function JobApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState(null);

  function load() {
    supabase
      .from("applications")
      .select("*, profiles(full_name, email)")
      .eq("job_id", jobId)
      .order("created_at", { ascending: false })
      .then(({ data }) => setApplications(data || []));
  }

  useEffect(load, [jobId]);

  async function updateStatus(appId, status) {
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", appId);
    if (error) {
      toast.error("Could not update status.");
      return;
    }
    await supabase.from("application_status_history").insert({
      application_id: appId,
      status,
    });
    toast.success("Status updated.");
    load();
  }

  return (
    <div className="max-w-4xl">
      <h1 className="page-title">Applications</h1>

      <div className="mt-6">
        {applications === null ? (
          <SkeletonLoader rows={3} />
        ) : applications.length === 0 ? (
          <EmptyState title="No applications yet for this job" />
        ) : (
          <div className="card divide-y divide-border">
            {applications.map((app) => (
              <div key={app.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-semibold text-text">{app.profiles?.full_name || "Candidate"}</p>
                  <p className="text-sm text-muted">{app.profiles?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ApplicationStatusBadge status={app.status} />
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="input w-auto py-2"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
