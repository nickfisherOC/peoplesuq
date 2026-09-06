import Image from "next/image";
import { partners } from "@/content/partners";

/**
 * Community partners logo strip. Logos are shown on a light chip so varied
 * source logos read consistently against the dark UI. Real partners only.
 */
export default function PartnersStrip() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {partners.map((p) => {
        const logo = (
          <div className="flex h-24 items-center justify-center rounded-xl bg-white/95 p-5">
            <Image
              src={p.logo.src}
              alt={p.logo.alt}
              width={180}
              height={72}
              className="max-h-14 w-auto object-contain"
              sizes="180px"
            />
          </div>
        );
        return (
          <li key={p.name}>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-90"
                title={p.name}
              >
                {logo}
              </a>
            ) : (
              logo
            )}
          </li>
        );
      })}
    </ul>
  );
}
