import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function FavoritesPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "100vh",
          background: "#080808",
          color: "white",
          padding: "120px 0",
        }}
      >
        <div
          style={{
            width: "min(1400px,92%)",
            margin: "auto",
          }}
        >
          <h1 style={{ fontSize: "48px" }}>❤️ Favorites</h1>

          <p
            style={{
              color: "#888",
              marginTop: "20px",
            }}
          >
            Your saved wallpapers will appear here.
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}