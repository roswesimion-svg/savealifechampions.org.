import type { Challenge } from "../types";
import LiveBadge from "./LiveBadge";

export default function ChallengeSection({ challenges, loading }: { challenges: Challenge[]; loading: boolean }) {
  if (loading && challenges.length === 0) return null;
  if (challenges.length === 0) return null;

  const challenge = challenges[0];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-ember/20 bg-gradient-to-br from-panel2 to-panel p-8">
        <div className="flex flex-wrap items-center gap-3">
          <LiveBadge label="TONIGHT'S CHALLENGE" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{challenge.title}</h2>
        {challenge.description && <p className="mt-2 max-w-xl text-white/60">{challenge.description}</p>}

        <div className="mt-6">
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-ember to-gold transition-all duration-700"
              style={{ width: `${challenge.progress}%` }}
            />
          </div>

          {challenge.milestones.length > 0 && (
            <div className="mt-3 flex justify-between text-xs text-white/50">
              {challenge.milestones.map((m) => (
                <span key={m.label} className={challenge.progress >= m.value ? "text-gold" : ""}>
                  🎯 {m.label}
                </span>
              ))}
            </div>
          )}
        </div>

        <a
          href="#champion-board"
          className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink"
        >
          Help Reach The Milestone
        </a>
      </div>
    </section>
  );
}
