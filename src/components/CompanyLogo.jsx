const PALETTE = [
  "bg-ink text-lime",
  "bg-lime text-ink",
  "bg-[#1f6b3b] text-white",
  "bg-clay text-ink",
  "bg-lilac text-ink",
  "bg-sand text-ink",
];

const SIZES = {
  sm: "h-10 w-10 text-sm rounded-xl",
  md: "h-12 w-12 text-base rounded-2xl",
  lg: "h-16 w-16 text-xl rounded-[1.25rem]",
};

// Generated initials avatar — no external logos are fetched or invented.
export default function CompanyLogo({ name = "", size = "md" }) {
  const initials = name
    .replace(/^Demo\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center font-semibold tracking-tight ${
        PALETTE[hash % PALETTE.length]
      } ${SIZES[size]}`}
    >
      {initials || "?"}
    </div>
  );
}
