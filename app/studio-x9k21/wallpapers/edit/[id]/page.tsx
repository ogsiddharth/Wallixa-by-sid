"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditWallpaperPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cars");
  const [resolution, setResolution] = useState("8K");
  const [tags, setTags] = useState("");

  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);

  useEffect(() => {
    async function loadWallpaper() {
      try {
        const ref = doc(db, "wallpapers", id as string);

        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert("Wallpaper not found.");
          router.push("/studio-x9k21/wallpapers");
          return;
        }

        const data: any = snap.data();

        setTitle(data.title || "");
        setCategory(data.category || "Cars");
        setResolution(data.resolution || "8K");
        setTags((data.tags || []).join(", "));
        setFeatured(data.featured || false);
        setTrending(data.trending || false);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    }

    loadWallpaper();
  }, [id, router]);

  async function saveWallpaper() {
    try {
      setSaving(true);

      await updateDoc(doc(db, "wallpapers", id as string), {
        title,
        category,
        resolution,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        featured,
        trending,
      });

      alert("Wallpaper Updated ✅");

      router.push("/studio-x9k21/wallpapers");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 50,
          color: "#fff",
          background: "#090909",
          minHeight: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "40px auto",
        color: "#fff",
      }}
    >
      <h1>Edit Wallpaper</h1>

      <br />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Wallpaper Title"
      />

      <br />
      <br />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Cars</option>
        <option>Anime</option>
        <option>Marvel</option>
        <option>Nature</option>
        <option>Gaming</option>
      </select>

      <br />
      <br />

      <select
        value={resolution}
        onChange={(e) => setResolution(e.target.value)}
      >
        <option>8K</option>
        <option>4K</option>
        <option>FHD</option>
      </select>

      <br />
      <br />

      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
      />

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />

        Featured
      </label>

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={trending}
          onChange={(e) => setTrending(e.target.checked)}
        />

        Trending
      </label>

      <br />
      <br />

      <button
        onClick={saveWallpaper}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </main>
  );
}