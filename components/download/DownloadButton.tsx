"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import DownloadModal from "./DownloadModal";

type Props = {
  id?: string;
  image: string;
  filename: string;
  className?: string;
  children?: React.ReactNode;
};

export default function DownloadButton({
  id,
  image,
  filename,
  className,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
  try {
    // 1. Count download FIRST
    if (id) {
     await fetch("/wallpaper/like/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
    }

    // 2. Then create Cloudinary download URL
    const downloadUrl = image.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(filename)}/`
    );

    // 3. Start download AFTER API finishes
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Download failed:", err);
  }

  setOpen(false);
};

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Always show popup
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
      >
        {children ?? "Download"}
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <DownloadModal
            open={open}
            onClose={() => setOpen(false)}
            onDownload={handleDownload}
          />,
          document.body
        )}
    </>
  );
}