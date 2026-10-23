import { SHOW_TBC } from "@/content/site";

/** Marks placeholder content that Drakken still has to confirm. */
export function Tbc({ show = true, className = "" }: { show?: boolean; className?: string }) {
  if (!SHOW_TBC || !show) return null;
  return (
    <span
      title="Placeholder — to be confirmed by Drakken"
      className={`inline-flex border border-current px-1 py-px align-middle font-mono text-[10px] uppercase leading-none tracking-normal opacity-70 ${className}`}
    >
      TBC
    </span>
  );
}
