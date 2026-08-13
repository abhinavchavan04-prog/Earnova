import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://earnova.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Earnova | Direct Access to Verified Micro-Tasks & Freelance Jobs",
    template: "%s | Earnova",
  },
  description:
    "Earnova is a direct work sourcing engine connecting subscribers with verified daily micro-tasks, freelance projects, and instant UPI/bank payouts.",
  keywords: [
    "Earnova",
    "Micro tasks India",
    "Online earning platform",
    "Freelance jobs subscription",
    "Nova Points",
    "Daily task earnings",
    "Instant UPI payout",
    "Razorpay payout platform",
  ],
  authors: [{ name: "Earnova Technologies" }],
  creator: "Earnova Technologies",
  publisher: "Earnova Technologies",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Earnova",
    title: "Earnova | Direct Access to Verified Micro-Tasks & Freelance Jobs",
    description:
      "Earnova is a direct work sourcing engine connecting subscribers with verified daily micro-tasks, freelance projects, and instant UPI/bank payouts.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Earnova Platform Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earnova | Direct Access to Verified Micro-Tasks & Freelance Jobs",
    description:
      "Earnova is a direct work sourcing engine connecting subscribers with verified daily micro-tasks, freelance projects, and instant UPI/bank payouts.",
    creator: "@earnova_app",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
