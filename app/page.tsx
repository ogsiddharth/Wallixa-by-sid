import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Trending from "@/components/sections/Trending";
import CategorySection from "@/components/sections/CategorySection";
import LatestSection from "@/components/sections/LatestSection";
import SiteFooter from "@/components/layout/SiteFooter";
import Featured from "@/components/sections/Featured";

import { getWebsiteStats } from "@/lib/firestore";

export default async function Home() {
  const stats = await getWebsiteStats();

  return (
    <>
      <Navbar />

      <main>
        <Hero
  wallpaperCount={stats.wallpaperCount}
  categoryCount={stats.categoryCount}
  totalDownloads={stats.totalDownloads}
/>

<Featured />

<Trending />

        <CategorySection
          title="🎌 Anime Collection"
          category="Anime"
        />

        <CategorySection
          title="🦸 Marvel Collection"
          category="Marvel"
        />

        <CategorySection
          title="🌿 Nature Collection"
          category="Nature"
        />

        <LatestSection />
      </main>

      <SiteFooter />
    </>
  );
}