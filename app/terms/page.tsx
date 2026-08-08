import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: 900,
          margin: "100px auto",
          padding: "0 20px",
          color: "#fff",
          lineHeight: 1.8,
        }}
      >
        <h1>Terms & Conditions</h1>

        <br />

        <p>
          By using Wallixa you agree to these terms.
        </p>

        <br />

        <h2>Downloads</h2>

        <p>
          Wallpapers are provided for personal use unless
          otherwise stated.
        </p>

        <br />

        <h2>Copyright</h2>

        <p>
          If you believe any content infringes your copyright,
          please contact us for prompt removal.
        </p>

        <br />

        <h2>Changes</h2>

        <p>
          We may update these terms at any time without prior
          notice.
        </p>
      </main>

      <SiteFooter />
    </>
  );
}