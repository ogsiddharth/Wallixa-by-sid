import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary-admin";

import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("asset_folder:wallixa/*")
      .max_results(500)
      .execute();

  const snapshot = await getDocs(collection(db, "wallpapers"));

const existing = new Map();

snapshot.docs.forEach((docSnap) => {
  existing.set(docSnap.data().publicId, docSnap.id);
});

    let imported = 0;
    let skipped = 0;

    for (const image of result.resources) {
     const folder =
  image.asset_folder.split("/").pop() || "Others";

const category =
  folder.charAt(0).toUpperCase() +
  folder.slice(1).toLowerCase();

if (existing.has(image.public_id)) {
  const docId = existing.get(image.public_id);

  await updateDoc(doc(db, "wallpapers", docId), {
    title: image.display_name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " "),
    slug: createSlug(image.display_name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")),
    category,
    image: image.secure_url,
    publicId: image.public_id,
  });

  skipped++;

  continue;
}

      const title = image.display_name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");

await addDoc(collection(db, "wallpapers"), {
  title,

  slug: createSlug(title),

  category,

  resolution: "8K",

  image: image.secure_url,

  publicId: image.public_id,

  tags: [],

  likes: 0,

  downloads: 0,

  featured: false,

  trending: false,

  createdAt: Date.now(),
});

      imported++;
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}