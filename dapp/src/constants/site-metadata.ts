import type { Metadata } from "next";
import { BRAND_COPY, DEFAULT_USER_ID, EXTERNAL_LINKS } from "@/constants";

const { productName, tagline, shortDescription } = BRAND_COPY;
const { LP } = EXTERNAL_LINKS.WEBSITE;

export const SITE_METADATA: Metadata = {
  title: `${productName} - ${tagline}`,
  description: shortDescription,
  metadataBase: new URL(LP),
  openGraph: {
    title: `${productName} - ${tagline}`,
    description: shortDescription,
    url: LP,
    siteName: productName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${productName} OGP`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${productName} - ${tagline}`,
    description: shortDescription,
    creator: DEFAULT_USER_ID,
    images: ["/og-image.png"],
  },
};
