"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/studio-x9k21/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 18px",
        borderRadius: "10px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: "#1f2937",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Logout
    </button>
  );
}