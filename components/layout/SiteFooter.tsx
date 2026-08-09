import Link from "next/link";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Wallixa</h2>

          <p>
            Discover premium 4K, 8K, AMOLED and Desktop wallpapers
            crafted for every device.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Explore</h3>

          <Link href="/">Home</Link>
          <Link href="/trending">Trending</Link>
          <Link href="/latest">Latest</Link>
          <Link href="/categories">Categories</Link>
        </div>

        <div className={styles.column}>
          <h3>Company</h3>

          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.column}>
          <h3>Legal</h3>

          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <Link href="/terms">
            Terms & Conditions
          </Link>
        </div>

        <div className={styles.column}>
          <h3>Follow</h3>

          <a
            href="https://www.instagram.com/mastersid?igsh=N3N5YmM2cWNwc2s="
            target="_blank"
          >
            Instagram
          </a>

          <a
            href="https://t.me/masterSidforWallpaper"
            target="_blank"
          >
            Telegram
          </a>

          <a
            href="https://github.com/ogsiddharth"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        © 2026 Wallixa • Premium Wallpapers • All Rights Reserved.
      </div>
    </footer>
  );
}