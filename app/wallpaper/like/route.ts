import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const ref = doc(db, "wallpapers", id);

    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return NextResponse.json(
        { success: false },
        { status: 404 }
      );
    }

    const currentLikes = snap.data().likes || 0;

    await updateDoc(ref, {
      likes: currentLikes + 1,
    });

    return NextResponse.json({
      success: true,
      likes: currentLikes + 1,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}