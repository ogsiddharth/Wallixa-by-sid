import styles from "./Hero.module.css";
import SearchBar from "@/components/ui/SearchBar";

const categories = [
  "🚗 Cars",
  "🎌 Anime",
  "🦸 Marvel",
  "🌿 Nature",
  "🎮 Gaming",
  "📱 AMOLED",
];

export default function Hero() {
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

        <div className={styles.categories}>
          {categories.map((item) => (
            <button key={item}>{item}</button>
          ))}
        </div>

        <div className={styles.stats}>
          <div>
            <h3>25K+</h3>
            <span>Wallpapers</span>
          </div>

          <div>
            <h3>4K / 8K</h3>
            <span>Quality</span>
          </div>

          <div>
            <h3>100+</h3>
            <span>Categories</span>
          </div>
        </div>

      </div>

      <div className={styles.scroll}>
        ↓ Scroll
      </div>

    </section>
  );
}