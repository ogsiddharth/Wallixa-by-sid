import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b0b0b",
        color: "#fff",
        textAlign: "center",
        padding: 20,
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 120,
            margin: 0,
          }}
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p
          style={{
            color: "#9ca3af",
            marginTop: 15,
          }}
        >
          The page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 30,
            padding: "14px 28px",
            background: "#2563eb",
            borderRadius: 10,
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}