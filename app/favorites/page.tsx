"use client";

import { wallpapers } from "@/data/wallpapers";
import WallpaperCard from "@/components/cards/WallpaperCard";
import useFavorites from "@/hooks/useFavorites";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteWallpapers = wallpapers.filter((wallpaper) =>
    favorites.includes(wallpaper.slug)
  );

  return (
    <main
      style={{
        background: "#080808",
        minHeight: "100vh",
        padding: "120px 0",
      }}
    >
      <div
        style={{
          width: "min(1400px,92%)",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "48px",
            marginBottom: "40px",
            fontWeight: "800",
          }}
        >
          ❤️ My Favorites
        </h1>

        {favoriteWallpapers.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "120px 20px",
            }}
          >
            <h2
              style={{
                color: "#fff",
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
                fontWeight: "700",
              }}
            >
              Browse Wallpapers
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
              gap: "24px",
            }}
          >
            {favoriteWallpapers.map((item) => (
              <WallpaperCard
                key={item.id}
                id={item.id.toString()}
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