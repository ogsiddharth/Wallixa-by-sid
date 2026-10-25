"use client";

import { useState, useEffect } from "react";

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatTitleFromFilename(filename: string) {
  const withoutExt = filename.replace(/\.[^/.]+$/, "");
  const cleaned = withoutExt
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}

type QueueItem = {
  id: string;
  file: File;
  preview: string;
  title: string;
  category: string;
  wallpaperCollection: string;
  device: string;
  resolution: string;
  tags: string;
  status: "pending" | "uploading" | "done" | "error";
  errorMsg?: string;
};

const CATEGORIES = ["Cars", "Anime", "Marvel", "Nature", "Gaming", "Others"];
const COLLECTIONS = ["None", "AMOLED", "DC", "Space", "Abstract", "Desktop Picks"];
const DEVICES = ["Both", "Mobile", "Desktop"];
const RESOLUTIONS = ["8K", "4K", "FHD"];

export default function UploadPage() {
  const [defaultCategory, setDefaultCategory] = useState("Anime");
  const [defaultCollection, setDefaultCollection] = useState("None");
  const [defaultDevice, setDefaultDevice] = useState("Mobile");
  const [defaultResolution, setDefaultResolution] = useState("8K");
  const [defaultTags, setDefaultTags] = useState("");

  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isUploadingAll, setIsUploadingAll] = useState(false);

  useEffect(() => {
    return () => {
      queue.forEach((item) => URL.revokeObjectURL(item.preview));
    };
  }, [queue]);

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const newItems: QueueItem[] = selectedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      file,
      preview: URL.createObjectURL(file),
      title: formatTitleFromFilename(file.name),
      category: defaultCategory,
      wallpaperCollection: defaultCollection,
      device: defaultDevice,
      resolution: defaultResolution,
      tags: defaultTags,
      status: "pending",
    }));

    setQueue((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const updateItem = (id: string, field: keyof QueueItem, value: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const applyDefaultsToAllPending = () => {
    setQueue((prev) =>
      prev.map((item) =>
        item.status === "pending" || item.status === "error"
          ? {
              ...item,
              category: defaultCategory,
              wallpaperCollection: defaultCollection,
              device: defaultDevice,
              resolution: defaultResolution,
              tags: defaultTags || item.tags,
            }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setQueue((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearCompleted = () => {
    setQueue((prev) => {
      prev
        .filter((i) => i.status === "done")
        .forEach((i) => URL.revokeObjectURL(i.preview));
      return prev.filter((i) => i.status !== "done");
    });
  };

  // Upload to Cloudinary & Save via Secure Backend API (Bypasses browser permission errors)
  const uploadSingleItem = async (item: QueueItem): Promise<boolean> => {
    if (!item.title.trim()) {
      updateItem(item.id, "status", "error");
      updateItem(item.id, "errorMsg", "Title cannot be empty");
      return false;
    }

    try {
      setQueue((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, status: "uploading", errorMsg: undefined } : i
        )
      );

      // 1. Get Cloudinary signature from backend API
      const signRes = await fetch("/api/cloudinary/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: item.category, title: item.title }),
      });

      const signText = await signRes.text();
      let signData: any;
      try {
        signData = JSON.parse(signText);
      } catch {
        throw new Error(`Signature API Error: ${signText.slice(0, 80)}`);
      }

      if (!signRes.ok) {
        throw new Error(signData.error || "Failed to get upload signature");
      }

      // 2. Upload file directly from browser to Cloudinary
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);
      formData.append("public_id", signData.public_id);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudText = await cloudRes.text();
      let cloudData: any;
      try {
        cloudData = JSON.parse(cloudText);
      } catch {
        throw new Error(`Cloudinary Error: ${cloudText.slice(0, 80)}`);
      }

      if (!cloudRes.ok) {
        throw new Error(cloudData?.error?.message || "Direct Cloudinary upload failed");
      }

      // 3. Generate slug
      const slug = createSlug(item.title);

      // 4. Save via Secure Backend API (Bypasses browser permission errors entirely)
      const saveRes = await fetch("/api/cloudinary/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          title: item.title.trim(),
          category: item.category,
          wallpaperCollection: item.wallpaperCollection,
          device: item.device,
          resolution: item.resolution,
          image: cloudData.secure_url,
          publicId: cloudData.public_id,
          slug,
          tags: item.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      const saveData = await saveRes.json();
      if (!saveRes.ok) {
        throw new Error(saveData.error || "Failed to save wallpaper to database");
      }

      setQueue((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: "done" } : i))
      );
      return true;
    } catch (err) {
      console.error("Upload failed for", item.title, err);
      setQueue((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                status: "error",
                errorMsg: err instanceof Error ? err.message : "Upload failed",
              }
            : i
        )
      );
      return false;
    }
  };

  const uploadAll = async () => {
    const pendingItems = queue.filter(
      (i) => i.status === "pending" || i.status === "error"
    );

    if (pendingItems.length === 0) {
      alert("No pending wallpapers to upload!");
      return;
    }

    setIsUploadingAll(true);

    for (const item of pendingItems) {
      await uploadSingleItem(item);
    }

    setIsUploadingAll(false);
  };

  const pendingCount = queue.filter(
    (i) => i.status === "pending" || i.status === "error"
  ).length;
  const doneCount = queue.filter((i) => i.status === "done").length;

  return (
    <div
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "20px 16px 110px 16px",
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px 0" }}>
          Wallixa Studio · Bulk Publisher
        </h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>
          Select multiple wallpapers from your phone, edit titles, and publish directly.
        </p>
      </div>

      {/* Step 1: Global Defaults Bar */}
      <div
        style={{
          background: "#111318",
          border: "1px solid #262936",
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#9ca3af" }}>
            ⚙️ DEFAULT SETTINGS FOR BATCH
          </span>
          {queue.length > 0 && (
            <button
              type="button"
              onClick={applyDefaultsToAllPending}
              style={{
                background: "#1f2937",
                color: "#60a5fa",
                border: "1px solid #374151",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Apply to all below
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
          }}
        >
          <div>
            <label style={{ fontSize: 11, color: "#9ca3af", display: "block", marginBottom: 4 }}>
              Category
            </label>
            <select
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.target.value)}
              style={selectStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: 11, color: "#9ca3af", display: "block", marginBottom: 4 }}>
              Device
            </label>
            <select
              value={defaultDevice}
              onChange={(e) => setDefaultDevice(e.target.value)}
              style={selectStyle}
            >
              {DEVICES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: 11, color: "#9ca3af", display: "block", marginBottom: 4 }}>
              Collection
            </label>
            <select
              value={defaultCollection}
              onChange={(e) => setDefaultCollection(e.target.value)}
              style={selectStyle}
            >
              {COLLECTIONS.map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: 11, color: "#9ca3af", display: "block", marginBottom: 4 }}>
              Resolution
            </label>
            <select
              value={defaultResolution}
              onChange={(e) => setDefaultResolution(e.target.value)}
              style={selectStyle}
            >
              {RESOLUTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <input
            type="text"
            placeholder="Default tags (comma separated, optional)"
            value={defaultTags}
            onChange={(e) => setDefaultTags(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Step 2: Big Mobile-Friendly File Picker Button */}
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #181b24 0%, #12141c 100%)",
          border: "2px dashed #3b82f6",
          borderRadius: 16,
          padding: "28px 16px",
          cursor: "pointer",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 32, marginBottom: 8 }}>📱</span>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>
          Tap to Select Wallpapers
        </span>
        <span style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
          Select 5, 10, or more images at once from Gallery / Files
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelect}
          style={{ display: "none" }}
        />
      </label>

      {/* Queue Summary Header */}
      {queue.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            Selected ({queue.length}) ·{" "}
            <span style={{ color: "#10b981" }}>{doneCount} Published</span>
          </span>

          {doneCount > 0 && (
            <button
              type="button"
              onClick={clearCompleted}
              style={{
                background: "transparent",
                color: "#9ca3af",
                border: "none",
                fontSize: 13,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Clear Published
            </button>
          )}
        </div>
      )}

      {/* Step 3: Wallpaper Preview & Quick Edit Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {queue.map((item) => {
          const isDone = item.status === "done";
          const isUploading = item.status === "uploading";
          const isError = item.status === "error";

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 12,
                background: "#111318",
                border: `1px solid ${
                  isDone
                    ? "#059669"
                    : isError
                    ? "#dc2626"
                    : isUploading
                    ? "#3b82f6"
                    : "#262936"
                }`,
                borderRadius: 14,
                padding: 12,
                opacity: isDone ? 0.75 : 1,
              }}
            >
              {/* Thumbnail Preview */}
              <div
                style={{
                  width: 82,
                  height: 120,
                  flexShrink: 0,
                  borderRadius: 10,
                  overflow: "hidden",
                  background: "#000",
                  position: "relative",
                }}
              >
                <img
                  src={item.preview}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Editable Details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 6,
                      background: isDone
                        ? "#064e3b"
                        : isError
                        ? "#7f1d1d"
                        : isUploading
                        ? "#1e3a8a"
                        : "#1f2937",
                      color: isDone
                        ? "#34d399"
                        : isError
                        ? "#fca5a5"
                        : isUploading
                        ? "#93c5fd"
                        : "#9ca3af",
                    }}
                  >
                    {isDone
                      ? "✅ Published on Wallixa"
                      : isUploading
                      ? "☁️ Uploading..."
                      : isError
                      ? `❌ ${item.errorMsg || "Failed"}`
                      : "⏳ Ready"}
                  </span>

                  {!isUploading && (
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#6b7280",
                        fontSize: 16,
                        cursor: "pointer",
                        padding: "0 4px",
                      }}
                      title="Remove"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  value={item.title}
                  disabled={isDone || isUploading}
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  placeholder="Wallpaper Title"
                  style={{
                    ...inputStyle,
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                />

                {/* Quick Row: Category + Device + Collection */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 6,
                  }}
                >
                  <select
                    value={item.category}
                    disabled={isDone || isUploading}
                    onChange={(e) =>
                      updateItem(item.id, "category", e.target.value)
                    }
                    style={smallSelectStyle}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <select
                    value={item.device}
                    disabled={isDone || isUploading}
                    onChange={(e) =>
                      updateItem(item.id, "device", e.target.value)
                    }
                    style={smallSelectStyle}
                  >
                    {DEVICES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <select
                    value={item.wallpaperCollection}
                    disabled={isDone || isUploading}
                    onChange={(e) =>
                      updateItem(item.id, "wallpaperCollection", e.target.value)
                    }
                    style={smallSelectStyle}
                  >
                    {COLLECTIONS.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Auto Slug Preview */}
                <div
                  style={{
                    fontSize: 11,
                    color: "#6b7280",
                    marginTop: 6,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  slug: {createSlug(item.title || "untitled")}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 4: Sticky Bottom Publish Bar for Mobile */}
      {queue.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(10, 12, 16, 0.92)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid #262936",
            padding: "12px 16px",
            display: "flex",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <button
            type="button"
            onClick={uploadAll}
            disabled={isUploadingAll || pendingCount === 0}
            style={{
              width: "100%",
              maxWidth: 728,
              padding: "15px 24px",
              borderRadius: 12,
              border: "none",
              background:
                pendingCount === 0
                  ? "#059669"
                  : isUploadingAll
                  ? "#2563eb"
                  : "#3b82f6",
              color: "#fff",
              fontSize: 16,
              fontWeight: 700,
              cursor:
                isUploadingAll || pendingCount === 0 ? "default" : "pointer",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.35)",
            }}
          >
            {isUploadingAll
              ? `☁️ Uploading & Publishing... (${doneCount}/${queue.length})`
              : pendingCount === 0
              ? `🎉 All ${doneCount} Wallpapers Published!`
              : `🚀 Upload & Publish ${pendingCount} Wallpaper${
                  pendingCount > 1 ? "s" : ""
                }`}
          </button>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #262936",
  background: "#181b24",
  color: "#fff",
  fontSize: 14,
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 10px",
  borderRadius: 8,
  border: "1px solid #262936",
  background: "#181b24",
  color: "#fff",
  fontSize: 14,
  boxSizing: "border-box",
};

const smallSelectStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px 8px",
  borderRadius: 6,
  border: "1px solid #262936",
  background: "#181b24",
  color: "#d1d5db",
  fontSize: 12,
  boxSizing: "border-box",
};