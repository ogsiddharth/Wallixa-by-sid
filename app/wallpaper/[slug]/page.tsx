import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

// import DownloadButton from "@/components/ui/DownloadButton";
import DownloadButton from "@/components/download/DownloadButton";
import LikeButton from "@/components/ui/LikeButton";
import Navbar from "@/components/layout/Navbar";
import RelatedWallpapers from "@/components/sections/RelatedWallpapers";
import { getWallpaperBySlug } from "@/lib/firestore";

import styles from "./WallpaperDetails.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const wallpaper: any = await getWallpaperBySlug(slug);

  if (!wallpaper) {
    return {
      title: "Wallpaper Not Found",
      description:
        "The requested wallpaper could not be found on Wallixa.",
    };
  }

  const title = wallpaper.title;
  const category = wallpaper.category;
  const resolution = wallpaper.resolution;

  const description =
    `Download ${title} ${resolution} wallpaper on Wallixa. ` +
    `Explore premium ${category} wallpapers in high-quality 4K and 8K resolution.`;

  const canonicalUrl =
    `https://wallixa.com/wallpaper/${wallpaper.slug}`;

  return {
    title: `${title} ${resolution} Wallpaper`,

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    keywords: [
      title,
      `${title} wallpaper`,
      `${category} wallpaper`,
      `${resolution} wallpaper`,
      "4K wallpaper",
      "8K wallpaper",
      "Wallixa",
    ],

    openGraph: {
      type: "website",
      title: `${title} ${resolution} Wallpaper | Wallixa`,
      description,
      url: canonicalUrl,
      siteName: "Wallixa",
      images: [
        {
          url: wallpaper.image,
          width: 1200,
          height: 675,
          alt: `${title} ${category} wallpaper`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} ${resolution} Wallpaper | Wallixa`,
      description,
      images: [wallpaper.image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function WallpaperDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const wallpaper: any = await getWallpaperBySlug(slug);

  if (!wallpaper) {
    notFound();
  }

  return (
    <>
      <Script
        id="wallpaper-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            name: wallpaper.title,
            description:
              `Download ${wallpaper.title} ${wallpaper.resolution} wallpaper on Wallixa.`,
            contentUrl: wallpaper.image,
            url: `https://wallixa.com/wallpaper/${wallpaper.slug}`,
            representativeOfPage: true,
            author: {
              "@type": "Organization",
              name: "Wallixa",
              url: "https://wallixa.com",
            },
          }),
        }}
      />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Image
              src={wallpaper.image}
              alt={wallpaper.title}
              width={900}
              height={1600}
              className={styles.image}
              priority
            />

            <p>❤️ {wallpaper.likes}</p>
          </div>

          <div className={styles.info}>
            <div className={styles.topRow}>
              <span className={styles.badge}>
                {wallpaper.resolution}
              </span>

              <span className={styles.category}>
                {wallpaper.category}
              </span>
            </div>

            <h1 className={styles.title}>
              {wallpaper.title}
            </h1>

            <p className={styles.description}>
              Download this premium{" "}
              {wallpaper.resolution} wallpaper in
              ultra HD quality for your desktop,
              laptop or mobile device.
            </p>

            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>
                  {(wallpaper.likes ?? 0).toLocaleString()}
                </h3>

                <span>Likes</span>
              </div>

              <div className={styles.statCard}>
                <h3>
                  {(wallpaper.downloads ?? 0).toLocaleString()}
                </h3>

                <span>Downloads</span>
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.downloadBtn}>
                <DownloadButton
                  id={wallpaper.id}
                  image={wallpaper.image}
                  filename={wallpaper.title}
                />
              </div>

              <LikeButton id={wallpaper.id} />

              <Link
                href="/"
                className={styles.backBtn}
              >
                ← Back Home
              </Link>
            </div>
          </div>
        </div>

        <RelatedWallpapers
          currentSlug={wallpaper.slug}
          category={wallpaper.category}
        />
      </main>
    </>
  );
}