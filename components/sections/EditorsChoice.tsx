// import { wallpapers } from "@/data/wallpapers";
// import WallpaperCard from "@/components/cards/WallpaperCard";
// import styles from "./EditorsChoice.module.css";

// export default function EditorsChoice() {
//   const featured = wallpapers.slice(0, 6);

//   return (
//     <section className={styles.section}>
//       <div className={styles.container}>
//         <div className={styles.heading}>
//           <h2>⭐ Editor's Choice</h2>
//           <p>Handpicked premium wallpapers.</p>
//         </div>

//         <div className={styles.grid}>
//           {featured.map((item) => (
//             <WallpaperCard
//               key={item.id}
//               image={item.image}
//               title={item.title}
//               category={item.category}
//               resolution={item.resolution}
//               slug={item.slug}
//               showActions={false}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }