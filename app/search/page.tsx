import { wallpapers } from "@/data/wallpapers";
import WallpaperCard from "@/components/cards/WallpaperCard";

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;

  const keyword = q.toLowerCase().replace(/[-\s]/g, "");

  const results = wallpapers.filter((item) => {
    const title = item.title
      .toLowerCase()
      .replace(/[-\s]/g, "");

    const category = item.category
      .toLowerCase()
      .replace(/[-\s]/g, "");

    const tags = (item.tags ?? []).map((tag) =>
      tag.toLowerCase().replace(/[-\s]/g, "")
    );

    return (
      title.includes(keyword) ||
      category.includes(keyword) ||
      tags.some((tag) => tag.includes(keyword))
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
            {results.map((item) => (
              <WallpaperCard
                key={item.id}
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