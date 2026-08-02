import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import Trending from "@/components/sections/Trending";
import CategorySection from "@/components/sections/CategorySection";
import SiteFooter from "@/components/layout/SiteFooter";
import LatestSection from "@/components/sections/LatestSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Trending />
<LatestSection />
        <CategorySection
          title="🚗 Cars Collection"
          category="Cars"
        />

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
      </main>

      <SiteFooter />
    </>
  );
}