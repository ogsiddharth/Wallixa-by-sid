"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
};

const FavoritesContext =
  createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const isFavorite = (slug: string) => {
    return loaded && favorites.includes(slug);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavoritesContext must be used inside FavoritesProvider"
    );
  }

  return context;
}