import type { ActiveCampaign } from "../types";
import LiveBadge from "./LiveBadge";
import { donateUrl } from "../lib/api";

export default function Hero({ campaign }: { campaign: ActiveCampaign | null }) {
  const hero = campaign?.hero;

  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="absolute inset-0">
        {hero?.mediaType === "video" && hero.videoUrl ? (
          <video
            className="h-full w-full object-cover"
            src={hero.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            poster={hero.imageUrl ?? undefined}
          />
        ) : hero?.imageUrl ? (
          <img src={hero.imageUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-panel via-ink to-panel2" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-6 py-20 sm:py-28">
        <div className="flex flex-wrap items-center gap-3">
          <LiveBadge />
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            {campaign ? campaign.category : "Save A Life Champions"}
          </span>
        </div>

        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">Save A Life Champions</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            {campaign?.headline ?? (
              <>Together We Make <span className="text-gold">An Impact</span></>
            )}
          </h1>
          <p className="mt-4 max-w-lg text-white/70">
            {campaign?.subtext ??
              campaign?.description ??
              "Real people, real support, real change. Donate, earn Champion points, and climb the live leaderboard."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="#champion-board"
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-goldGlow transition hover:bg-goldSoft"
          >
            Become a Champion
          </a>
          {campaign && (
            <a
              href={donateUrl(campaign.slug)}
              className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Donate Now
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
