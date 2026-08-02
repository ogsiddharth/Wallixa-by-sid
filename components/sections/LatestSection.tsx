import WallpaperCard from "@/components/cards/WallpaperCard";
import { wallpapers } from "@/data/wallpapers";
import styles from "./LatestSection.module.css";

export default function LatestSection() {
  const latest = [...wallpapers].slice(-8).reverse();

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.heading}>
          <h2>✨ Latest Wallpapers</h2>
          <p>Freshly added premium wallpapers.</p>
        </div>

        <div className={styles.grid}>
          {latest.map((item) => (
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