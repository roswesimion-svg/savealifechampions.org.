export default function LiveBadge({ label = "LIVE NOW" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-ember/15 border border-ember/40 px-3 py-1 text-xs font-semibold tracking-wide text-ember">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-ember animate-pulseDot" />
      </span>
      {label}
    </span>
  );
}
