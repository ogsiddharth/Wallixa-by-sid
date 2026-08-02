"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./WallpaperCard.module.css";
import { Heart, Download, Eye } from "lucide-react";
import useFavorites from "@/hooks/useFavorites";

type Props = {
  image: string;
  title: string;
  category: string;
  resolution: string;
  slug: string;
  showActions?: boolean;
};

export default function WallpaperCard({
  image,
  title,
  category,
  resolution,
  slug,
  showActions = true,
}: Props) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.includes(slug);

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
          <span className={styles.badge}>{resolution}</span>

          <button
            className={styles.iconBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(slug);
            }}
          >
            <Heart
              size={18}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className={styles.bottom}>
          <span>{category}</span>

          <h3>{title}</h3>

          {showActions && (
            <div className={styles.actions}>
              <div className={styles.viewBtn}>
                <Eye size={18} />
                <span>View</span>
              </div>

              <div className={styles.download}>
                <Download size={18} />
                <span>Download</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}