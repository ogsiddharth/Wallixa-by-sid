"use client";

import { useEffect, useState } from "react";
import app from "@/lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (
        user &&
        user.email === "mauryaji0115@gmail.com"
      ) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          padding: 50,
        }}
      >
        Loading...
      </div>
    );
  }

  if (!allowed) {
    return (
      <div
        style={{
          color: "white",
          padding: 50,
        }}
      >
        <h1>Unauthorized</h1>
        <p>You don't have permission.</p>
      </div>
    );
  }

  return <>{children}</>;
}