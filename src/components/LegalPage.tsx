import PageHeader from "./PageHeader";
import Section from "./Section";

export interface LegalSection {
  heading: string;
  body: string[];
}

/**
 * Shared layout for policy pages. The copy provided here is a plain-language
 * TEMPLATE and must be reviewed by a qualified professional before launch.
 */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} intro={intro} />
      <Section tone="charcoal">
        <div className="mx-auto max-w-2xl">
          <p className="mb-8 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
            Template placeholder — review and finalize with a qualified
            professional before launch.
          </p>
          <p className="text-sm text-white/40">Last updated: {updated}</p>
          <div className="mt-8 space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-white">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-white/65">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
