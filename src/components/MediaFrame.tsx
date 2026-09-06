import Image from "next/image";

type Aspect = "square" | "video" | "portrait" | "wide" | "ultrawide";

const aspectClass: Record<Aspect, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/10]",
  ultrawide: "aspect-[21/9]",
};

/**
 * Deterministic duotone colour schemes built from the brand palette.
 * We avoid stock photography for placeholders; instead we render bold,
 * editorial graphic frames that clearly read as "image goes here" while
 * still feeling premium and on-brand.
 */
const schemes = [
  { bg: "#2f0e63", accent: "#f97316", ink: "#b088ff" }, // purple / orange
  { bg: "#131318", accent: "#7b2ff0", ink: "#9257f7" }, // charcoal / purple
  { bg: "#43138a", accent: "#ffa565", ink: "#cfb6ff" }, // deep purple / peach
  { bg: "#1c083c", accent: "#f97316", ink: "#9257f7" }, // ink-purple / orange
  { bg: "#5717b0", accent: "#ffc79c", ink: "#e7dbff" }, // purple / cream-orange
];

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function initials(label: string): string {
  const words = label.replace(/[^A-Za-z0-9 ]/g, "").trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

interface MediaFrameProps {
  /** Real image source. When present (and not empty) a next/image renders. */
  src?: string;
  alt: string;
  /** Seed for deterministic placeholder styling (usually a slug). */
  seed: string;
  /** Big label shown faintly on the placeholder. */
  label?: string;
  aspect?: Aspect;
  className?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: boolean;
}

/**
 * A framed media slot. Renders a real optimized image when `src` is provided,
 * otherwise a branded graphic placeholder derived from `seed`.
 */
export default function MediaFrame({
  src,
  alt,
  seed,
  label,
  aspect = "video",
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = true,
}: MediaFrameProps) {
  const base = `relative overflow-hidden bg-charcoal ${rounded ? "rounded-xl" : ""} ${aspectClass[aspect]} ${className}`;

  if (src && src.trim() !== "") {
    return (
      <div className={base}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const scheme = schemes[hash(seed) % schemes.length];
  const rotate = (hash(seed + "r") % 12) - 6; // -6..5 deg
  const mono = initials(label ?? alt);

  return (
    <div
      className={base}
      style={{ backgroundColor: scheme.bg }}
      role="img"
      aria-label={alt}
    >
      {/* Bold offset accent bar */}
      <div
        aria-hidden
        className="absolute -right-6 top-1/2 h-[140%] w-1/3 -translate-y-1/2"
        style={{
          backgroundColor: scheme.accent,
          transform: `translateY(-50%) rotate(${rotate}deg)`,
          opacity: 0.9,
        }}
      />
      {/* Faint oversized monogram */}
      <span
        aria-hidden
        className="headline absolute -bottom-4 left-3 select-none leading-none"
        style={{
          color: scheme.ink,
          opacity: 0.22,
          fontSize: "clamp(5rem, 22vw, 12rem)",
        }}
      >
        {mono}
      </span>
      {/* Corner brand mark */}
      <span
        aria-hidden
        className="eyebrow absolute right-3 top-3 text-white/60"
      >
        People Suq
      </span>
    </div>
  );
}
