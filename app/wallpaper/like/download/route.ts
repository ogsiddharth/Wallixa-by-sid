import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    await updateDoc(doc(db, "wallpapers", id), {
      downloads: increment(1),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
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