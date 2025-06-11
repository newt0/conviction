import { DEFAULT_USER_ID } from "@/constants/product-socials";
import { SOCIAL_PLATFORMS } from "@/constants/social-platforms";
import { PRODUCT_SOCIALS } from "@/constants/product-socials";
import { DEFAULT } from "@/constants/product-socials"; // "DEFAULT"という文字列と一致させるための定数
import { TeamMember } from "@/constants/team-members";

/**
 * 特定のSNS IDに対応する完全なURLを返す
 */
export function getSocialUrl(platformId: string): string | undefined {
  const platform = SOCIAL_PLATFORMS.find((p) => p.id === platformId);
  const config = PRODUCT_SOCIALS[platformId];

  if (!platform || !config) return undefined;

  // カスタムURL優先
  if (config.customUrl) return config.customUrl;

  // 招待リンクがある場合（Discord, Telegramなど）
  if (config.inviteUrl) return config.inviteUrl;

  // Organization系URL
  if (config.orgId) {
    const orgId = config.orgId === DEFAULT ? DEFAULT_USER_ID : config.orgId;
    return platform.orgUrl ? platform.orgUrl + orgId : undefined;
  }

  // ユーザー系URL
  if (config.userId) {
    const userId = config.userId === DEFAULT ? DEFAULT_USER_ID : config.userId;
    return platform.url ? platform.url + userId : undefined;
  }

  return undefined;
}

/**
 * 表示用SNSリンクの配列を取得（URLが存在するもののみ）
 */
export function getAllSocialLinks(): {
  id: string;
  displayName: string;
  icon: string;
  url: string;
}[] {
  return SOCIAL_PLATFORMS.flatMap((platform) => {
    const url = getSocialUrl(platform.id);
    if (!url) return [];
    return [
      {
        id: platform.id,
        displayName: platform.displayName,
        icon: platform.icon,
        url,
      },
    ];
  });
}

type SocialIdKey = keyof Pick<
  TeamMember,
  | "twitterId"
  | "githubId"
  | "linkedinId"
  | "facebookId"
  | "telegramId"
  | "instagramId"
  | "devtoId"
  | "mediumId"
  | "tiktokId"
  | "qiitaId"
  | "zennId"
>;

export function resolveSocialId(
  member: TeamMember,
  key: SocialIdKey
): string | undefined {
  const value = member[key];
  return value === DEFAULT ? member.userId : value;
}
