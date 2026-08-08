import styles from "./Hero.module.css";
import SearchBar from "@/components/ui/SearchBar";

type Props = {
  wallpaperCount: number;
  categoryCount: number;
  totalDownloads: number;
};

export default function Hero({
  wallpaperCount,
  categoryCount,
  totalDownloads,
}: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.glowOne}></div>
      <div className={styles.glowTwo}></div>

      <div className={styles.content}>
        <div className={styles.badge}>
          Premium 4K • 8K • UHD Wallpapers
        </div>

        <h1 className={styles.title}>
          Discover <br />
          <span>Wallixa</span>
        </h1>

        <p className={styles.subtitle}>
          Download premium wallpapers for Desktop,
          Mobile, AMOLED and Ultrawide displays.
        </p>

        <div className={styles.search}>
          <SearchBar />
        </div>

        <div className={styles.stats}>
          <div>
            <h3>{wallpaperCount}+</h3>
            <span>Wallpapers</span>
          </div>

          <div>
            <h3>{categoryCount}</h3>
            <span>Categories</span>
          </div>

          <div>
            <h3>{totalDownloads}</h3>
            <span>Downloads</span>
          </div>
        </div>
      </div>

      <div className={styles.scroll}>
        ↓ Scroll
      </div>
    </section>
  );
}