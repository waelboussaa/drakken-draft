import type { ServiceIcon } from "@/content/site";

// Isometric line-art icons for the service lines.
const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function EHouse() {
  return (
    <svg viewBox="0 0 64 64" {...common}>
      <path d="M8 26l24-10 24 10-24 10z" />
      <path d="M8 26v16l24 10 24-10V26" />
      <path d="M32 36v16" />
      <path d="M14 33v8l6 2.5v-8zM22 36.4v8l6 2.5v-8z" />
      <path d="M42 39l-3 6h4l-3 6" />
    </svg>
  );
}

function Scada() {
  return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="8" y="12" width="48" height="30" rx="1" />
      <path d="M14 34l8-8 6 5 10-12 8 6" />
      <path d="M26 42l-4 10h20l-4-10M18 52h28" />
      <circle cx="46" cy="25" r="1.6" />
    </svg>
  );
}

function Instrument() {
  return (
    <svg viewBox="0 0 64 64" {...common}>
      <circle cx="32" cy="24" r="14" />
      <circle cx="32" cy="24" r="2" />
      <path d="M32 24l7-6M22 30h2M40 30h2M24 16l1.5 1.5M40 16l-1.5 1.5M32 12v2" />
      <path d="M28 38v6h8v-6M8 50h48M8 56h48M32 44v6" />
    </svg>
  );
}

function Hazard() {
  return (
    <svg viewBox="0 0 64 64" {...common}>
      <path d="M32 8L6 54h52z" />
      <path d="M34 22l-6 11h6l-4 11" />
    </svg>
  );
}

export const icons: Record<ServiceIcon, () => React.JSX.Element> = {
  ehouse: EHouse,
  scada: Scada,
  instrument: Instrument,
  hazard: Hazard,
};
