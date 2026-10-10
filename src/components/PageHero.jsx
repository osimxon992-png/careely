export default function PageHero({ eyebrow, title, sub, children, center = false }) {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className={`container-x relative pt-14 pb-14 lg:pt-20 lg:pb-16 ${center ? "text-center" : ""}`}>
        <div className="animate-fade-up">
          {eyebrow && (
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {eyebrow}
            </span>
          )}
          <h1
            className={`mt-5 max-w-4xl text-4xl font-semibold text-text sm:text-6xl lg:text-[4.25rem] ${
              center ? "mx-auto" : ""
            }`}
          >
            {title}
          </h1>
          {sub && (
            <p className={`mt-5 max-w-2xl text-lg text-muted sm:text-xl ${center ? "mx-auto" : ""}`}>{sub}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
