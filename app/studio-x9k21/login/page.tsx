"use client";

import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const email = result.user.email;

      if (email !== "mauryaji0115@gmail.com") {
        alert("Access Denied");

        await auth.signOut();

        return;
      }

      router.push("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0f172a",
      }}
    >
      <button
        onClick={login}
        style={{
          padding: "18px 34px",
          borderRadius: "14px",
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
    </main>
  );
}