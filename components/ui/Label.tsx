export function Label({
  children,
  tone = "lime",
  mono = false,
}: {
  children: React.ReactNode;
  tone?: "lime" | "dark";
  mono?: boolean;
}) {
  const color = tone === "lime" ? "bg-lime text-teal" : "bg-teal text-lime";
  const type = mono ? "text-eyebrow" : "text-[15px] tracking-[-0.03em]";
  return <span className={`inline-flex p-2 ${color} ${type}`}>{children}</span>;
}
