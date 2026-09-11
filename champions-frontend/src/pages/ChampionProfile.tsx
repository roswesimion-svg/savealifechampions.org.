import { useParams } from "react-router-dom";
import { fetchChampionProfile } from "../lib/api";
import { usePolling } from "../hooks/usePolling";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ChampionProfilePage() {
  const { id } = useParams<{ id: string }>();
  const profile = usePolling(() => fetchChampionProfile(id!), 30_000, [id]);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-16">
        {profile.loading && !profile.data && <div className="h-64 animate-pulse rounded-3xl bg-white/5" />}
        {profile.error && !profile.data && (
          <p className="rounded-2xl border border-white/10 bg-panel/60 p-8 text-center text-white/60">
            This Champion profile isn't available.
          </p>
        )}

        {profile.data && (
          <div className="rounded-3xl border border-white/10 bg-panel/60 p-8 text-center">
            {profile.data.avatar ? (
              <img src={profile.data.avatar} alt="" className="mx-auto h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold">
                {profile.data.name[0]}
              </div>
            )}
            <h1 className="mt-4 font-display text-2xl font-semibold">{profile.data.name}</h1>
            {profile.data.level && (
              <p className="mt-1 text-gold">
                {profile.data.level.icon} {profile.data.level.name}
              </p>
            )}

            <div className="mx-auto mt-6 max-w-xs">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-gold to-goldSoft" style={{ width: `${profile.data.levelProgress}%` }} />
              </div>
              {profile.data.nextLevel && (
                <p className="mt-2 text-xs text-white/50">
                  {profile.data.nextLevel.pointsToNext.toLocaleString()} points until {profile.data.nextLevel.name}
                </p>
              )}
            </div>

            {profile.data.badges.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {profile.data.badges.map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-panel/60 px-3 py-3">
                    <span className="text-2xl">{b.icon || "🏅"}</span>
                    <span className="text-xs text-white/70">{b.name}</span>
                  </div>
                ))}
              </div>
            )}

            {profile.data.campaignsSupported.length > 0 && (
              <div className="mt-8 text-left">
                <p className="text-sm font-semibold text-white/70">Campaigns Supported</p>
                <ul className="mt-2 space-y-1 text-sm text-white/60">
                  {profile.data.campaignsSupported.map((c) => (
                    <li key={c.slug}>{c.title}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => navigator.share?.({ title: `${profile.data!.name}'s Champion Profile`, url: window.location.href })}
              className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink"
            >
              Share This Profile
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
