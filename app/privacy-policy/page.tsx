import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function PrivacyPolicyPage() {
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
        <h1>Privacy Policy</h1>

        <br />

        <p>
          Wallixa respects your privacy. We do not sell or share
          your personal information with third parties.
        </p>

        <br />

        <h2>Information We Collect</h2>

        <ul>
          <li>Anonymous analytics</li>
          <li>Search queries</li>
          <li>Download statistics</li>
        </ul>

        <br />

        <h2>Cookies</h2>

        <p>
          Cookies may be used to improve your browsing
          experience.
        </p>

        <br />

        <h2>Contact</h2>

        <p>
          If you have any questions regarding this policy,
          contact us anytime.
        </p>
      </main>

      <SiteFooter />
    </>
  );
}