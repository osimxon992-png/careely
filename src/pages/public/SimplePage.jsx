import PageHero from "../../components/PageHero";

export default function SimplePage({ title, sub, children }) {
  return (
    <div>
      <PageHero title={title} sub={sub} />
      <div className="container-x py-14 lg:py-20">
        <div className="card mx-auto max-w-3xl space-y-5 p-8 text-[17px] leading-relaxed text-slate-700 lg:p-12 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-text">
          {children}
        </div>
      </div>
    </div>
  );
}
