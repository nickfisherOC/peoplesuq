import { connectedBrands } from "@/lib/site";

/**
 * Markin K Kossowski Foundation for Hope emblem. Uses a plain <img> because
 * the asset is a trusted local SVG (skips the image optimizer's SVG guard).
 */
export default function FoundationEmblem({
  size = 72,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const f = connectedBrands.foundation;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={f.logo}
      alt={`${f.name} emblem`}
      width={size}
      height={size}
      className={className}
    />
  );
}
