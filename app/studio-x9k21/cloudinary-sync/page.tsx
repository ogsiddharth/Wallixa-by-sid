"use client";

import { useState } from "react";

export default function CloudinarySyncPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function syncWallpapers() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/cloudinary/import");

      const data = await res.json();

      if (data.success) {
        setMessage(
          `✅ Imported ${data.imported} wallpapers | Updated ${data.skipped}`
        );
      } else {
        setMessage("❌ Import Failed");
      }
    } catch (e) {
      setMessage("❌ Something went wrong");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "80px auto",
        color: "#fff",
      }}
    >
      <h1>Cloudinary Sync</h1>

      <br />

      <p>
        Import all wallpapers from Cloudinary into
        Firestore.
      </p>

      <br />

      <button
        onClick={syncWallpapers}
        disabled={loading}
        style={{
          padding: "14px 28px",
          cursor: "pointer",
          fontSize: 18,
        }}
      >
        {loading
          ? "Syncing..."
          : "☁ Sync Cloudinary"}
      </button>

      <br />
      <br />

      <h3>{message}</h3>
    </main>
  );
}