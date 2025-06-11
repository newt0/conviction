export const DEFAULT = "DEFAULT";
export const DEFAULT_USER_ID = "ConvictionFi"; // デフォルトのユーザーID

export interface ProductSocials {
  userId?: typeof DEFAULT | string;
  orgId?: typeof DEFAULT | string;
  inviteUrl?: string;
  customUrl?: string; // 例外的にベースURL + ID以外の構造を持つ場合
}

// プラットフォームIDに対応する各ソーシャル情報
export const PRODUCT_SOCIALS: Record<string, ProductSocials> = {
  twitter: { userId: "conviction_ai" },
  instagram: { userId: DEFAULT },
  github: { orgId: DEFAULT },
  linkedin: { orgId: DEFAULT },
  discord: { inviteUrl: "https://discord.gg/convictionfi" },
  telegram: { inviteUrl: "https://t.me/convictionfi" },
  youtube: { userId: DEFAULT },
  threads: { userId: DEFAULT },
  tiktok: { userId: DEFAULT },
  medium: { userId: DEFAULT },
  devto: { userId: DEFAULT },
  facebook: { userId: DEFAULT },
  qiita: { userId: DEFAULT },
  zenn: { userId: DEFAULT },
};
