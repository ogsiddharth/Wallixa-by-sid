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
    <div className={styles.backdrop}>
      <div className={styles.modal}>

        <h2>🎉 Support Wallixa</h2>

        <p>
          Follow us to get daily Premium 4K & 8K Wallpapers.
        </p>

        <div className={styles.socials}>

          <a
            href="https://www.instagram.com/mastersid/?__pwa=1"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.instagram}
          >
            📸 Follow on Instagram
          </a>

          <a
            href="https://t.me/masterSidforWallpaper"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegram}
          >
            📱 Join Telegram
          </a>

        </div>

        <div className={styles.actions}>

          <button
            className={styles.skip}
            onClick={onClose}
          >
            Skip
          </button>

          <button
            className={styles.download}
            onClick={onDownload}
          >
            Download Wallpaper
          </button>

        </div>

      </div>
    </div>
  );
}