import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

const EMPTY = {
  title: "",
  location: "",
  employment_type: "full_time",
  work_arrangement: "on_site",
  experience_level: "mid",
  salary_min: "",
  salary_max: "",
  description: "",
  is_internship: false,
  status: "draft",
};

export default function JobForm() {
  const { jobId } = useParams();
  const isEdit = Boolean(jobId);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single()
        .then(({ data }) => data && setForm(data));
    }
  }, [jobId, isEdit]);

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save(status) {
    setSaving(true);
    const { data: company } = await supabase
      .from("companies")
      .select("id, name")
      .eq("owner_id", user.id)
      .single();

    if (!company) {
      toast.error("Create a company profile before posting jobs.");
      setSaving(false);
      navigate("/employer/company");
      return;
    }

    const payload = {
      ...form,
      company_id: company.id,
      company_name: company.name,
      status,
      salary_min: form.salary_min ? Number(form.salary_min) : null,
      salary_max: form.salary_max ? Number(form.salary_max) : null,
    };

    const { error } = isEdit
      ? await supabase.from("jobs").update(payload).eq("id", jobId)
      : await supabase.from("jobs").insert(payload);

    setSaving(false);
    if (error) {
      toast.error("Could not save job.");
      return;
    }
    toast.success(status === "published" ? "Job published!" : "Draft saved.");
    navigate("/employer/jobs");
  }

  return (
    <div className="max-w-4xl">
      <h1 className="page-title">{isEdit ? "Edit Job" : "Post a Job"}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          save("published");
        }}
        className="card mt-6 space-y-5 p-6 lg:p-8"
      >
        <Field label="Job title" value={form.title} onChange={(v) => set("title", v)} required />
        <Field label="Location" value={form.location} onChange={(v) => set("location", v)} required />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Employment type"
            value={form.employment_type}
            onChange={(v) => set("employment_type", v)}
            options={["full_time", "part_time", "internship", "contract", "freelance"]}
          />
          <Select
            label="Work arrangement"
            value={form.work_arrangement}
            onChange={(v) => set("work_arrangement", v)}
            options={["on_site", "hybrid", "remote"]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Salary min" type="number" value={form.salary_min} onChange={(v) => set("salary_min", v)} />
          <Field label="Salary max" type="number" value={form.salary_max} onChange={(v) => set("salary_max", v)} />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={6}
            required
            className="input"
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm font-medium text-text">
          <input
            type="checkbox"
            checked={!!form.is_internship}
            onChange={(e) => set("is_internship", e.target.checked)}
          />
          This is an internship
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            Publish
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => save("draft")}
            className="btn btn-secondary"
          >
            Save as draft
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="label">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
