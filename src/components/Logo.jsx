import { Link } from "react-router-dom";

export default function Logo({ dark = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="Careerly home">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-[11px] transition group-hover:rotate-[-6deg] ${
          dark ? "bg-lime text-ink" : "bg-ink text-lime"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 17L17 5" />
          <path d="M8 5h9v9" />
        </svg>
      </span>
      <span
        className={`text-[1.3rem] font-semibold tracking-[-0.04em] ${dark ? "text-white" : "text-ink"}`}
      >
        careerly
      </span>
    </Link>
  );
}
