import WallpaperCard from "@/components/cards/WallpaperCard";
import styles from "./LatestSection.module.css";
import { getLatestWallpapers } from "@/lib/firestore";

export default async function LatestSection() {
  const wallpapers = await getLatestWallpapers();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>✨ Latest Wallpapers</h2>
          <p>Recently uploaded premium wallpapers.</p>
        </div>

        <div className={styles.grid}>
          {wallpapers.length > 0 ? (
            wallpapers.map((item: any) => (
              <WallpaperCard
               id={item.id}
                key={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                resolution={item.resolution}
                slug={item.slug}
                showActions={false}
              />
            ))
          ) : (
            <p
              style={{
                color: "#888",
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              No wallpapers uploaded yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}