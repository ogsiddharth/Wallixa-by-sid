import Link from "next/link";
import WallpaperCard from "@/components/cards/WallpaperCard";
import { getDesktopWallpapers } from "@/lib/firestore";
import styles from "./DesktopPicks.module.css";

export default async function DesktopPicks() {
  const wallpapers = await getDesktopWallpapers();

  if (wallpapers.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h2>Desktop Picks</h2>
          <p>Premium wallpapers for your desktop</p>
        </div>

        <Link href="/desktop" className={styles.viewAll}>
          View All
        </Link>
      </div>

      <div className={styles.grid}>
        {wallpapers.map((wallpaper: any) => (
          <WallpaperCard
            key={wallpaper.id}
            {...wallpaper}
          />
        ))}
      </div>
    </section>
  );
}