"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Home" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Don't show nav on login page
  if (pathname === "/admin/login") return null;

  return (
    <nav className="border-b border-white/10 bg-cinema-900/50 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center gap-6 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-serif text-lg text-white">
            <span className="text-cinema-accent">SAI</span> VAIBHAV{" "}
            <span className="text-xs text-gray-500 ml-2 tracking-widest uppercase">Admin</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-xs tracking-widest uppercase">
            {links.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 transition-colors ${
                    isActive
                      ? "text-cinema-accent"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-gray-500 hover:text-cinema-accent tracking-widest uppercase"
          >
            View site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-red-400 tracking-widest uppercase"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/10 px-6 py-2 flex gap-1 overflow-x-auto text-xs tracking-widest uppercase">
        {links.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 whitespace-nowrap transition-colors ${
                isActive ? "text-cinema-accent" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
