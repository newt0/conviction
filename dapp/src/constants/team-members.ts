const DEFAULT = "DEFAULT";

export interface TeamMember {
  userId: string; // 各SNSの共通デフォルトIDとして使われる
  name: string;
  displayName?: string;
  roles: string[];
  bio: string;
  avatar: string;
  twitterId?: typeof DEFAULT | string;
  githubId?: typeof DEFAULT | string;
  linkedinId?: typeof DEFAULT | string;
  facebookId?: typeof DEFAULT | string;
  telegramId?: typeof DEFAULT | string;
  instagramId?: typeof DEFAULT | string;
  devtoId?: typeof DEFAULT | string;
  mediumId?: typeof DEFAULT | string;
  tiktokId?: typeof DEFAULT | string;
  qiitaId?: typeof DEFAULT | string;
  zennId?: typeof DEFAULT | string;
}

export const TEAM_MEMBERS: Record<string, TeamMember> = {
  kyohei: {
    userId: "kyohei_nft",
    name: "Kyohei Ito",
    roles: ["Founder", "Dev"],
    bio: "Killer dApps builder. Top contributor to Japan’s web3 & dev ecosystem. Ex-CTO. Built L1/L2, app chains, NFTs, enterprise.",
    avatar: "/avatars/kyohei.png",
    twitterId: DEFAULT,
    githubId: DEFAULT,
    linkedinId: DEFAULT,
  },
};
