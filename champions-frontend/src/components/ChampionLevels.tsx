import type { Level } from "../types";

export default function ChampionLevels({ levels, loading }: { levels: Level[]; loading: boolean }) {
  if (loading && levels.length === 0) {
    return <div className="h-40 animate-pulse rounded-3xl bg-white/5" />;
  }
  if (levels.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Champion Levels</h2>
        <p className="mt-2 max-w-xl text-white/60">
          Every donation, share and campaign you support earns Champion Points — climb the ladder as your impact grows.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {levels.map((level, i) => (
          <div
            key={level.key}
            className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-panel/60 px-3 py-5 text-center transition hover:border-gold/30"
          >
            <span className="text-3xl">{level.icon}</span>
            <p className="text-sm font-semibold text-white">{level.name}</p>
            <p className="text-xs text-white/40">{level.minPoints.toLocaleString()}+ pts</p>
          </div>
        ))}
      </div>
    </section>
  );
}
