import type { Metadata } from "next";
import Link from "next/link";
import config from "../../../portfolio.config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${config.personal.name}'s portfolio site.`,
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-cinema-950 text-gray-300">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="text-xs text-cinema-accent tracking-widest uppercase hover:text-white transition-colors"
        >
          &larr; Back to Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-white mt-8 mb-4">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>

        <div className="space-y-10 text-base leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website (the &ldquo;Site&rdquo;), you accept and agree to be bound
              by these Terms and Conditions. If you do not agree with any part of these terms, please do not
              use the Site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-white mb-4">2. Intellectual Property</h2>
            <p>
              All content on this Site — including but not limited to videos, photographs, graphics, text, logos,
              and design elements — is the property of {config.personal.name} or has been used with the permission of the
              respective rights holders. This content is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-white mb-4">3. Portfolio Content</h2>
            <p>
              The projects showcased on this Site are samples of professional work. Some projects may have been
              produced for clients and are displayed with their permission. The inclusion of any brand name,
              logo, or trademark in portfolio content does not imply endorsement by those brands.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-white mb-4">4. Disclaimer</h2>
            <p>
              The Site and its content are provided &ldquo;as is&rdquo; without warranties of any kind, either express or
              implied. {config.personal.name} does not warrant that the Site will be uninterrupted, error-free, or free
              of harmful components.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-white mb-4">5. Contact</h2>
            <p>
              For questions about these Terms, contact us at:{" "}
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
