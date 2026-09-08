import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import styles from "./CollectionsPage.module.css";

const collections = [
  {
    name: "AMOLED",
    href: "/collections/amoled",
  },
  {
    name: "DC",
    href: "/collections/dc",
  },
  {
    name: "Space",
    href: "/collections/space",
  },
  {
    name: "Abstract",
    href: "/collections/abstract",
  },
  {
    name: "Desktop Picks",
    href: "/desktop",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>Collections</h1>
            <p>Explore wallpapers by collection</p>
          </div>

          <div className={styles.grid}>
            {collections.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={styles.card}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}