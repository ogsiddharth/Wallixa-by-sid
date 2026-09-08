"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/cloudinary";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cars");
  const [wallpaperCollection, setWallpaperCollection] = useState("None");
  const [device, setDevice] = useState("Both");
  const [resolution, setResolution] = useState("8K");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter title.");
      return;
    }

    try {
      setLoading(true);

      const image = await uploadImage(file);

      const slug = createSlug(title);

      await addDoc(collection(db, "wallpapers"), {
        title,
        category,
        collection: wallpaperCollection,
        device,
        resolution,

        image: image.secure_url,
        publicId: image.public_id,

        slug,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        likes: 0,
        downloads: 0,

        featured: false,
        trending: false,

        createdAt: Date.now(),
      });

      alert("Wallpaper Uploaded Successfully ✅");

      setTitle("");
      setCategory("Cars");
      setWallpaperCollection("None");
      setDevice("Both");
      setResolution("8K");
      setTags("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        color: "#fff",
      }}
    >
      <h1>Upload Wallpaper</h1>

      <br />

      <input
        type="text"
        placeholder="Wallpaper Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        value={device}
        onChange={(e) => setDevice(e.target.value)}
      >
        <option value="Both">Both</option>
        <option value="Mobile">Mobile</option>
        <option value="Desktop">Desktop</option>
      </select>

      <br />
      <br />
      <select
        value={wallpaperCollection}
        onChange={(e) => setWallpaperCollection(e.target.value)}
      >
        <option>None</option>
        <option>AMOLED</option>
        <option>DC</option>
        <option>Space</option>
        <option>Abstract</option>
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
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <br />
      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <br />
      <br />

      <button onClick={upload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Wallpaper"}
      </button>
    </div>
  );
}