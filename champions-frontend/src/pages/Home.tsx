import { fetchActiveCampaign, fetchActivity, fetchBadges, fetchChallenges, fetchImpactStories, fetchLeaderboard, fetchLevels } from "../lib/api";
import { usePolling } from "../hooks/usePolling";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LiveStats from "../components/LiveStats";
import ChampionBoard from "../components/ChampionBoard";
import ActivityFeed from "../components/ActivityFeed";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import ChallengeSection from "../components/ChallengeSection";
import ChampionLevels from "../components/ChampionLevels";
import BadgeShowcase from "../components/BadgeShowcase";
import SeeOurWork from "../components/SeeOurWork";
import Footer from "../components/Footer";

export default function Home() {
  const campaign = usePolling(fetchActiveCampaign, 20_000);
  const leaderboard = usePolling(() => fetchLeaderboard(5), 15_000);
  const activity = usePolling(() => fetchActivity(10), 12_000);
  const stories = usePolling(() => fetchImpactStories(campaign.data?.id), 60_000, [campaign.data?.id]);
  const levels = usePolling(fetchLevels, 5 * 60_000);
  const badges = usePolling(fetchBadges, 5 * 60_000);
  const challenges = usePolling(() => fetchChallenges(campaign.data?.id), 20_000, [campaign.data?.id]);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <Hero campaign={campaign.data} />
      <LiveStats campaign={campaign.data} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <ChampionBoard entries={leaderboard.data ?? []} loading={leaderboard.loading} />
        <div className="lg:pt-[4.5rem]">
          <ActivityFeed items={activity.data ?? []} loading={activity.loading} />
        </div>
      </div>

      <section id="impact" className="mx-auto max-w-6xl px-6 py-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">See The Impact</h2>
        <p className="mt-2 max-w-xl text-white/60">Drag the slider to see what Champions make possible.</p>
        <div className="mt-6">
          <BeforeAfterSlider stories={stories.data ?? []} loading={stories.loading} />
        </div>
      </section>

      <ChallengeSection challenges={challenges.data ?? []} loading={challenges.loading} />
      <ChampionLevels levels={levels.data ?? []} loading={levels.loading} />
      <BadgeShowcase badges={badges.data ?? []} loading={badges.loading} />
      <SeeOurWork />
      <Footer />
    </div>
  );
}
