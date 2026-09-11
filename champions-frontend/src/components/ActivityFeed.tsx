import type { ActivityItem } from "../types";

const ICONS: Record<ActivityItem["type"], string> = {
  donation: "❤️",
  share: "📣",
  badge: "🏅",
};

export default function ActivityFeed({ items, loading }: { items: ActivityItem[]; loading: boolean }) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-panel/60 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>⚡</span>
          <h3 className="font-display text-lg font-semibold">Live Activity</h3>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-savanna animate-pulseDot" />
          Real-time updates
        </span>
      </div>

      {loading && items.length === 0 && (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 animate-pulse rounded-lg bg-white/5" />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && <p className="text-sm text-white/50">Activity will appear here as Champions take action.</p>}

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3 animate-riseIn">
            <span className="text-lg leading-none">{ICONS[item.type] ?? "✨"}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white/90">{item.message}</p>
              <p className="text-xs text-white/40">{item.timeAgo}</p>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="#champion-board"
        className="mt-5 flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/10 py-2.5 text-sm font-medium text-gold transition hover:bg-gold/15"
      >
        You could be next <span aria-hidden>→</span>
      </a>
    </aside>
  );
}
