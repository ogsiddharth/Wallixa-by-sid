"use client";

import styles from "./DownloadModal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
};

export default function DownloadModal({
  open,
  onClose,
  onDownload,
}: Props) {
  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.icon}>
          ❤️
        </div>

        <h2>Support Wallixa</h2>

        <p>
          Follow Wallixa for new Premium 4K, 8K and
          AMOLED wallpapers. It only takes a second.
        </p>

        <div className={styles.socials}>
          <a
            href="https://www.instagram.com/mastersid?igsh=N3N5YmM2cWNwc2s="
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
          >
            📸
            <span>Follow Instagram</span>
          </a>

          <a
            href="https://t.me/masterSidforWallpaper"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegram}
          >
            ✈️
            <span>Join Telegram</span>
          </a>

          <a
            href="https://www.threads.com/@_siiddharth.15"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.threads}
            // onClick={(e) => e.preventDefault()}
          >
            𝕏
            <span>Follow on Threads</span>
          </a>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.skip}
            onClick={onClose}
          >
            Maybe Later
          </button>

          <button
            className={styles.download}
            onClick={onDownload}
          >
            Continue Download
          </button>
        </div>

        <small className={styles.note}>
          Thanks for supporting Wallixa ❤️
        </small>
      </div>
    </div>
  );
}