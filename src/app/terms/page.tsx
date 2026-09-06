import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for using the People Suq website.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="Draft — not yet finalized"
      intro="The basic terms for using the People Suq website and its content."
      sections={[
        {
          heading: "Acceptance",
          body: [
            `By using ${site.name} (${site.domain}), you agree to these terms. If you don't agree, please don't use the site.`,
          ],
        },
        {
          heading: "Content and purpose",
          body: [
            "People Suq shares media, stories, and conversations for awareness and community purposes. Content is for general information and is not medical, legal, or professional advice.",
            "If you are in crisis, please contact a qualified professional or your local emergency services.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "Unless otherwise noted, content on this site is owned by or licensed to People Suq / SUQ MEDIA. Please don't reuse it without permission.",
          ],
        },
        {
          heading: "User submissions",
          body: [
            "When you submit a story or other material, you confirm it's yours to share and you grant us permission to use it as agreed. You keep ownership of your story.",
          ],
        },
        {
          heading: "Third-party links",
          body: [
            "The site links to third parties (including SUQ MEDIA, the Markin K Kossowski Foundation, and listening platforms). We aren't responsible for their content or policies.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "We may update these terms as the platform grows. Continued use of the site means you accept the current terms.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms? Email ${contact.email}.`],
        },
      ]}
    />
  );
}
