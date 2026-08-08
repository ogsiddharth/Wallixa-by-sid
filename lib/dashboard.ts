import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getDashboardStats() {
  const snapshot = await getDocs(collection(db, "wallpapers"));

  let totalLikes = 0;
  let totalDownloads = 0;
  let featured = 0;
  let trending = 0;

  snapshot.docs.forEach((doc) => {
    const data: any = doc.data();

    totalLikes += data.likes || 0;
    totalDownloads += data.downloads || 0;

    if (data.featured) featured++;
    if (data.trending) trending++;
  });

  return {
    wallpapers: snapshot.size,
    totalLikes,
    totalDownloads,
    featured,
    trending,
  };
}