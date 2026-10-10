import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

export default function Onboarding() {
  const { user, role, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    headline: "",
    location: "",
    companyName: "",
    industry: "",
  });
  const [saving, setSaving] = useState(false);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await supabase
        .from("profiles")
        .update({
          full_name: form.fullName,
          headline: form.headline,
          location: form.location,
        })
        .eq("id", user.id);

      if (role === "employer") {
        await supabase.from("companies").insert({
          owner_id: user.id,
          name: form.companyName,
          industry: form.industry,
          verification_status: "pending",
        });
      }

      await refreshProfile();
      toast.success("Profile set up!");
      navigate(role === "employer" ? "/employer" : "/dashboard");
    } catch (err) {
      toast.error("Could not save your profile. You can finish this later in Settings.");
      navigate(role === "employer" ? "/employer" : "/dashboard");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container-x max-w-2xl py-14">
      <h1 className="page-title">Set up your profile</h1>
      <p className="mt-1 text-sm text-muted">
        This helps us tailor job matches and recommendations. You can skip and
        complete this later.
      </p>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5 p-6 lg:p-8">
        <div>
          <label className="label">Full name</label>
          <input
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            className="input"
          />
        </div>

        {role === "employer" ? (
          <>
            <div>
              <label className="label">Company name</label>
              <input
                value={form.companyName}
                onChange={(e) => set("companyName", e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Industry</label>
              <input
                value={form.industry}
                onChange={(e) => set("industry", e.target.value)}
                className="input"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="label">Professional headline</label>
              <input
                value={form.headline}
                onChange={(e) => set("headline", e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="input"
              />
            </div>
            <div>
              <label className="label">Location</label>
              <input
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                className="input"
              />
            </div>
          </>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? "Saving…" : "Continue"}
          </button>
          <button
            type="button"
            onClick={() => navigate(role === "employer" ? "/employer" : "/dashboard")}
            className="btn btn-secondary"
          >
            Skip for now
          </button>
        </div>
      </form>
    </div>
  );
}
