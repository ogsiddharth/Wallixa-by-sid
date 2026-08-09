"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import WallpaperCard from "@/components/cards/WallpaperCard";
import useFavorites from "@/hooks/useFavorites";
import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

type Wallpaper = {
  id: string;
  image: string;
  title: string;
  category: string;
  resolution: string;
  slug: string;
};

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWallpapers() {
      try {
        const snapshot = await getDocs(
          collection(db, "wallpapers")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Wallpaper, "id">),
        }));

        setWallpapers(data);
      } catch (error) {
        console.error(
          "Failed to load favorite wallpapers:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWallpapers();
  }, []);

  const favoriteWallpapers = wallpapers.filter((wallpaper) =>
    favorites.includes(wallpaper.slug)
  );

  return (
    <main
      style={{
        background: "#080808",
        minHeight: "100vh",
        padding: "120px 0",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "min(1400px, 92%)",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "40px",
            fontWeight: 800,
          }}
        >
          ❤️ My Favorites
        </h1>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "100px 20px",
              color: "#888",
            }}
          >
            Loading favorites...
          </div>
        ) : favoriteWallpapers.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "120px 20px",
            }}
          >
            <h2
              style={{
                marginBottom: "16px",
              }}
            >
              No favorites yet
            </h2>

            <p
              style={{
                color: "#888",
                marginBottom: "30px",
              }}
            >
              Save wallpapers by clicking the ❤️ icon.
            </p>

            <Link
              href="/"
              style={{
                display: "inline-block",
                background: "#0ea5e9",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Browse Wallpapers
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {favoriteWallpapers.map((item) => (
              <WallpaperCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                resolution={item.resolution}
                slug={item.slug}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}