"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

type Wallpaper = {
  id: string;
  title: string;
  image: string;
  category: string;
  resolution: string;
  likes: number;
  downloads: number;

  featured?: boolean;
  trending?: boolean;

  slug?: string;
};

export default function WallpapersPage() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWallpapers = async () => {
    try {
      const snapshot = await getDocs(
        query(
          collection(db, "wallpapers"),
          orderBy("createdAt", "desc")
        )
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Wallpaper, "id">),
      }));

      setWallpapers(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const deleteWallpaper = async (id: string) => {
    const ok = confirm("Delete this wallpaper?");

    if (!ok) return;

    try {
      await deleteDoc(doc(db, "wallpapers", id));

      setWallpapers((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("Deleted Successfully");
    } catch (err) {
      console.error(err);
      alert("Delete Failed");
    }
  };

  const toggleField = async (
  id: string,
  field: "featured" | "trending",
  value: boolean
) => {
  try {
    await updateDoc(doc(db, "wallpapers", id), {
      [field]: !value,
    });

    setWallpapers((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: !value,
            }
          : item
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  if (loading)
    return (
      <h2
        style={{
          color: "white",
          padding: 40,
        }}
      >
        Loading...
      </h2>
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "white",
        padding: 40,
      }}
    >
      <h1
        style={{
          marginBottom: 30,
        }}
      >
        Manage Wallpapers
      </h1>

      {wallpapers.length === 0 && (
        <p>No wallpapers uploaded.</p>
      )}

      <div
        style={{
          display: "grid",
          gap: 25,
        }}
      >
        {wallpapers.map((wallpaper) => (
          <div
            key={wallpaper.id}
            style={{
              display: "flex",
              gap: 20,
              background: "#181818",
              padding: 20,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <Image
              src={wallpaper.image}
              alt={wallpaper.title}
              width={150}
              height={90}
              style={{
                borderRadius: 12,
                objectFit: "cover",
              }}
            />

            <div
              style={{
                flex: 1,
              }}
            >
              <h2>{wallpaper.title}</h2>

              <p>{wallpaper.category}</p>

              <p>{wallpaper.resolution}</p>

              <p>
                ❤️ {wallpaper.likes} | ⬇{" "}
                {wallpaper.downloads}
              </p>
            </div>
              <Link
                href={`/studio-x9k21/wallpapers/edit/${wallpaper.id}`}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: "#2563eb",
                  color: "#fff",
                  textDecoration: "none",
                  marginRight: 12,
                }}
              >
                Edit
              </Link>
              <button
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  marginRight: 12,
                }}
                onClick={() =>
                  deleteWallpaper(wallpaper.id)
                }
              >
                Delete
              </button>
              <button
                onClick={() =>
                  toggleField(
                    wallpaper.id,
                    "featured",
                    wallpaper.featured ?? false
                  )
                }
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: wallpaper.featured
                    ? "#16a34a"
                    : "#444",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  marginRight: 12,
                }}
              >
                ⭐ {wallpaper.featured ? "Featured" : "Feature"}
              </button>

              <button
                onClick={() =>
                  toggleField(
                    wallpaper.id,
                    "trending",
                    wallpaper.trending ?? false
                  )
                }
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: wallpaper.trending
                    ? "#ea580c"
                    : "#444",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  marginRight: 12,
                }}
              >
                🔥 {wallpaper.trending ? "Trending" : "Trend"}
              </button>

              <Link
                href={`/wallpaper/${wallpaper.slug}`}
                target="_blank"
                style={{
                  display: "inline-block",
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: "#0f766e",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                👁 View
              </Link>
            </div>
          ))}
      </div>
    </main>
  );
}