import Link from "next/link";
import styles from "./page.module.css";
import { getDashboardStats } from "@/lib/dashboard";
import LogoutButton from "./LogoutButton";

export default async function StudioPage() {
  const stats = await getDashboardStats();

  return (
    <main className={styles.page}>
      {/* <LogoutButton /> */}
      <div className={styles.container}>
       <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  <div>
    <h1>Wallixa Studio</h1>
    <p>Manage your wallpapers from one place.</p>
  </div>

  <LogoutButton />
</div>

        <div className={styles.grid}>
          <Link
            href="/studio-x9k21/upload"
            className={styles.card}
          >
            <h2>📤 Upload Wallpaper</h2>
            <p>Add new wallpapers manually</p>
          </Link>

          <Link
            href="/studio-x9k21/wallpapers"
            className={styles.card}
          >
            <h2>🖼 Manage Wallpapers</h2>
            <p>Edit or Delete wallpapers</p>
          </Link>

          <Link
            href="/studio-x9k21/cloudinary-sync"
            className={styles.card}
          >
            <h2>☁ Sync Cloudinary</h2>
            <p>Import wallpapers from Cloudinary</p>
          </Link>

          <Link
            href="/studio-x9k21/insights"
            className={styles.card}
          >
            <h2>📊 Search Insights</h2>
            <p>See what users are searching</p>
          </Link>

          <div className={styles.card}>
            <h2>🖼 Wallpapers</h2>
            <h3>{stats.wallpapers}</h3>
          </div>

          <div className={styles.card}>
            <h2>❤️ Total Likes</h2>
            <h3>{stats.totalLikes}</h3>
          </div>

          <div className={styles.card}>
            <h2>⬇ Downloads</h2>
            <h3>{stats.totalDownloads}</h3>
          </div>

          <div className={styles.card}>
            <h2>⭐ Featured</h2>
            <h3>{stats.featured}</h3>
          </div>

          <div className={styles.card}>
            <h2>🔥 Trending</h2>
            <h3>{stats.trending}</h3>
          </div>
        </div>
      </div>
    </main>
  );
}