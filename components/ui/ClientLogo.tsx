/**
 * A client or partner logo drawn as a mask, so marks with very different colours
 * share one flat colour (the current text colour).
 */
export function ClientLogo({
  name,
  src,
  ratio,
  height,
  className = "",
}: {
  name: string;
  src: string;
  ratio: number;
  height: number;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label={name}
      className={`block shrink-0 bg-current ${className}`}
      style={{
        height,
        width: height * ratio,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
