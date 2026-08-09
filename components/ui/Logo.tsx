import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 no-underline"
      aria-label="Wallixa Home"
    >
     <Image
  src="/logo.png"
  alt="Wallixa"
  width={70}
  height={70}
  priority
/>

      <div className="leading-none">
        <h1 className="text-2xl font-black tracking-tight text-white">
          Wallixa
        </h1>

        <p className="mt-1 text-[10px] font-medium tracking-wide text-gray-400">
          PREMIUM WALLPAPERS
        </p>
      </div>
    </Link>
  );
}