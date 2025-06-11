export interface SocialPlatform {
  id: string; // e.g., "twitter", "github"
  displayName: string; // Display Name
  icon: string; // e.g., "/icons/twitter.svg"
  url?: string; // for user-level profile URLs
  orgUrl?: string; // for organization-level profiles
  type?: "profile" | "organization" | "invite";
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "twitter",
    displayName: "Twitter",
    icon: "/icons/twitter.svg",
    url: "https://twitter.com/",
    type: "profile",
  },
  {
    id: "linkedin",
    displayName: "LinkedIn",
    icon: "/icons/linkedin.svg",
    url: "https://linkedin.com/in/",
    orgUrl: "https://linkedin.com/company/",
    type: "organization",
  },
  {
    id: "github",
    displayName: "GitHub",
    icon: "/icons/github.svg",
    url: "https://github.com/",
    type: "profile",
  },
  {
    id: "instagram",
    displayName: "Instagram",
    icon: "/icons/instagram.svg",
    url: "https://instagram.com/",
    type: "profile",
  },
  {
    id: "medium",
    displayName: "Medium",
    icon: "/icons/medium.svg",
    url: "https://medium.com/",
    type: "profile",
  },
  {
    id: "devto",
    displayName: "dev.to",
    icon: "/icons/devto.svg",
    url: "https://dev.to/",
    type: "profile",
  },
  {
    id: "tiktok",
    displayName: "TikTok",
    icon: "/icons/tiktok.svg",
    url: "https://www.tiktok.com/@",
    type: "profile",
  },
  {
    id: "threads",
    displayName: "Threads",
    icon: "/icons/threads.svg",
    url: "https://www.threads.net/@",
    type: "profile",
  },
  {
    id: "discord",
    displayName: "Discord",
    icon: "/icons/discord.svg",
    type: "invite",
  },
];
