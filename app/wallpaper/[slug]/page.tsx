import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { wallpapers } from "@/data/wallpapers";
import styles from "./WallpaperDetails.module.css";
import Navbar from "@/components/layout/Navbar";
import RelatedWallpapers from "@/components/sections/RelatedWallpapers";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WallpaperDetailsPage({ params }: Props) {
  const { slug } = await params;

  const wallpaper = wallpapers.find((item) => item.slug === slug);

  if (!wallpaper) {
    notFound();
  }

  return (
   <>
  <Navbar />

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
            Download this premium {wallpaper.resolution} wallpaper in ultra HD
            quality for your desktop, laptop or mobile device.
          </p>

          <div className={styles.stats}>

            <div className={styles.statCard}>
              <h3>{wallpaper.likes.toLocaleString()}</h3>
              <span>Likes</span>
            </div>

            <div className={styles.statCard}>
              <h3>{wallpaper.downloads.toLocaleString()}</h3>
              <span>Downloads</span>
            </div>

          </div>

          <div className={styles.actions}>

            <a
              href={wallpaper.image}
              download
              className={styles.downloadBtn}
            >
              ⬇ Download Wallpaper
            </a>

            <Link
              href="/"
              className={styles.backBtn}
            >
              ← Back Home
            </Link>

          </div>

        </div>

      </div>
      <RelatedWallpapers currentSlug={wallpaper.slug} />
    </main>
    
  </>
  );
}