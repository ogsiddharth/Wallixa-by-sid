"use client";

import { increaseDownload } from "@/lib/download";
import styles from "./DownloadButton.module.css";

type Props = {
  id: string;
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
  children
}: Props) {
  async function handleDownload() {
    try {
      await increaseDownload(id);

      const link = document.createElement("a");
      link.href = image;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Download failed.");
    }
  }

  return (
    <button
      onClick={handleDownload}
      style={{
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "12px",
  background: "#00d4ff",
  color: "#000",
  fontWeight: 700,
  fontSize: "16px",
  cursor: "pointer",
}}
      className={className}
      >
      {children ?? "Download"}
    </button>
  );
}