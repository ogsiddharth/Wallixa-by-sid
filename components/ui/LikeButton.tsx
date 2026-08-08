"use client";

import { useState } from "react";
import { increaseLike } from "@/lib/like";

type Props = {
  id: string;
};

export default function LikeButton({ id }: Props) {
  const [liked, setLiked] = useState(false);

  async function handleLike() {
    if (liked) return;

    try {
      await increaseLike(id);
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      style={{
        width: "100%",
        padding: "16px",
        border: "none",
        borderRadius: "12px",
        background: liked ? "#22c55e" : "#ef4444",
        color: "#fff",
        fontWeight: 700,
        cursor: liked ? "default" : "pointer",
      }}
    >
      {liked ? "❤️ Liked" : "🤍 Like Wallpaper"}
    </button>
  );
}