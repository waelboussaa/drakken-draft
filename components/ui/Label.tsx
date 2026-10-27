const tones = {
  green: "bg-accent-strong text-white",
  lime: "bg-lime text-teal",
  dark: "bg-teal text-bg",
};

export function Label({
  children,
  tone = "green",
  mono = false,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  mono?: boolean;
}) {
  const type = mono ? "text-eyebrow" : "text-body";
  return <span className={`inline-flex p-2 ${tones[tone]} ${type}`}>{children}</span>;
}
