import Link from "next/link";
import WallpaperCard from "@/components/cards/WallpaperCard";
import styles from "./CategorySection.module.css";
import { getCategoryWallpapers } from "@/lib/firestore";

type Props = {
  title: string;
  category: string;
};

export default async function CategorySection({
  title,
  category,
}: Props) {
  const wallpapers = await getCategoryWallpapers(category);

  const filtered = wallpapers.slice(0, 4);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{title}</h2>

          <Link
            href={`/category/${category.toLowerCase()}`}
            className={styles.viewAll}
          >
            View All →
          </Link>
        </div>

        <div className={styles.grid}>
          {filtered.length > 0 ? (
            filtered.map((item: any) => (
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
              No wallpapers found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}