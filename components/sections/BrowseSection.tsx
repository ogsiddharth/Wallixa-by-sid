import Link from "next/link";
import styles from "./BrowseSection.module.css";

const categories = [
  { emoji: "🚗", title: "Cars" },
  { emoji: "🎌", title: "Anime" },
  { emoji: "🦸", title: "Marvel" },
  { emoji: "🌿", title: "Nature" },
  { emoji: "🎮", title: "Gaming" },
  { emoji: "🌌", title: "AMOLED" },
];

export default function BrowseSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h2>Browse Categories</h2>

        <div className={styles.grid}>
          {categories.map((item) => (
            <Link
              key={item.title}
              href={`/category/${item.title.toLowerCase()}`}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.card}>
                <div className={styles.icon}>{item.emoji}</div>
                <h3>{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}