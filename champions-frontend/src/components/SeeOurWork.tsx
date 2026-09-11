import { mainSiteUrl } from "../lib/api";

export default function SeeOurWork() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col items-start gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-panel2 to-panel p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Beyond the leaderboard</p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">See Our Work</h2>
          <p className="mt-2 max-w-lg text-white/60">
            Save A Life Champions is part of the wider Save A Life Africa movement. Visit the main site for our full
            story, projects, articles and ways to get involved.
          </p>
        </div>
        <a
          href={mainSiteUrl()}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
        >
          Visit savealifeafrica.org
        </a>
      </div>
    </section>
  );
}
