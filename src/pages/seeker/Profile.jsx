import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    full_name: "",
    headline: "",
    bio: "",
    location: "",
    portfolio_url: "",
    github_url: "",
    linkedin_url: "",
    is_public: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setForm((f) => ({ ...f, ...profile }));
  }, [profile]);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        headline: form.headline,
        bio: form.bio,
        location: form.location,
        portfolio_url: form.portfolio_url,
        github_url: form.github_url,
        linkedin_url: form.linkedin_url,
        is_public: form.is_public,
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error("Could not save profile.");
    else {
      toast.success("Profile updated.");
      refreshProfile();
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="page-title">Your Profile</h1>

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5 p-6 lg:p-8">
        <Field label="Full name" value={form.full_name} onChange={(v) => set("full_name", v)} />
        <Field label="Headline" value={form.headline} onChange={(v) => set("headline", v)} />
        <div>
          <label className="label">Bio</label>
          <textarea
            value={form.bio || ""}
            onChange={(e) => set("bio", e.target.value)}
            rows={4}
            className="input"
          />
        </div>
        <Field label="Location" value={form.location} onChange={(v) => set("location", v)} />
        <Field label="Portfolio URL" value={form.portfolio_url} onChange={(v) => set("portfolio_url", v)} type="url" />
        <Field label="GitHub URL" value={form.github_url} onChange={(v) => set("github_url", v)} type="url" />
        <Field label="LinkedIn URL" value={form.linkedin_url} onChange={(v) => set("linkedin_url", v)} type="url" />

        <label className="flex items-center gap-2.5 text-sm font-medium text-text">
          <input
            type="checkbox"
            checked={!!form.is_public}
            onChange={(e) => set("is_public", e.target.checked)}
          />
          Make my profile visible to employers
        </label>

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </div>
  );
}
