import Link from "next/link";

type Variant = "lime" | "dark" | "light" | "glass";

const styles: Record<Variant, string> = {
  lime: "bg-lime text-teal",
  dark: "bg-teal text-lime",
  light: "bg-bg text-teal",
  glass: "bg-white/25 text-white backdrop-blur-[5px]",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`size-4 ${className}`}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Pill + detached circle; the arrow rolls out to the top-right and a copy rolls in from the bottom-left on hover. */
export function ArrowButton({
  href,
  children,
  variant = "lime",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const tone = styles[variant];
  return (
    <Link href={href} className={`group inline-flex items-center gap-0.5 ${className}`}>
      <span
        className={`rounded-[22px] px-4 py-2.5 text-[15px] leading-5 tracking-[-0.02em] ${tone}`}
      >
        {children}
      </span>
      <span className={`relative grid size-[38px] place-items-center overflow-hidden rounded-full ${tone}`}>
        <Arrow className="transition-transform duration-400 ease-out-expo group-hover:translate-x-6 group-hover:-translate-y-6" />
        <Arrow className="absolute -translate-x-6 translate-y-6 transition-transform duration-400 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </Link>
  );
}
