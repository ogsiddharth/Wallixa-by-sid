export const dynamic = "force-dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Trending from "@/components/sections/Trending";
import CategorySection from "@/components/sections/CategorySection";
import LatestSection from "@/components/sections/LatestSection";
import SiteFooter from "@/components/layout/SiteFooter";
import Featured from "@/components/sections/Featured";
import DesktopPicks from "@/components/sections/DesktopPicks";


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

        <LatestSection />
        <Trending />
        <DesktopPicks />
        <CategorySection
          title="Anime Collection"
          category="Anime"
        />

        <CategorySection
          title="Cars Collection"
          category="Cars"
        />

        <CategorySection
          title="Marvel Collection"
          category="Marvel"
        />

        <CategorySection
          title="Nature Collection"
          category="Nature"
        />

      </main>

      <SiteFooter />
    </>
  );
}