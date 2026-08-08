import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "900px",
          margin: "100px auto",
          color: "#fff",
          padding: "0 20px",
          lineHeight: 1.8,
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px",
          }}
        >
          About Wallixa
        </h1>

        <p>
          Wallixa is a premium wallpaper platform built for
          users who love high-quality 4K, 8K, AMOLED and
          Desktop wallpapers.
        </p>

        <br />

        <p>
          Our goal is to provide clean, high-resolution
          wallpapers across Cars, Anime, Nature, Gaming,
          Abstract, Superheroes and many more categories.
        </p>

        <br />

        <p>
          Every wallpaper is carefully selected to deliver
          the best quality for mobile, desktop and ultrawide
          displays.
        </p>

        <br />

        <h2>Why Wallixa?</h2>

        <ul>
          <li>✔ Premium Quality Wallpapers</li>
          <li>✔ Fast Downloads</li>
          <li>✔ 4K & 8K Resolution</li>
          <li>✔ Daily New Wallpapers</li>
          <li>✔ Clean & Modern Experience</li>
        </ul>
      </main>

      <SiteFooter />
    </>
  );
}