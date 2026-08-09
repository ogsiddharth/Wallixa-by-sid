"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Login page should remain accessible
    if (pathname === "/studio-x9k21/login") {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/studio-x9k21/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return <>{children}</>;
}