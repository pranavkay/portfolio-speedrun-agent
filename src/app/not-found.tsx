import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cinema-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-6xl md:text-8xl text-white mb-4">404</h1>
        <p className="text-gray-400 text-lg mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-cinema-accent text-black font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
