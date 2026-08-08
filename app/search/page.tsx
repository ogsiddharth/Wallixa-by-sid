import WallpaperCard from "@/components/cards/WallpaperCard";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: Props) {
  const { q = "" } = await searchParams;

  const keyword = q
    .toLowerCase()
    .trim()
    .replace(/[-\s]/g, "");

  // Save searched keyword
  if (keyword) {
    try {
      await addDoc(collection(db, "searchAnalytics"), {
        keyword,
        createdAt: Date.now(),
      });
    } catch (e) {
      console.log(e);
    }
  }

  const snapshot = await getDocs(
    query(
      collection(db, "wallpapers"),
      orderBy("createdAt", "desc")
    )
  );

  const wallpapers = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];

  const results = wallpapers.filter((item) => {
    const title = (item.title || "")
      .toLowerCase()
      .replace(/[-\s]/g, "");

    const category = (item.category || "")
      .toLowerCase()
      .replace(/[-\s]/g, "");

    const tags = (item.tags || []).map((tag: string) =>
      tag.toLowerCase().replace(/[-\s]/g, "")
    );

    return (
      title.includes(keyword) ||
      category.includes(keyword) ||
      tags.some((tag: string) => tag.includes(keyword))
    );
  });

  return (
    <main
      style={{
        background: "#080808",
        minHeight: "100vh",
        padding: "120px 0",
      }}
    >
      <div
        style={{
          width: "min(1400px,92%)",
          margin: "auto",
        }}
      >
        <h1
          style={{
            color: "#fff",
            marginBottom: "40px",
          }}
        >
          Search Results for "{q}"
        </h1>

        {results.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "24px",
            }}
          >
            {results.map((item: any) => (
              <WallpaperCard
                key={item.id}
                 id={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                resolution={item.resolution}
                slug={item.slug}
                showActions={false}
              />
            ))}
          </div>
        ) : (
          <p
            style={{
              color: "#888",
              fontSize: "20px",
              marginTop: "40px",
            }}
          >
            No wallpapers found.
          </p>
        )}
      </div>
    </main>
  );
}