import { fetchActiveCampaign, fetchActivity, fetchLeaderboard, donateUrl } from "../lib/api";
import { usePolling } from "../hooks/usePolling";
import LiveBadge from "../components/LiveBadge";
import QrDonateCard from "../components/QrDonateCard";

export default function LiveTV() {
  const campaign = usePolling(fetchActiveCampaign, 15_000);
  const leaderboard = usePolling(() => fetchLeaderboard(5), 10_000);
  const activity = usePolling(() => fetchActivity(6), 8_000);

  const c = campaign.data;

  return (
    <div className="min-h-screen bg-ink px-8 py-8 text-white sm:px-14 sm:py-12">
      <div className="flex items-center justify-between">
        <p className="font-display text-2xl font-semibold tracking-wide sm:text-3xl">
          SAVE A LIFE <span className="text-gold">CHAMPIONS</span>
        </p>
        <LiveBadge />
      </div>

      {c && (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-panel/60 p-6">
            <p className="text-sm uppercase tracking-wide text-white/50">Current Campaign</p>
            <p className="mt-2 font-display text-2xl font-semibold">{c.title}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-panel/60 p-6">
            <p className="text-sm uppercase tracking-wide text-white/50">Champions</p>
            <p className="mt-2 font-display text-3xl font-semibold text-gold">{c.championsCount.toLocaleString()}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-panel/60 p-6">
            <p className="text-sm uppercase tracking-wide text-white/50">Progress</p>
            <p className="mt-2 font-display text-3xl font-semibold text-gold">{c.percentComplete}%</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-gold to-goldSoft" style={{ width: `${c.percentComplete}%` }} />
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-panel/60 p-6">
            <QrDonateCard url={donateUrl(c.slug)} />
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-panel/60 p-6">
          <p className="mb-4 font-display text-xl font-semibold">🏆 Top Champions</p>
          <ul className="space-y-3">
            {(leaderboard.data ?? []).map((entry) => (
              <li key={entry.id} className="flex items-center gap-4">
                <span className="w-8 text-lg font-bold text-gold">{entry.rank}</span>
                <span className="flex-1 truncate text-lg">{entry.name}</span>
                <span className="w-40">
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold to-goldSoft" style={{ width: `${entry.progress}%` }} />
                  </div>
                </span>
                <span className="w-12 text-right text-lg font-semibold">{entry.progress}%</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-panel/60 p-6">
          <p className="mb-4 font-display text-xl font-semibold">🔴 Live Activity</p>
          <ul className="space-y-3">
            {(activity.data ?? []).map((item) => (
              <li key={item.id} className="text-lg text-white/90">
                {item.message} <span className="text-sm text-white/40">· {item.timeAgo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
