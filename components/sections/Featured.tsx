// import styles from "./Featured.module.css";

// const wallpapers = [
//   {
    
//       image: "/wallpapers/bmw.jpg",
//     title: "Supercars",
//   },
//   {
//     title: "Marvel Universe",
//     image: "/wallpapers/spiderman.jpg",
//   },
//   {
//     title: "Anime World",
//     image: "/wallpapers/naruto.jpg",
//   },
// ];

// export default function Featured() {
//   return (
//     <section className={styles.section}>
//       <div className={styles.container}>

//         <div className={styles.heading}>
//           <h2>Featured wallpapers</h2>
//           <p>Discover curated wallpaper packs.</p>
//         </div>

//         <div className={styles.grid}>
//           {wallpapers.map((item) => (
//             <div
//               key={item.title}
//               className={styles.card}
//               style={{
//                 backgroundImage: `url(${item.image})`,
//               }}
//             >
//               <div className={styles.overlay}>
//                 <h3>{item.title}</h3>
//                 <button>View Collection</button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }
import WallpaperCard from "@/components/cards/WallpaperCard";
import { getFeaturedWallpapers } from "@/lib/firestore";

export default async function Featured() {
  const wallpapers = await getFeaturedWallpapers();

  if (wallpapers.length === 0) return null;

  return (
    <section className="section">
      <h2>⭐ Featured Wallpapers</h2>

      <div className="grid">
        {wallpapers.map((item: any) => (
          <WallpaperCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            category={item.category}
            resolution={item.resolution}
            slug={item.slug}
          />
        ))}
      </div>
    </section>
  );
}