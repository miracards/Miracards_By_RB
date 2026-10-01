"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface WelcomeCategory {
  _id: string;
  name: string;
  slug: string;
  coverImage?: string;
}

interface WelcomeDesign {
  subCategoryId?: string | { toString(): string } | null;
  s3Url: string;
}

interface WelcomeCollectionResponse {
  subCategories?: WelcomeCategory[];
  images?: WelcomeDesign[];
}

interface CategoryCard extends WelcomeCategory {
  image: string;
}

export default function CraftsmanshipSection() {
  const [categories, setCategories] = useState<CategoryCard[]>([]);

  useEffect(() => {
    let isCurrent = true;

    async function loadCategories() {
      try {
        const response = await fetch("/api/collections/welcome-boards");
        if (!response.ok) return;

        const data = (await response.json()) as WelcomeCollectionResponse;
        const designs = data.images ?? [];
        const categoryCards = (data.subCategories ?? []).flatMap((category) => {
          const firstDesign = designs.find(
            (design) =>
              String(design.subCategoryId ?? "") === category._id &&
              !design.s3Url.toLowerCase().endsWith(".mp4"),
          );
          const image = category.coverImage || firstDesign?.s3Url;

          return image ? [{ ...category, image }] : [];
        });

        if (isCurrent) setCategories(categoryCards);
      } catch (error) {
        console.error("Failed to load welcome categories:", error);
      }
    }

    loadCategories();
    return () => {
      isCurrent = false;
    };
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="welcome-category-section section" style={{ background: "var(--bg-card)", padding: "5rem 0" }}>
      <style>{`
        .welcome-category-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.25rem;
        }
        .welcome-category-link {
          flex: 0 1 calc(25% - 1rem);
          min-width: 220px;
          max-width: 300px;
          text-decoration: none;
        }
        .welcome-category-image img {
          transition: transform 450ms ease;
        }
        .welcome-category-link:hover .welcome-category-image img,
        .welcome-category-link:focus-visible .welcome-category-image img {
          transform: scale(1.045);
        }
        .welcome-category-label {
          transition: background-color 200ms ease, color 200ms ease;
        }
        .welcome-category-link:hover .welcome-category-label,
        .welcome-category-link:focus-visible .welcome-category-label {
          background: var(--gold) !important;
          color: #fff !important;
        }
        @media (max-width: 900px) {
          .welcome-category-link { flex-basis: calc(33.333% - 1rem); }
        }
        @media (max-width: 600px) {
          .welcome-category-section { padding: 3rem 0 !important; }
          .welcome-category-grid { gap: 0.75rem; }
          .welcome-category-link { flex-basis: calc(50% - 0.5rem); min-width: 0; }
          .welcome-category-label { font-size: 0.68rem !important; padding: 0.65rem 0.35rem !important; }
        }
      `}</style>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="section-label">Welcome &amp; Guest Arrival</span>
          <h2 className="text-section-heading" style={{ color: "var(--text)", marginTop: "0.5rem" }}>
            Thoughtful Details for Your Celebration
          </h2>
        </div>

        <div className="welcome-category-grid">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/collections/welcome-boards?subCategory=${encodeURIComponent(category.name)}`}
              className="welcome-category-link"
              aria-label={`Browse ${category.name}`}
            >
              <div
                className="welcome-category-image"
                style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "var(--bg-secondary)" }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
                <span
                  className="welcome-category-label"
                  style={{
                    position: "absolute",
                    left: "8%",
                    right: "8%",
                    bottom: "7%",
                    padding: "0.75rem 0.5rem",
                    background: "rgba(255,255,255,0.94)",
                    color: "#1c1c1c",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    textAlign: "center",
                    textTransform: "uppercase",
                  }}
                >
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
