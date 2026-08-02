import WallpaperCard from "@/components/cards/WallpaperCard";
import { wallpapers } from "@/data/wallpapers";
import styles from "./RelatedWallpapers.module.css";

type Props = {
  currentSlug: string;
};

export default function RelatedWallpapers({ currentSlug }: Props) {
  const related = wallpapers
    .filter((item) => item.slug !== currentSlug)
    .slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h2>🔥 Similar Wallpapers</h2>
        <p>You may also like these wallpapers.</p>

        <div className={styles.grid}>
          {related.map((item) => (
           <WallpaperCard
  key={item.slug}
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