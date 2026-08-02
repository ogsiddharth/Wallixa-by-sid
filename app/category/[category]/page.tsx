import { wallpapers } from "@/data/wallpapers";
import WallpaperCard from "@/components/cards/WallpaperCard";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import styles from "./CategoryPage.module.css";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const categoryName = decodeURIComponent(category);

  const results = wallpapers.filter(
    (item) =>
      item.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          <div className={styles.hero}>
            <h1>{categoryName} Wallpapers</h1>
            <p>{results.length} Premium Wallpapers</p>
          </div>

          <div className={styles.grid}>
            {results.map((item) => (
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
      </main>

      <SiteFooter />
    </>
  );
}