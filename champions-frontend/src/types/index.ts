export interface Level {
  key: string;
  name: string;
  icon: string;
  minPoints: number;
}

export interface ActiveCampaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  headline: string | null;
  subtext: string | null;
  category: string;
  hero: {
    imageUrl: string | null;
    videoUrl: string | null;
    mediaType: "image" | "video";
  };
  target: number;
  raised: number;
  percentComplete: number;
  donationsToday: number;
  championsCount: number;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string | null;
  progress: number;
  level: Level | null;
  badgeCount: number;
}

export interface ActivityItem {
  id: string;
  type: "donation" | "share" | "badge";
  message: string;
  timeAgo: string;
}

export interface ImpactStory {
  id: string;
  campaignTitle: string | null;
  campaignSlug: string | null;
  beforeImage: string | null;
  afterImage: string | null;
  description: string | null;
  date: string;
  progressPercentage: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  requirementDescription?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  milestones: { label: string; value: number }[];
  endsAt: string | null;
}

export interface ChampionProfile {
  id: string;
  name: string;
  avatar: string | null;
  points: number;
  level: Level | null;
  nextLevel: (Level & { pointsToNext: number }) | null;
  levelProgress: number;
  badges: { name: string; icon: string | null; unlockedAt: string }[];
  campaignsSupported: { title: string; slug: string }[];
}
