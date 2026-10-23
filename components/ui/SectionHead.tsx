import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Rule, numbered label and headline on the left; an optional action or note on the right. */
export function SectionHead({
  index,
  label,
  title,
  aside,
}: {
  index?: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal className="mb-14 grid gap-8 border-t border-current/15 pt-6 md:mb-20 lg:grid-cols-12 lg:items-end">
      <div className="flex flex-col items-start gap-8 lg:col-span-8">
        <SectionLabel index={index}>{label}</SectionLabel>
        <h2 className="text-h2 text-balance">{title}</h2>
      </div>
      {aside && <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end lg:text-right">{aside}</div>}
    </Reveal>
  );
}
