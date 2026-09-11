import type { ActiveCampaign } from "../types";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel/70 px-5 py-4">
      <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-white/50">{label}</p>
    </div>
  );
}

export default function LiveStats({ campaign }: { campaign: ActiveCampaign | null }) {
  if (!campaign) return null;

  return (
    <section className="mx-auto -mt-10 max-w-6xl px-6">
      <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/10 bg-panel/60 p-4 backdrop-blur sm:grid-cols-4 sm:gap-4 sm:p-6">
        <StatCard label="Champions" value={campaign.championsCount.toLocaleString()} />
        <StatCard label="Donations Today" value={campaign.donationsToday.toLocaleString()} />
        <StatCard label="Campaign" value={campaign.title.length > 16 ? campaign.title.slice(0, 16) + "…" : campaign.title} />
        <div className="col-span-2 flex flex-col justify-center rounded-2xl border border-white/10 bg-panel/70 px-5 py-4 sm:col-span-1">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-wide text-white/50">Progress</span>
            <span className="font-display text-lg font-semibold text-gold">{campaign.percentComplete}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-goldSoft transition-all duration-700"
              style={{ width: `${campaign.percentComplete}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
