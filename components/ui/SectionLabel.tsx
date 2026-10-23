/** Section eyebrow: accent rule, optional index, mono caption. Takes the current text colour. */
export function SectionLabel({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 text-eyebrow ${className}`}>
      <span aria-hidden className="h-0.5 w-8 bg-accent" />
      {index && <span className="opacity-55">{index}</span>}
      {children}
    </span>
  );
}
