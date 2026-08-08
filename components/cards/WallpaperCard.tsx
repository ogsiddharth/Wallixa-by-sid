"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./WallpaperCard.module.css";
import { Heart, Eye, Download } from "lucide-react";
import useFavorites from "@/hooks/useFavorites";
import DownloadButton from "@/components/download/DownloadButton";

type Props = {
  id: string;
  image: string;
  title: string;
  category: string;
  resolution: string;
  slug: string;
  showActions?: boolean;
};

export default function WallpaperCard({
  id,
  image,
  title,
  category,
  resolution,
  slug,
  showActions = true,
}: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const liked = isFavorite(slug);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Local Favorite
    toggleFavorite(slug);

    // Firestore Like
    try {
      await fetch("/api/wallpaper/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link
      href={`/wallpaper/${slug}`}
      className={styles.card}
    >
      <Image
        src={image}
        alt={title}
        fill
        className={styles.image}
      />

      <div className={styles.overlay}>
        <div className={styles.top}>
          <span className={styles.badge}>
            {resolution}
          </span>

          <button
            className={styles.iconBtn}
            onClick={handleLike}
          >
            <Heart
              size={18}
              fill={liked ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className={styles.bottom}>
          <span>{category}</span>

          <h3>{title}</h3>

          {showActions && (
            <div className={styles.actions}>
              <button
                className={styles.viewBtn}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/wallpaper/${slug}`;
                }}
              >
                <Eye size={18} />
                <span>View</span>
              </button>

              <DownloadButton
                image={image}
                filename={`${slug}.jpg`}
                className={styles.download}
              >
                <>
                  <Download size={18} />
                  <span>Download</span>
                </>
              </DownloadButton>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}