const items = [
  "🚗 Cars",
  "🎌 Anime",
  "🦸 Marvel",
  "🌿 Nature",
  "🎮 Gaming",
  "📱 AMOLED",
];

export default function CategoryPills() {
  return (
    <div className="mt-12 flex flex-wrap justify-center gap-5">
      {items.map((item) => (
        <button
          key={item}
          className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-white backdrop-blur-xl transition hover:border-cyan-400 hover:bg-cyan-500/20"
        >
          {item}
        </button>
      ))}
    </div>
  );
}