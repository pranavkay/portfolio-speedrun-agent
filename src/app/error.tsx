"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cinema-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          We hit an unexpected error. Try refreshing, or head back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-cinema-accent text-black font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-8 py-3 border border-white/20 text-white font-bold tracking-widest uppercase text-sm hover:border-cinema-accent hover:text-cinema-accent transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
