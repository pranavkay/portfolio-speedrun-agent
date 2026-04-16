"use client";

import Link from "next/link";
import { useContent } from "@/components/admin/ContentProvider";
import { Card } from "@/components/admin/AdminUI";

export default function AdminDashboard() {
  const { content, loading, error } = useContent();

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error}</p>;
  if (!content) return null;

  const cards = [
    {
      href: "/admin/settings",
      title: "Site Settings",
      summary: `${content.settings.name} · ${content.settings.location}`,
    },
    {
      href: "/admin/hero",
      title: "Hero",
      summary: `${content.hero.images.length} background image${content.hero.images.length === 1 ? "" : "s"}`,
    },
    {
      href: "/admin/projects",
      title: "Projects",
      summary: `${content.projects.length} project${content.projects.length === 1 ? "" : "s"}`,
    },
    {
      href: "/admin/testimonials",
      title: "Testimonials",
      summary: `${content.testimonials.length} testimonial${content.testimonials.length === 1 ? "" : "s"}`,
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl text-white mb-2">Welcome back</h1>
      <p className="text-gray-400 mb-12">Edit any section below. Changes go live within a minute.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card className="hover:border-cinema-accent/30 transition-colors cursor-pointer">
              <h2 className="font-serif text-2xl text-white mb-2">{card.title}</h2>
              <p className="text-sm text-gray-500">{card.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
