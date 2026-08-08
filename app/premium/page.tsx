import Navbar from "@/components/layout/Navbar";
import SiteFooter from "@/components/layout/SiteFooter";
import { PREMIUM_ENABLED } from "@/lib/config";
import { premiumPlans } from "@/lib/premium";

export default function PremiumPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: 900,
          margin: "100px auto",
          padding: 20,
          color: "#fff",
        }}
      >
        <h1>Wallixa Premium</h1>

        <br />

        {!PREMIUM_ENABLED && (
          <div
            style={{
              padding: 20,
              borderRadius: 12,
              background: "#1f2937",
            }}
          >
            <h2>🚀 Coming Soon</h2>

            <p>
              Premium Membership will be available soon.
            </p>
          </div>
        )}

        <br />

        <div
          style={{
            display: "grid",
            gap: 20,
          }}
        >
          <div
            style={{
              padding: 20,
              border: "1px solid #333",
              borderRadius: 16,
            }}
          >
            <h2>{premiumPlans.monthly.title}</h2>

            <h1>₹{premiumPlans.monthly.price}/month</h1>

            <button disabled={!PREMIUM_ENABLED}>
              {PREMIUM_ENABLED
                ? "Subscribe"
                : "Coming Soon"}
            </button>
          </div>

          <div
            style={{
              padding: 20,
              border: "1px solid #333",
              borderRadius: 16,
            }}
          >
            <h2>{premiumPlans.pack.title}</h2>

            <h1>₹{premiumPlans.pack.price}</h1>

            <p>
              {premiumPlans.pack.wallpapers} Wallpapers
            </p>

            <button disabled={!PREMIUM_ENABLED}>
              {PREMIUM_ENABLED
                ? "Buy Pack"
                : "Coming Soon"}
            </button>
          </div>

          <div
            style={{
              padding: 20,
              border: "1px solid #333",
              borderRadius: 16,
            }}
          >
            <h2>{premiumPlans.lifetime.title}</h2>

            <h1>₹{premiumPlans.lifetime.price}</h1>

            <button disabled={!PREMIUM_ENABLED}>
              {PREMIUM_ENABLED
                ? "Buy Now"
                : "Coming Soon"}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}