import type { Badge } from "../types";

export default function BadgeShowcase({ badges, loading }: { badges: Badge[]; loading: boolean }) {
  if (loading && badges.length === 0) {
    return <div className="h-32 animate-pulse rounded-3xl bg-white/5" />;
  }
  if (badges.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">Badges To Unlock</h2>
      <p className="mt-2 max-w-xl text-white/60">Complete actions as a Champion to unlock these on your profile.</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {badges.slice(0, 12).map((badge) => (
          <div
            key={badge.id}
            className="group relative flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-panel/60 px-3 py-5 text-center"
            title={badge.requirementDescription || badge.description}
          >
            <span className="text-3xl">{badge.icon || "🏅"}</span>
            <p className="text-xs font-medium text-white/80">{badge.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
