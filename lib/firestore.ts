import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export async function getTrendingWallpapers() {
  const q = query(
    collection(db, "wallpapers"),
    orderBy("downloads", "desc"),
    limit(8)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}


export async function getCategoryWallpapers(category: string) {
  const q = query(
    collection(db, "wallpapers"),
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getWallpaperBySlug(slug: string) {
  const q = query(
    collection(db, "wallpapers"),
    where("slug", "==", slug),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}
export async function getLatestWallpapers() {
  const q = query(
    collection(db, "wallpapers"),
    orderBy("createdAt", "desc"),
    limit(8)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getWebsiteStats() {
  const snapshot = await getDocs(collection(db, "wallpapers"));

  const wallpapers = snapshot.docs.map((doc) => doc.data());

  const wallpaperCount = wallpapers.length;

  const categoryCount = new Set(
    wallpapers.map((item: any) => item.category)
  ).size;

  const totalDownloads = wallpapers.reduce(
    (sum: number, item: any) =>
      sum + (item.downloads || 0),
    0
  );

  return {
    wallpaperCount,
    categoryCount,
    totalDownloads,
  };
}
export async function getFeaturedWallpapers() {
  const q = query(
    collection(db, "wallpapers"),
    where("featured", "==", true),
    limit(8)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}


export async function getAllWallpapersForSitemap() {
  const snapshot = await getDocs(
    collection(db, "wallpapers")
  );

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();

      return {
        slug: data.slug as string,
        createdAt: data.createdAt,
      };
    })
    .filter((item) => item.slug);
}


export async function getCollectionWallpapers(collectionName: string) {
  const collectionQuery = query(
    collection(db, "wallpapers"),
    where("collection", "==", collectionName)
  );

  const categoryNames: Record<string, string> = {
  AMOLED: "Amoled",
  DC: "Dc",
  Space: "Space",
  Abstract: "Abstract",
};

const categoryName =
  categoryNames[collectionName] || collectionName;

  const categoryQuery = query(
    collection(db, "wallpapers"),
    where("category", "==", categoryName)
  );

  const [collectionSnapshot, categorySnapshot] = await Promise.all([
    getDocs(collectionQuery),
    getDocs(categoryQuery),
  ]);

  const wallpapers = new Map();

  collectionSnapshot.docs.forEach((doc) => {
    wallpapers.set(doc.id, {
      id: doc.id,
      ...doc.data(),
    });
  });

  categorySnapshot.docs.forEach((doc) => {
    wallpapers.set(doc.id, {
      id: doc.id,
      ...doc.data(),
    });
  });

  return Array.from(wallpapers.values());
}




export async function getDesktopWallpapers() {
  const q = query(
    collection(db, "wallpapers"),
    where("device", "==", "Desktop"),
    limit(8)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}