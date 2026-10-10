import { Check } from "lucide-react";

const POINTS = [
  "Free profile and unlimited applications",
  "Track every application in one dashboard",
  "Available in Uzbek, English and Russian",
];

export default function AuthLayout({ title, sub, children }) {
  return (
    <div className="container-x py-8 lg:py-12">
      <div className="mx-auto grid max-w-6xl gap-3 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="card flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <div className="animate-fade-up mx-auto w-full max-w-md">
            <h1 className="text-4xl font-semibold text-text sm:text-[2.75rem]">{title}</h1>
            {sub && <p className="mt-3 text-lg text-muted">{sub}</p>}
            <div className="mt-9">{children}</div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden rounded-3xl bg-ink p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="bg-grid-light pointer-events-none absolute inset-0" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> careerly
            </span>
            <h2 className="mt-8 text-5xl font-semibold text-white">
              Your next opportunity <span className="serif text-lime">starts here.</span>
            </h2>
            <p className="mt-5 max-w-sm text-lg text-slate-400">
              Join Careerly to discover jobs across Uzbekistan and connect with employers.
            </p>
          </div>

          <div className="relative mt-14 space-y-3">
            {POINTS.map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 text-slate-200">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
