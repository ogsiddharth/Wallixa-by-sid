import Link from "next/link";
import WallpaperCard from "@/components/cards/WallpaperCard";
import { wallpapers } from "@/data/wallpapers";
import styles from "./CategorySection.module.css";

type Props = {
  title: string;
  category: string;
};

export default function CategorySection({
  title,
  category,
}: Props) {
  const filtered = wallpapers
    .filter((item) => item.category === category)
    .slice(0, 4);

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
          {filtered.map((item) => (
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