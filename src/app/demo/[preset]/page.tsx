import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { DemoServices } from "./DemoServices";
import { DemoTheme } from "./DemoTheme";
import { demoPresets, presetKeys } from "@/lib/demo-content";
import type { PresetKey } from "@/lib/demo-content";

type Params = { preset: string };

export function generateStaticParams() {
  return presetKeys.map((preset) => ({ preset }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { preset } = await params;
  const demo = demoPresets[preset as PresetKey];
  if (!demo) return {};
  return {
    title: `${demo.label} Demo — Portfolio Speedrun`,
    description: `Live demo of the ${demo.label} preset. ${demo.description}`,
  };
}

export default async function DemoPage({ params }: { params: Promise<Params> }) {
  const { preset } = await params;
  const key = preset as PresetKey;
  const demo = demoPresets[key];

  if (!demo) notFound();

  const { config: presetConfig, content } = demo;
  const { settings, hero, projects, testimonials, filters } = content;
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <DemoTheme palette={presetConfig.theme.palette} fonts={presetConfig.theme.fonts}>
      <main id="main-content" className="selection:bg-cinema-accent selection:text-black">
        <Navigation settings={settings} />
        <Hero settings={settings} hero={hero} />
        <About settings={settings} />
        <DemoServices services={presetConfig.services} />
        <Portfolio projects={sortedProjects} filters={filters} />
        <Testimonials testimonials={testimonials} />
        <ContactCTA settings={settings} />
        <Footer settings={settings} />
      </main>
    </DemoTheme>
  );
}
