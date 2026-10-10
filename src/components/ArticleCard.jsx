import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";

const THEMES = [
  ["bg-lime", "text-ink"],
  ["bg-ink", "text-white"],
  ["bg-clay", "text-ink"],
  ["bg-lilac", "text-ink"],
];

export default function ArticleCard({ article, index = 0, cta = "Read" }) {
  const [bg, fg] = THEMES[index % THEMES.length];
  return (
    <Link
      to={`/career-advice/${article.slug}`}
      className="card card-hover group flex flex-col overflow-hidden p-2"
    >
      <div className={`relative flex h-48 flex-col justify-between overflow-hidden rounded-[1.25rem] p-5 ${bg} ${fg}`}>
        <span className="w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink">
          {article.category}
        </span>
        <span
          aria-hidden="true"
          className="absolute -right-3 -bottom-10 font-serif text-[9rem] leading-none italic opacity-20"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-medium opacity-80">
          <Clock className="h-4 w-4" /> {article.readMinutes} min
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 pt-5">
        <h3 className="text-xl font-semibold tracking-tight text-text">{article.title}</h3>
        <p className="mt-2.5 line-clamp-2 text-[15px] text-muted">{article.excerpt}</p>
        <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-text">
          {cta}
          <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
