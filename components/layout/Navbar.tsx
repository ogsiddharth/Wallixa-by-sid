import Link from "next/link";
import Logo from "@/components/ui/Logo";
import styles from "./Navbar.module.css";

const items = [
  "Cars",
  "Anime",
  "Marvel",
  "Nature",
  "Gaming",
];

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.box}>

          <Logo />

          <nav className={styles.menu}>
            {items.map((item) => (
              <Link
                key={item}
                href={`/category/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            ))}

            <Link href="/collections">
              Collections
            </Link>

            <Link href="/favorites">
              ❤️ Favorites
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}