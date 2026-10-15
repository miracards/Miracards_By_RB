import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const articleSlug = "how-to-choose-perfect-wedding-invitation-card";
const articleTitle = "How to Choose the Perfect Wedding Invitation Card for Your Big Day";
const articleDescription =
  "A wedding invitation introduces the couple, shares essential details, and reflects family traditions. Choose wedding invitation cards that balance design, readability, budget, and timing.";

export const metadata: Metadata = {
  title: articleTitle,
  description: articleDescription,
  keywords: [
    "wedding invitation cards",
    "wedding cards in Ahmedabad",
    "Gujarati wedding cards",
    "luxury wedding invitations",
    "custom wedding invitations",
    "wedding invitation design",
    "printed and digital wedding invitations",
    "wedding invitation budget",
    "wedding invitation wording",
  ],
  alternates: {
    canonical: `https://miracards.in/blog/${articleSlug}`,
  },
  openGraph: {
    type: "article",
    title: articleTitle,
    description: articleDescription,
    url: `https://miracards.in/blog/${articleSlug}`,
    siteName: "Mira Cards",
    locale: "en_IN",
    publishedTime: "2026-10-15T00:00:00.000Z",
    authors: ["Mira Cards"],
    images: [
      {
        url: "/featured-royal.png",
        alt: "Wedding invitation design by Mira Cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: articleTitle,
    description: articleDescription,
    images: ["/featured-royal.png"],
  },
};

export function generateStaticParams() {
  return [{ slug: articleSlug }];
}

const articleWidth = { maxWidth: "820px", margin: "0 auto" };
const sectionHeadingStyle = {
  color: "var(--text)",
  fontFamily: "var(--font-heading), Georgia, serif",
  fontSize: "25px",
  lineHeight: 1.3,
  margin: "2.5rem 0 0.75rem",
};
const paragraphStyle = {
  color: "var(--text-muted)",
  fontSize: "16px",
  lineHeight: 1.85,
  margin: "0 0 1.1rem",
};

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== articleSlug) {
    notFound();
  }

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        padding: "clamp(120px, 14vh, 160px) 24px 80px",
      }}
    >
      <div style={articleWidth}>
        <Link
          href="/blog"
          style={{
            color: "var(--blue)",
            display: "inline-block",
            fontSize: "14px",
            marginBottom: "36px",
            textDecorationColor: "var(--gold)",
            textUnderlineOffset: "4px",
          }}
        >
          Back to all articles
        </Link>

        <header style={{ marginBottom: "36px" }}>
          <p
            style={{
              color: "var(--gold)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              marginBottom: "14px",
              textTransform: "uppercase",
            }}
          >
            Wedding Planning <span aria-hidden="true">·</span> October 15, 2026
          </p>
          <h1
            style={{
              color: "var(--text)",
              fontFamily: "var(--font-heading), Georgia, serif",
              fontSize: "clamp(34px, 5vw, 54px)",
              lineHeight: 1.15,
              margin: "0 0 20px",
            }}
          >
            How to Choose the Perfect Wedding Invitation Card for Your Big Day
          </h1>
          <p style={{ ...paragraphStyle, fontSize: "18px", lineHeight: 1.7 }}>
            A wedding invitation introduces the couple, shares essential details, and reflects family traditions. Choose wedding invitation cards that balance design, readability, budget, and timing.
          </p>
        </header>

        <article>
          <section>
            <h2 style={sectionHeadingStyle}>1. Start with Your Wedding Theme</h2>
            <p style={paragraphStyle}>
              First, consider whether your wedding is traditional, modern, or a destination event. Your invitation can echo the colours, motifs, and overall style of the occasion. Floral patterns and soft shades may suit a daytime ceremony, while deep colours and metallic accents can complement an evening celebration.
            </p>
            <p style={paragraphStyle}>
              When comparing wedding cards in Ahmedabad, ask to see samples and compare paper, printing, and finishing. Wedding cards in Ahmedabad should suit your style and budget.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>2. Reflect Your Culture and Traditions</h2>
            <p style={paragraphStyle}>
              Many families want invitations that honour customs while still feeling personal. Gujarati wedding cards may include traditional wording, auspicious symbols, and cultural motifs. Gujarati wedding cards can honour tradition while reflecting the couple’s personality.
            </p>
            <p style={paragraphStyle}>
              Discuss the wording with family members before approving the design. Check the spelling of names, dates, venue information, and ceremony timings. If guests speak different languages, consider a bilingual invitation or a separate information insert.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>3. Choose Materials and Finishing Carefully</h2>
            <p style={paragraphStyle}>
              Paper quality and finishing influence how an invitation looks and feels. Options can include textured paper, foil accents, embossed details, laser-cut patterns, acrylic elements, or a keepsake box. Choose according to your theme, quantity, and budget.
            </p>
            <p style={paragraphStyle}>
              Luxury wedding invitations combine selected materials with thoughtful details; luxury wedding invitations need not include every embellishment. Choose one or two features that make the design special, then keep the layout uncluttered. Make sure the text remains readable and the invitation is practical to package and deliver.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>4. Consider Printed and Digital Options</h2>
            <p style={paragraphStyle}>
              Printed invitations are keepsakes guests can display or save. Digital invitations are convenient for sharing information quickly, especially when relatives live in different cities or countries. Some couples use printed cards for close family and digital versions for wider sharing.
            </p>
            <p style={paragraphStyle}>
              When comparing wedding invitation cards, consider your guest list and how each person prefers to receive information. Digital invitations can include maps, schedules, and RSVP details, while printed cards offer a keepsake. Keep details consistent across both formats when choosing wedding invitation cards.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>5. Set a Realistic Budget</h2>
            <p style={paragraphStyle}>
              Your budget should account for more than the cost per card. Consider the number of guests, inserts, envelopes, printing techniques, packaging, delivery, and possible last-minute changes. Ordering a sample, where available, can help you assess the paper and finish before confirming the full quantity.
            </p>
            <p style={paragraphStyle}>
              When comparing wedding cards in Ahmedabad, ask for a clear quotation listing materials, printing, customization, and delivery arrangements. Compare wedding cards in Ahmedabad by quality and service, not price alone. Confirm whether revisions or extra inserts will affect the final cost.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>6. Plan the Timeline in Advance</h2>
            <p style={paragraphStyle}>
              Customized artwork takes time, so prepare your guest list and event details early. Ask the provider for an estimated timeline and leave a buffer for proofreading, approval, printing, and delivery.
            </p>
            <p style={paragraphStyle}>
              For Gujarati wedding cards, review traditional wording and family names with people familiar with those details. Approve the final proof only after checking every line. A simple checklist helps ensure Gujarati wedding cards are accurate.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>7. Make the Invitation Personal</h2>
            <p style={paragraphStyle}>
              A thoughtful invitation should feel connected to the couple and the celebration. Consider a meaningful colour, family-inspired motif, monogram, or short welcome message. Personal touches make a card memorable without overcrowding it.
            </p>
            <p style={paragraphStyle}>
              Choose luxury wedding invitations for details that express your story, not just a trend. Ask how the colours, typography, and materials can work together. A consistent design across the main card, inserts, envelopes, and digital version creates a polished experience with luxury wedding invitations.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>8. Proofread Before Printing</h2>
            <p style={paragraphStyle}>
              Before final approval, check names, dates, venue addresses, contact details, and event timings. Ask another person to proofread the text, as a fresh reader may notice errors you missed. Confirm quantity, packaging, delivery address, and arrival date.
            </p>
            <p style={paragraphStyle}>
              Keep the approved proof and quotation for reference, especially for multi-piece invitation suites.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>Create an Invitation That Welcomes Every Guest</h2>
            <p style={paragraphStyle}>
              The best invitation combines clear information and thoughtful design. Whether you prefer a traditional look, a contemporary style, or a combination of both, careful planning will help you choose an invitation that feels right for your wedding.
            </p>
            <p style={paragraphStyle}>
              Mira Cards offers customized invitation options for couples looking to bring their ideas together. Explore the collections, discuss your requirements with the team, and request a personalized quote to begin planning an invitation that suits your celebration. The right wedding invitation cards can set a warm, memorable tone for the day.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}