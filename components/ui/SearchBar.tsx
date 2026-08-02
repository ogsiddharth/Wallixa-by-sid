"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const value = query.trim();

    if (!value) return;

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="relative w-full">

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search 4K, 8K Wallpapers..."
        style={{
          paddingLeft: "32px",
          paddingRight: "92px",
        }}
        className="
          w-full
          h-16
          rounded-full
          border border-white/15
          bg-white/10
          text-white
          text-lg
          font-medium
          placeholder:text-gray-400
          backdrop-blur-xl
          outline-none
          appearance-none
          transition-all
          duration-300
          focus:border-cyan-400
        "
      />

      <button
        onClick={handleSearch}
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-cyan-500
          text-white
          transition
          hover:bg-cyan-400
        "
      >
        <Search size={20} strokeWidth={2.5} />
      </button>

    </div>
  );
}