import Link from "next/link";

/** The Drakken wordmark, drawn as a mask so it takes the current text colour. */
export function Logo({ className = "h-5 text-logo" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Drakken home" className={`inline-block aspect-[8/1] ${className}`}>
      <span
        aria-hidden
        className="block size-full bg-current"
        style={{
          maskImage: "url(/brand/drakken-wordmark.webp)",
          WebkitMaskImage: "url(/brand/drakken-wordmark.webp)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </Link>
  );
}
