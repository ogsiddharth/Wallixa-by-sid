"use client";

import { useState } from "react";
import DownloadModal from "./DownloadModal";

type Props = {
  image: string;
  filename: string;
  className?: string;
  children: React.ReactNode;
};

export default function DownloadButton({
  image,
  filename,
  className,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
    sessionStorage.setItem("wallixa-followed", "true");

    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }

    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const followed = sessionStorage.getItem("wallixa-followed");

    if (followed) {
      handleDownload();
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <button
        className={className}
        onClick={handleClick}
      >
        {children}
      </button>

      <DownloadModal
        open={open}
        onClose={() => setOpen(false)}
        onDownload={handleDownload}
      />
    </>
  );
}