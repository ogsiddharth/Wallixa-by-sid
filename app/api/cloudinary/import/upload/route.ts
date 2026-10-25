import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary-admin";

export async function POST(req: Request) {
  try {
    const { category = "Others", title = "" } = await req.json();

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = `wallixa/${category}`;

    // Clean filename for public_id
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
        { error: "Cloudinary credentials missing in .env.local" },
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
    console.error("Signature error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}