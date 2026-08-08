import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "800px",
          margin: "100px auto",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h1>Contact Us</h1>

        <br />

        <p>
          Have questions, suggestions or copyright concerns?
          We'd love to hear from you.
        </p>

        <br />

        <h3>Email</h3>

        <p>mauryaji0115@gmail.com</p>

        <br />

        <h3>Instagram</h3>

        <p>@mastersid</p>

        <br />

        <h3>Telegram</h3>

        <p>masterSid</p>
      </main>

      <SiteFooter />
    </>
  );
}