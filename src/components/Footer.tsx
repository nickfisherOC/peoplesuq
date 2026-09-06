import Link from "next/link";
import Logo from "./Logo";
import {
  site,
  mainNav,
  connectedBrands,
  social,
  listenLinks,
  contact,
} from "@/lib/site";

const socialLinks = [
  { label: "Instagram", href: social.instagram },
  { label: "YouTube", href: social.youtube },
  { label: "TikTok", href: social.tiktok },
  { label: "X", href: social.x },
  { label: "Facebook", href: social.facebook },
];

const listen = [
  { label: "YouTube", href: listenLinks.youtube },
  { label: "Spotify", href: listenLinks.spotify },
  { label: "Apple Podcasts", href: listenLinks.apple },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + mission */}
          <div className="md:col-span-5">
            <Logo className="h-12 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {site.mission}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-white/70 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h2 className="eyebrow mb-4 text-white/40">Explore</h2>
            <ul className="space-y-2.5 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Listen */}
          <div className="md:col-span-2">
            <h2 className="eyebrow mb-4 text-white/40">Listen</h2>
            <ul className="space-y-2.5 text-sm">
              {listen.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected + contact */}
          <div className="md:col-span-2">
            <h2 className="eyebrow mb-4 text-white/40">Connected</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={connectedBrands.suqMedia.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  SUQ MEDIA ↗
                </a>
              </li>
              <li>
                <a
                  href={connectedBrands.foundation.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  MKK Foundation ↗
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white/70 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Powered by{" "}
            <a
              href={connectedBrands.suqMedia.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              SUQ MEDIA
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white/80">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
