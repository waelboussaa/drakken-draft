const tones = {
  green: "bg-accent-strong text-white",
  lime: "bg-lime text-teal",
  dark: "bg-accent-strong text-white",
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
  const type = mono ? "text-eyebrow" : "text-[15px] tracking-[-0.03em]";
  return <span className={`inline-flex p-2 ${tones[tone]} ${type}`}>{children}</span>;
}
