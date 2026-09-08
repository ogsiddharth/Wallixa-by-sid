// import Image from "next/image";
// import styles from "./DesktopPreview.module.css";

// type Props = {
//   image: string;
//   title: string;
// };

// export default function DesktopPreview({
//   image,
//   title,
// }: Props) {
//   return (
//     <section className={styles.previewSection}>
//       <div className={styles.header}>
//         <h2>Desktop Preview</h2>
//         <p>See how this wallpaper looks on a desktop screen.</p>
//       </div>

//       <div className={styles.desktop}>
//         <div className={styles.screen}>
//           <Image
//             src={image}
//             alt={`${title} desktop preview`}
//             fill
//             className={styles.wallpaper}
//             sizes="900px"
//           />
//         </div>

//         <div className={styles.stand} />

//         <div className={styles.base} />
//       </div>
//     </section>
//   );
// }