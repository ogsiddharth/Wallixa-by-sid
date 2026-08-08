"use client";

import { useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function FixSlugsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function fixSlugs() {
    try {
      setLoading(true);
      setMessage("");

      const snapshot = await getDocs(
        collection(db, "wallpapers")
      );

      let updated = 0;

      for (const item of snapshot.docs) {
        const data = item.data();

        if (data.slug) continue;

        const slug = createSlug(data.title || "");

        await updateDoc(doc(db, "wallpapers", item.id), {
          slug,
        });

        updated++;
      }

      setMessage(
        `✅ Finished! ${updated} wallpapers updated.`
      );
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update slugs.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "60px auto",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1>Fix Wallpaper Slugs</h1>

      <p>
        This tool adds missing slugs to all existing
        wallpapers.
      </p>

      <br />

      <button
        onClick={fixSlugs}
        disabled={loading}
        style={{
          padding: "14px 28px",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        {loading ? "Updating..." : "Fix All Slugs"}
      </button>

      <br />
      <br />

      <p>{message}</p>
    </main>
  );
}