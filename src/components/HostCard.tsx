import MediaFrame from "./MediaFrame";
import type { Host } from "@/content/people";

/** Host / co-founder profile with photo and bio. */
export default function HostCard({ host }: { host: Host }) {
  return (
    <article className="grid gap-6 rounded-2xl border border-white/10 bg-charcoal p-5 sm:grid-cols-[9rem_1fr] sm:p-6">
      <MediaFrame
        seed={host.slug}
        src={host.image.src}
        alt={host.image.alt}
        label={host.name}
        aspect="square"
        className="sm:h-36 sm:w-36"
        sizes="(max-width: 640px) 100vw, 9rem"
      />
      <div>
        <h3 className="text-xl font-bold text-white">{host.name}</h3>
        <p className="mt-0.5 text-sm font-medium uppercase tracking-wider text-orange-400">
          {host.role}
        </p>
        <div className="mt-3 space-y-3">
          {host.bio.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-white/60">
              {p}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
