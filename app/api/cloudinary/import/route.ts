import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary-admin";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  writeBatch,
  doc,
  addDoc,
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

// ==========================================
// 1. POST Method: Handles Upload & Direct Publishing to Firestore
// ==========================================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ACTION A: Save published wallpaper metadata to Firestore
    if (body.action === "save") {
      const {
        title,
        category,
        wallpaperCollection,
        device,
        resolution,
        image,
        publicId,
        slug,
        tags,
      } = body;

      // Build object dynamically: omit 'collection' if it is "None"
      const wallpaperData: any = {
        title,
        category,
        device,
        resolution,
        image,
        publicId,
        slug,
        tags: Array.isArray(tags) ? tags : [],
        likes: 0,
        downloads: 0,
        featured: false,
        trending: false,
        createdAt: Date.now(),
      };

      if (wallpaperCollection && wallpaperCollection !== "None") {
        wallpaperData.collection = wallpaperCollection;
      }

      const docRef = await addDoc(collection(db, "wallpapers"), wallpaperData);

      return NextResponse.json({ success: true, id: docRef.id });
    }

    // ACTION B: Generate Cloudinary Upload Signature
    const { category = "Others", title = "" } = body;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = `wallixa/${category}`;

    const cleanName = title
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "_");

    const public_id = cleanName
      ? `${cleanName}_${timestamp}`
      : `wallpaper_${timestamp}`;

    const paramsToSign: Record<string, string | number> = {
      timestamp,
      folder,
      public_id,
    };

    const config = cloudinary.config();

    const apiSecret =
      process.env.CLOUDINARY_API_SECRET || (config.api_secret as string);

    const apiKey =
      process.env.CLOUDINARY_API_KEY || (config.api_key as string);

    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.CLOUDINARY_CLOUD_NAME ||
      (config.cloud_name as string);

    if (!apiSecret || !apiKey || !cloudName) {
      return NextResponse.json(
        { error: "Cloudinary credentials missing in environment" },
        { status: 500 }
      );
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      apiSecret
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      public_id,
      apiKey,
      cloudName,
    });
  } catch (error: any) {
    console.error("POST API error:", error);
    return NextResponse.json(
      { error: error?.message || "Operation failed" },
      { status: 500 }
    );
  }
}

// ==========================================
// 2. GET Method: Existing Cloudinary Sync (Restored & Working!)
// ==========================================
export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("asset_folder:wallixa/*")
      .max_results(500)
      .execute();

    const snapshot = await getDocs(collection(db, "wallpapers"));

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
      const folder = image.asset_folder?.split("/").pop() || "Others";
      const normalizedFolder = folder.trim().toLowerCase();

      const category =
        folder.charAt(0).toUpperCase() + folder.slice(1).toLowerCase();

      const title = image.display_name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");

      const slug = createSlug(title);

      const isDesktopPick = normalizedFolder === "desktop picks";

      const desktopData = isDesktopPick
        ? {
            collection: "Desktop Picks",
            device: "Desktop",
          }
        : {};

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
      } else {
        operations.push({
          type: "add",
          data: {
            title,
            slug,
            category,
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

    const BATCH_SIZE = 400;

    for (let i = 0; i < operations.length; i += BATCH_SIZE) {
      const batch = writeBatch(db);
      const chunk = operations.slice(i, i + BATCH_SIZE);

      for (const operation of chunk) {
        if (operation.type === "update") {
          batch.update(doc(db, "wallpapers", operation.id!), operation.data);
        } else {
          const newRef = doc(collection(db, "wallpapers"));
          batch.set(newRef, operation.data);
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
    console.error("Cloudinary import error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Import failed",
      },
      { status: 500 }
    );
  }
}