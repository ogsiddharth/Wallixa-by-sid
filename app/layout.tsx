import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wallixa | Premium 4K • 8K Wallpapers",
  description:
    "Download Premium 4K, 8K, AMOLED, Desktop and Mobile Wallpapers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}