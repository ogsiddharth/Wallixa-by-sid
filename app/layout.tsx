import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://wallixa.netlify.app"),

  title: {
    default: "Wallixa | Premium 4K & 8K Wallpapers",
    template: "%s | Wallixa",
  },

  description:
    "Download premium 4K, 8K, AMOLED, Desktop and Mobile wallpapers. Free high-quality wallpapers updated daily.",

  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Wallixa Studio",
  },

  keywords: [
    "Wallpapers",
    "4K Wallpapers",
    "8K Wallpapers",
    "AMOLED Wallpapers",
    "Desktop Wallpapers",
    "Mobile Wallpapers",
    "Anime Wallpapers",
    "Car Wallpapers",
    "Nature Wallpapers",
    "Gaming Wallpapers",
    "Marvel Wallpapers",
    "Wallixa",
  ],

  authors: [
    {
      name: "Wallixa",
    },
  ],

  creator: "Wallixa",
  publisher: "Wallixa",

  openGraph: {
    title: "Wallixa | Premium Wallpapers",
    description:
      "Download Premium 4K, 8K, Desktop, Mobile & AMOLED Wallpapers.",
    url: "https://wallixa.netlify.app",
    siteName: "Wallixa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wallixa Premium 4K & 8K Wallpapers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Wallixa",
    description: "Premium 4K & 8K Wallpapers",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/icon-512.png",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          {children}
          <BackToTop />
        </FavoritesProvider>
      </body>
    </html>
  );
}