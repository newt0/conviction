// App Router optimized constant exports
// All exports are server-safe and tree-shakeable

export * from "./brandcopy";
export * from "./product-socials";
export * from "./social-platforms";
export * from "./external-links";
export * from "./site-metadata";
export * from "./team-members";
export * from "./smart-contracts";

// Chain-specific exports (dynamic import optimized)
export * from "./chain-info";
export * from "./contracts";

// Re-export commonly used constants for convenience
export { BRAND_COPY } from "./brandcopy";
export { SITE_METADATA } from "./site-metadata";
export { DEFAULT_USER_ID, PRODUCT_SOCIALS } from "./product-socials";
export { SOCIAL_PLATFORMS } from "./social-platforms";
export { EXTERNAL_LINKS } from "./external-links";
