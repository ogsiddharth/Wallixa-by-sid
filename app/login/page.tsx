"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function login() {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      if (
        result.user.email === "mauryaji0115@gmail.com"
      ) {
        router.push("/studio-x9k21");
      } else {
        alert("Unauthorized");

        await auth.signOut();
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#090909",
        color: "#fff",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Wallixa Admin Login</h1>

        <br />

        <button
          onClick={login}
          style={{
            padding: "14px 28px",
            borderRadius: 12,
            cursor: "pointer",
          }}
        >
          Login with Google
        </button>
      </div>
    </main>
  );
}