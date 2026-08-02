import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-xl font-black text-white shadow-lg shadow-cyan-500/30">
        W
      </div>

      <div>
        <h1 className="text-2xl font-black tracking-tight">
          Wallixa
        </h1>

        <p className="text-xs text-gray-400">
          Premium 4K Wallpapers
        </p>
      </div>

    </Link>
  );
}