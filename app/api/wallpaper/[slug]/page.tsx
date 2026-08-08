import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DownloadButton from "@/components/ui/DownloadButton";
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