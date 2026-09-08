import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary-admin";
import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
  writeBatch,
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

    const snapshot = await getDocs(
      collection(db, "wallpapers")
    );

    const existing = new Map<string, string>();

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();

      if (data.publicId) {
        existing.set(data.publicId, docSnap.id);
      }
    });

    let imported = 0;
    let skipped = 0;

    const operations: {
      type: "add" | "update";
      id?: string;
      data: any;
    }[] = [];

    for (const image of result.resources) {
      const folder =
        image.asset_folder?.split("/").pop() || "Others";

      const normalizedFolder = folder
        .trim()
        .toLowerCase();

      const category =
        folder.charAt(0).toUpperCase() +
        folder.slice(1).toLowerCase();

      const title = image.display_name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");

      const slug = createSlug(title);

      // ----------------------------------------
      // Desktop Picks detection
      // ----------------------------------------

      const isDesktopPick =
        normalizedFolder === "desktop picks";

      const desktopData = isDesktopPick
        ? {
            collection: "Desktop Picks",
            device: "Desktop",
          }
        : {};

      // ----------------------------------------
      // Update existing wallpaper
      // ----------------------------------------

      if (existing.has(image.public_id)) {
        const docId = existing.get(image.public_id)!;

        operations.push({
          type: "update",
          id: docId,
          data: {
            title,
            slug,
            category,
            image: image.secure_url,
            publicId: image.public_id,

            ...desktopData,
          },
        });

        skipped++;
      }

      // ----------------------------------------
      // Add new wallpaper
      // ----------------------------------------

      else {
        operations.push({
          type: "add",
          data: {
            title,
            slug,
            category,

            // Desktop Picks metadata
            ...desktopData,

            resolution: "8K",

            image: image.secure_url,
            publicId: image.public_id,

            tags: [],

            likes: 0,
            downloads: 0,

            featured: false,
            trending: false,

            createdAt: Date.now(),
          },
        });

        imported++;
      }
    }

    // Firestore batch limit is 500 operations.
    // Keep batches below that limit for safety.

    const BATCH_SIZE = 400;

    for (
      let i = 0;
      i < operations.length;
      i += BATCH_SIZE
    ) {
      const batch = writeBatch(db);

      const chunk = operations.slice(
        i,
        i + BATCH_SIZE
      );

      for (const operation of chunk) {
        if (operation.type === "update") {
          batch.update(
            doc(
              db,
              "wallpapers",
              operation.id!
            ),
            operation.data
          );
        } else {
          const newRef = doc(
            collection(db, "wallpapers")
          );

          batch.set(
            newRef,
            operation.data
          );
        }
      }

      await batch.commit();
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: result.resources.length,
    });
  } catch (error) {
    console.error(
      "Cloudinary import error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Import failed",
      },
      {
        status: 500,
      }
    );
  }
}