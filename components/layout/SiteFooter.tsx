import styles from "./SiteFooter.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.left}>
          <h2>Wallixa</h2>
          <p>
            Premium 4K, 8K and AMOLED Wallpapers for every device.
          </p>
        </div>

        <div className={styles.links}>
          <a href="#">Home</a>
          <a href="#">Trending</a>
          <a href="#">Categories</a>
          <a href="#">Collections</a>
        </div>

        <div className={styles.social}>
          <a href="#">Instagram</a>
          <a href="#">GitHub</a>
          <a href="#">X</a>
        </div>

      </div>

      <div className={styles.bottom}>
        © 2026 Wallixa. All Rights Reserved.
      </div>
    </footer>
  );
}