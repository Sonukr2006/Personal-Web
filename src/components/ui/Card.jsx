export default function Card({ as: Tag = "div", className = "", ...props }) {
  return (
    <Tag
      className={`rounded-2xl border border-white/15 bg-black/35 p-6 text-white backdrop-blur-sm sm:p-8 ${className}`}
      {...props}
    />
  );
}