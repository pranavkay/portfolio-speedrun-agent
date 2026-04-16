import type { Metadata } from "next";
import Link from "next/link";
import config from "../../../portfolio.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${config.personal.name}'s portfolio site.`,
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-cinema-950 text-gray-300">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="text-xs text-cinema-accent tracking-widest uppercase hover:text-white transition-colors"
        >
          &larr; Back to Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-white mt-8 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

        <div className="space-y-10 text-base leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-white mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy describes how {config.personal.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and
              protects information when you visit this website (the &ldquo;Site&rdquo;). By using the Site, you agree to
              the collection and use of information as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-lg text-white mt-6 mb-2">Analytics Data</h3>
            <p>
              {config.analytics.googleAnalyticsId
                ? "We use Google Analytics to understand how visitors interact with the Site. Google Analytics collects information such as your IP address (anonymised), browser type, operating system, referring URLs, pages viewed, and time spent on the Site."
                : "We do not currently collect any analytics data."}
            </p>

            <h3 className="text-lg text-white mt-6 mb-2">Contact Information</h3>
            <p>
              When you contact us through the links provided on the Site,
              any information you share is governed by the respective platform&apos;s privacy policy.
              We do not collect or store contact form submissions on this Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-white mb-4">3. Cookies</h2>
            <p>
              The Site uses minimal cookies:
            </p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              {config.analytics.googleAnalyticsId && (
                <li><strong>Google Analytics cookies</strong> — to measure site traffic and usage patterns.</li>
              )}
              <li><strong>Session cookies</strong> — used only for the administrative area and not set for regular visitors.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-white mb-4">4. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:{" "}
              <a href={`mailto:${config.contact.email}`} className="text-cinema-accent hover:text-white">
                {config.contact.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
