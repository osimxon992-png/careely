export default function SkeletonLoader({ rows = 3, className = "space-y-4" }) {
  return (
    <div className={className} aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="card animate-pulse p-6">
          <div className="flex justify-between">
            <div className="h-12 w-12 rounded-2xl bg-sand" />
            <div className="h-6 w-20 rounded-full bg-sand/70" />
          </div>
          <div className="mt-5 space-y-2.5">
            <div className="h-3 w-1/3 rounded-full bg-sand/70" />
            <div className="h-5 w-2/3 rounded-full bg-sand" />
          </div>
          <div className="mt-6 h-3 w-1/2 rounded-full bg-sand/70" />
        </div>
      ))}
    </div>
  );
}
