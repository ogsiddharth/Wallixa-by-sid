import WallpaperCard from "@/components/cards/WallpaperCard";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import styles from "./CategoryPage.module.css";

import { getCategoryWallpapers } from "@/lib/firestore";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: Props) {
  const { category } = await params;

  // Get category from URL
 const categorySlug = decodeURIComponent(category);

const categoryName =
  categorySlug.charAt(0).toUpperCase() +
  categorySlug.slice(1).toLowerCase();

console.log("Category:", categoryName);

const wallpapers =
  await getCategoryWallpapers(categoryName);

console.log("Total Wallpapers:", wallpapers.length);

  console.log("Total Wallpapers:", wallpapers.length);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>
              {categoryName.charAt(0).toUpperCase() +
                categoryName.slice(1)}{" "}
              Wallpapers
            </h1>

            <p>{wallpapers.length} Premium Wallpapers</p>
          </div>

          <div className={styles.grid}>
            {wallpapers.map((item: any) => (
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
      </main>

      <SiteFooter />
    </>
  );
}