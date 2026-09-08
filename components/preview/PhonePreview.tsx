// import Image from "next/image";
// import styles from "./PhonePreview.module.css";

// type Props = {
//   image: string;
//   title: string;
// };

// export default function PhonePreview({
//   image,
//   title,
// }: Props) {
//   return (
//     <section className={styles.previewSection}>
//       <div className={styles.header}>
//         <h2>Phone Preview</h2>
//         <p>See how this wallpaper looks on a phone.</p>
//       </div>

//       <div className={styles.phone}>
//         <div className={styles.screen}>
//           <Image
//             src={image}
//             alt={`${title} phone preview`}
//             fill
//             className={styles.wallpaper}
//             sizes="300px"
//           />

//           <div className={styles.notch} />
//         </div>
//       </div>
//     </section>
//   );
// }