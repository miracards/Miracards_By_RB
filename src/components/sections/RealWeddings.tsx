"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  { src: "/real-wedding-1.png", alt: "Cream and gold foil flatlay wedding card" },
  { src: "/real-wedding-2.png", alt: "Navy blue velvet box invitation set" },
  { src: "/real-wedding-3.png", alt: "Acrylic wedding card with gold text and leaves" },
  { src: "/real-wedding-4.png", alt: "Deep red laser cut invitation suite" },
];

export default function RealWeddings() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const swipeClickBlockTimeout = useRef<number | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((index) => (index + 1) % IMAGES.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      if (swipeClickBlockTimeout.current !== null) {
        window.clearTimeout(swipeClickBlockTimeout.current);
      }
    };
  }, []);

  const showPreviousImage = () => {
    setActiveImageIndex((index) => (index - 1 + IMAGES.length) % IMAGES.length);
  };

  const showNextImage = () => {
    setActiveImageIndex((index) => (index + 1) % IMAGES.length);
  };

  return (
    <section className="section" style={{ background: "var(--bg-card)", padding: "6rem 0" }}>
      <div className="container">
        <div className="real-weddings-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Text Title Card (1st Column) */}
          <div
            style={{
              background: "var(--blue)",
              borderRadius: "8px",
              padding: "2.5rem 2rem",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "360px",
            }}
          >
            <span
              className="text-label"
              style={{
                color: "var(--gold)",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              Real Weddings
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 300,
                lineHeight: 1.25,
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              Real Stories,
              <br />
              Real Celebrations
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.7)",
                marginBottom: "2rem",
              }}
            >
              See how our invitations became part of beautiful beginnings.
            </p>
            <Link
              href="/gallery"
              style={{
                fontFamily: "var(--font-alt)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--gold)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                transition: "opacity var(--transition-fast)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Explore Gallery <ArrowRight size={14} />
            </Link>
          </div>

          <div
            className="real-weddings-image-viewport"
            onTouchStart={(event) => {
              if (swipeClickBlockTimeout.current !== null) {
                window.clearTimeout(swipeClickBlockTimeout.current);
                swipeClickBlockTimeout.current = null;
              }
              didSwipe.current = false;
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;

              const swipeDistance = touchStartX.current - event.changedTouches[0].clientX;
              touchStartX.current = null;

              if (Math.abs(swipeDistance) < 40) return;
              didSwipe.current = true;
              swipeClickBlockTimeout.current = window.setTimeout(() => {
                didSwipe.current = false;
                swipeClickBlockTimeout.current = null;
              }, 500);
              if (swipeDistance > 0) showNextImage();
              else showPreviousImage();
            }}
          >
            <div
              id="real-weddings-image-track"
              className="real-weddings-image-track"
              style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
            >
              {IMAGES.map((img) => (
                <Link
                  key={img.src}
                  href="/gallery"
                  aria-label={`View ${img.alt} in the gallery`}
                  className="real-weddings-image-card group"
                  onClick={(event) => {
                    if (!didSwipe.current) return;
                    event.preventDefault();
                    didSwipe.current = false;
                    if (swipeClickBlockTimeout.current !== null) {
                      window.clearTimeout(swipeClickBlockTimeout.current);
                      swipeClickBlockTimeout.current = null;
                    }
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>

            <button
              type="button"
              className="real-weddings-carousel-arrow real-weddings-carousel-arrow--previous"
              onClick={showPreviousImage}
              aria-label="Show previous wedding image"
              aria-controls="real-weddings-image-track"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              type="button"
              className="real-weddings-carousel-arrow real-weddings-carousel-arrow--next"
              onClick={showNextImage}
              aria-label="Show next wedding image"
              aria-controls="real-weddings-image-track"
            >
              <ArrowRight size={20} />
            </button>

            <div className="real-weddings-carousel-dots" aria-label="Choose a wedding image">
              {IMAGES.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show wedding image ${index + 1}`}
                  aria-pressed={activeImageIndex === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
