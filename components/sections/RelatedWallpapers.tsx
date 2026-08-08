import WallpaperCard from "@/components/cards/WallpaperCard";
import styles from "./RelatedWallpapers.module.css";
import {
  getCategoryWallpapers,
} from "@/lib/firestore";

type Props = {
  currentSlug: string;
  category: string;
};

export default async function RelatedWallpapers({
  currentSlug,
  category,
}: Props) {
  const wallpapers = await getCategoryWallpapers(category);

  const related = wallpapers
    .filter((item: any) => item.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>🔥 Similar Wallpapers</h2>

        <p>
          You may also like these wallpapers.
        </p>

        <div className={styles.grid}>
          {related.map((item: any) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}