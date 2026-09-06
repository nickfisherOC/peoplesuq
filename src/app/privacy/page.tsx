import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How People Suq handles your information.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="Draft — not yet finalized"
      intro="How People Suq collects, uses, and protects your information. This is a plain-language starting point."
      sections={[
        {
          heading: "Overview",
          body: [
            `${site.name} respects your privacy. This policy explains what information we collect when you visit the site or interact with us, and how we use it.`,
          ],
        },
        {
          heading: "Information we collect",
          body: [
            "Information you give us directly — for example, when you email us or submit a story (your name, contact details, and anything you choose to share).",
            "Basic usage data collected automatically to help us understand how the site is used and improve it.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To respond to you, publish stories only with your consent, operate and improve the site, and communicate about People Suq.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "Stories and consent",
          body: [
            "Nothing you share as a story is published without your explicit consent. You control how you are named or shown.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "We use trusted third parties for things like video hosting, podcast distribution, analytics, and (in future) merchandise checkout. Their handling of data is governed by their own policies.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can ask us to access, correct, or delete personal information we hold about you at any time.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about privacy? Email ${contact.email}.`],
        },
      ]}
    />
  );
}
