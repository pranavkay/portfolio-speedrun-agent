"use client";

import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }
      // Hard reload to remount the AdminLayout (and ContentProvider) with a fresh, authenticated state
      window.location.href = "/admin";
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cinema-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-white mb-2">Admin</h1>
          <p className="text-xs text-cinema-accent tracking-widest uppercase">
            Sai Vaibhav Cinematography
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cinema-900 border border-white/5 rounded-lg p-8 space-y-6"
        >
          <label className="block">
            <span className="block text-xs font-bold tracking-widest uppercase text-cinema-accent mb-2">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              className="w-full px-4 py-3 bg-cinema-950 border border-white/10 rounded text-white focus:outline-none focus:border-cinema-accent transition-colors"
            />
          </label>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full px-6 py-3 bg-cinema-accent text-black text-xs font-bold tracking-widest uppercase rounded hover:bg-white transition-colors disabled:bg-gray-700 disabled:text-gray-500"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="/" className="text-xs text-gray-500 hover:text-cinema-accent tracking-widest uppercase transition-colors">
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
