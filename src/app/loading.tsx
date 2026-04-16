export default function Loading() {
  return (
    <div className="min-h-screen bg-cinema-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cinema-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}
