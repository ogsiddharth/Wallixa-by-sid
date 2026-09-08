import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import WallpaperCard from "@/components/cards/WallpaperCard";
import { getDesktopWallpapers } from "@/lib/firestore";

import styles from "./DesktopPage.module.css";

export default async function DesktopPage() {
  const wallpapers = await getDesktopWallpapers();

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <div className={styles.header}>
            <Link href="/" className={styles.back}>
              ← Back Home
            </Link>

            <h1>Desktop Picks</h1>

            <p>
              Premium wallpapers selected for desktop screens.
            </p>
          </div>

          {wallpapers.length === 0 ? (
            <div className={styles.empty}>
              <h2>No desktop wallpapers found</h2>
              <p>
                Desktop wallpapers will appear here when available.
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {wallpapers.map((wallpaper: any) => (
                <WallpaperCard
                  key={wallpaper.id}
                  {...wallpaper}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      <SiteFooter />
    </>
  );
}