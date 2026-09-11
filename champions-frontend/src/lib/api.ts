import type { ActiveCampaign, ActivityItem, Badge, ChampionProfile, Challenge, ImpactStory, LeaderboardEntry, Level } from "../types";

// The Champions frontend has its own domain but calls the SAME backend as
// savealifeafrica.org — set this to that API's base URL in your deploy env
// (e.g. https://api.savealifeafrica.org/api). No separate database.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${path} (${res.status})`);
  const json = await res.json();
  if (json && typeof json === "object" && "success" in json) {
    if (!json.success) throw new Error(json.error || "Request failed");
    return json.data as T;
  }
  return json as T;
}

export async function fetchActiveCampaign(): Promise<ActiveCampaign> {
  return getJSON<ActiveCampaign>("/champions/active-campaign");
}

export async function fetchLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  return getJSON<LeaderboardEntry[]>(`/champions/leaderboard?limit=${limit}`);
}

export async function fetchActivity(limit = 10): Promise<ActivityItem[]> {
  return getJSON<ActivityItem[]>(`/champions/activity?limit=${limit}`);
}

export async function fetchImpactStories(campaignId?: string): Promise<ImpactStory[]> {
  return getJSON<ImpactStory[]>(`/champions/impact-stories${campaignId ? `?campaignId=${campaignId}` : ""}`);
}

export async function fetchChallenges(campaignId?: string): Promise<Challenge[]> {
  return getJSON<Challenge[]>(`/champions/challenges${campaignId ? `?campaignId=${campaignId}` : ""}`);
}

export async function fetchLevels(): Promise<Level[]> {
  return getJSON<Level[]>("/champions/levels");
}

export async function fetchBadges(): Promise<Badge[]> {
  // Reuses the existing, already-public badges endpoint — no duplicate system.
  return getJSON<Badge[]>("/badges/all");
}

export async function fetchChampionProfile(id: string): Promise<ChampionProfile> {
  return getJSON<ChampionProfile>(`/champions/profile/${id}`);
}

// The main site (savealifeafrica.org) remains the single source of truth
// for the actual payment flow (M-Pesa / Stripe / PayPal) — we link out to
// it rather than duplicating a second payment gateway here.
const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL || "https://savealifeafrica.org";

export function donateUrl(campaignSlug: string) {
  return `${MAIN_SITE_URL}/campaigns/${campaignSlug}`;
}

export function mainSiteUrl() {
  return MAIN_SITE_URL;
}
