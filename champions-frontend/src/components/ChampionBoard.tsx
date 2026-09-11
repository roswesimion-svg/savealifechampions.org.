import type { LeaderboardEntry } from "../types";

const RANK_STYLES: Record<number, string> = {
  1: "bg-gold text-ink",
  2: "bg-white/25 text-white",
  3: "bg-[#C97A3D]/70 text-white",
};

const BAR_COLORS = ["from-gold to-goldSoft", "from-sky-400 to-sky-300", "from-emerald-400 to-emerald-300", "from-violet-400 to-violet-300", "from-teal-400 to-teal-300"];

function initialsAvatar(name: string) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return initials;
}

export default function ChampionBoard({ entries, loading }: { entries: LeaderboardEntry[]; loading: boolean }) {
  return (
    <section id="champion-board" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Live Champion Board</h2>
        </div>
        <span className="hidden rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 sm:inline">
          Top {entries.length || 5}
        </span>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-panel/60">
        {loading && entries.length === 0 && (
          <div className="space-y-3 p-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 animate-pulse rounded-xl bg-white/5" />
            ))}
          </div>
        )}

        {!loading && entries.length === 0 && (
          <p className="p-8 text-center text-white/50">No Champions on the board yet — be the first.</p>
        )}

        <ul>
          {entries.map((entry, i) => (
            <li
              key={entry.id}
              className="flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-none animate-riseIn"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  RANK_STYLES[entry.rank] ?? "bg-white/10 text-white/70"
                }`}
              >
                {entry.rank}
              </div>

              {entry.avatar ? (
                <img src={entry.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                  {initialsAvatar(entry.name)}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium text-white sm:text-base">{entry.name}</p>
                  <span className="shrink-0 text-sm font-semibold text-white/80">{entry.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${BAR_COLORS[i % BAR_COLORS.length]} transition-all duration-700`}
                    style={{ width: `${entry.progress}%` }}
                  />
                </div>
              </div>

              {entry.level && (
                <span className="hidden shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 sm:flex">
                  <span>{entry.level.icon}</span>
                  {entry.level.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
