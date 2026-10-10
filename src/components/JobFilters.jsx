import { RotateCcw } from "lucide-react";
import { EMPLOYMENT_TYPES, WORK_ARRANGEMENTS, EXPERIENCE_LEVELS } from "../lib/labels";

function OptionGroup({ title, options, value, onSelect }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold tracking-[0.12em] text-muted uppercase">{title}</legend>
      <div className="flex flex-wrap gap-1.5">
        {[["", "Any"], ...Object.entries(options)].map(([key, label]) => {
          const active = (value || "") === key;
          return (
            <button
              key={key || "any"}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(key || undefined)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-ink text-white"
                  : "bg-ink/[0.04] text-slate-700 hover:bg-ink/[0.08] hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function JobFilters({ filters, onChange }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="card space-y-7 p-6">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold tracking-tight text-text">Filters</p>
        <button
          onClick={() => onChange({})}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-muted transition hover:bg-ink/5 hover:text-ink"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div>
        <label className="mb-3 block text-xs font-semibold tracking-[0.12em] text-muted uppercase" htmlFor="filter-location">
          Location
        </label>
        <input
          id="filter-location"
          key={filters.location || ""}
          className="input"
          placeholder="e.g. Tashkent"
          defaultValue={filters.location || ""}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          onBlur={(e) => {
            const next = e.target.value.trim() || undefined;
            if (next !== filters.location) set("location", next);
          }}
        />
      </div>

      <OptionGroup
        title="Employment type"
        options={EMPLOYMENT_TYPES}
        value={filters.employmentType}
        onSelect={(v) => set("employmentType", v)}
      />
      <OptionGroup
        title="Work arrangement"
        options={WORK_ARRANGEMENTS}
        value={filters.workArrangement}
        onSelect={(v) => set("workArrangement", v)}
      />
      <OptionGroup
        title="Experience"
        options={EXPERIENCE_LEVELS}
        value={filters.experienceLevel}
        onSelect={(v) => set("experienceLevel", v)}
      />

      <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-lime-soft px-4 py-3.5 text-sm font-medium text-text">
        Internships only
        <span className="relative inline-flex">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={!!filters.internshipsOnly}
            onChange={(e) => set("internshipsOnly", e.target.checked || undefined)}
          />
          <span className="h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink peer-focus-visible:ring-offset-2" />
          <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5 peer-checked:bg-lime" />
        </span>
      </label>
    </div>
  );
}
