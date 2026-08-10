"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(15, 15, 15, 0.85)",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
        zIndex: 999,
        backdropFilter: "blur(10px)",
      }}
    >
      ↑
    </button>
  );
}