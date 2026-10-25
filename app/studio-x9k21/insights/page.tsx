export const dynamic = "force-dynamic";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

export default async function InsightsPage() {
  const snapshot = await getDocs(
    query(
      collection(db, "searchAnalytics"),
      orderBy("createdAt", "desc")
    )
  );

  const searches = snapshot.docs.map((doc) => doc.data()) as any[];

  const counts: Record<string, number> = {};

  searches.forEach((item) => {
    const key = item.keyword?.trim();

    if (!key) return;

    counts[key] = (counts[key] || 0) + 1;
  });

  const result = Object.entries(counts)
    .sort((a, b) => b[1] - a[1]);

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        color: "#fff",
      }}
    >
      <h1>Search Analytics</h1>

      <br />

      {result.length === 0 ? (
        <p>No searches yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: 12,
                }}
              >
                Keyword
              </th>

              <th
                style={{
                  textAlign: "left",
                  padding: 12,
                }}
              >
                Total Searches
              </th>
            </tr>
          </thead>

          <tbody>
            {result.map(([keyword, total]) => (
              <tr key={keyword}>
                <td
                  style={{
                    padding: 12,
                  }}
                >
                  {keyword}
                </td>

                <td
                  style={{
                    padding: 12,
                  }}
                >
                  {total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}