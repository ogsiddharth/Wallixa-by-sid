import WallpaperCard from "@/components/cards/WallpaperCard";
import styles from "./Trending.module.css";
import { wallpapers } from "@/data/wallpapers";

export default function Trending() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.heading}>
          <h2>🔥 Trending Wallpapers</h2>
          <p>Most downloaded wallpapers this week.</p>
        </div>

        <div className={styles.grid}>
          {wallpapers.map((item) => (
          <WallpaperCard
  key={item.id}
  image={item.image}
  title={item.title}
  category={item.category}
  resolution={item.resolution}
  slug={item.slug}
  showActions={false}
/>
          ))}
        </div>

      </div>
    </section>
  );
}