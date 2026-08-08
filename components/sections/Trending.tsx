import WallpaperCard from "@/components/cards/WallpaperCard";
import styles from "./Trending.module.css";
import { getTrendingWallpapers } from "@/lib/firestore";

export default async function Trending() {
  const wallpapers = await getTrendingWallpapers();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>🔥 Trending Wallpapers</h2>
          <p>Most downloaded wallpapers this week.</p>
        </div>

        <div className={styles.grid}>
          {wallpapers.length > 0 ? (
            wallpapers.map((item: any) => (
              <WallpaperCard
                key={item.id}
                 id={item.id}
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
              No trending wallpapers yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}