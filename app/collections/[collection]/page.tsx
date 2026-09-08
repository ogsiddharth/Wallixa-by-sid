import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import WallpaperCard from "@/components/cards/WallpaperCard";
import { getCollectionWallpapers } from "@/lib/firestore";
import styles from "./CollectionPage.module.css";

type CollectionPageProps = {
  params: Promise<{
    collection: string;
  }>;
};

export default async function CollectionPage({
  params,
}: CollectionPageProps) {
  const { collection } = await params;
const collectionNames: Record<string, string> = {
  amoled: "AMOLED",
  dc: "DC",
  space: "Space",
  abstract: "Abstract",
  
};

const collectionName =
  collectionNames[collection.toLowerCase()] || collection;

  const wallpapers = await getCollectionWallpapers(collectionName);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/collections" className={styles.back}>
              ← All Collections
            </Link>

            <h1>{collectionName}</h1>

            <p>
              Explore {collectionName} wallpapers
            </p>
          </div>

          {wallpapers.length === 0 ? (
            <div className={styles.empty}>
              <h2>No wallpapers found</h2>
              <p>
                Wallpapers for this collection will appear here.
              </p>
            </div>
          ) : (
            <div className={styles.grid}>
              {wallpapers.map((wallpaper: any) => (
                <WallpaperCard
                  key={wallpaper.id}
                  {...(wallpaper as any)}
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