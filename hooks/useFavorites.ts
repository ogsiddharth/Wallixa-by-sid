"use client";

import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");

    if (data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    let updated: string[];

    if (favorites.includes(slug)) {
      updated = favorites.filter((item) => item !== slug);
    } else {
      updated = [...favorites, slug];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return {
    favorites,
    toggleFavorite,
  };
}