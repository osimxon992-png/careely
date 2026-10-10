import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

export default function CompanyProfile() {
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState({ name: "", industry: "", website: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("companies")
      .select("*")
      .eq("owner_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setCompany(data);
          setForm(data);
        }
      });
  }, [user]);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, owner_id: user.id };
    const { error } = company
      ? await supabase.from("companies").update(payload).eq("id", company.id)
      : await supabase.from("companies").insert({ ...payload, verification_status: "pending" });
    setSaving(false);
    if (error) toast.error("Could not save company profile.");
    else toast.success("Company profile saved.");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="page-title">Company Profile</h1>
      {company && (
        <p className="mt-2 text-sm">
          Verification status:{" "}
          <span className="font-medium capitalize">{company.verification_status}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="card mt-6 space-y-5 p-6 lg:p-8">
        <Field label="Company name" value={form.name} onChange={(v) => set("name", v)} />
        <Field label="Industry" value={form.industry} onChange={(v) => set("industry", v)} />
        <Field label="Website" value={form.website} onChange={(v) => set("website", v)} type="url" />
        <div>
          <label className="label">Description</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => set("description", e.target.value)}
            rows={4}
            className="input"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? "Saving…" : "Save company profile"}
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
