"use client";

import { ArrowLeft, ArrowRight } from "@/components/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Section from "@/components/Section";
import { cn } from "@/lib/utils";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
  theme?: "light" | "dark";
}

const cpgPlaceholderItems: Gallery4Item[] = [
  {
    id: "betancourt-lineup",
    title: "Betancourt Nutrition — Full Brand Family",
    description: "Multi-SKU brand system unifying 10+ products on shelf — consistent identity, compliant labeling, and production files across the full line.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%2028.png",
  },
  {
    id: "b-nox-tropical",
    title: "B-NOX Androrush — Energy Formula",
    description: "Complete label system for Betancourt Nutrition's flagship pre-workout — brand identity, compliance, and shelf-ready production files.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%206.png",
  },
  {
    id: "test-hp-reloaded",
    title: "TEST-HP Reloaded — Box & Label System",
    description: "Full packaging suite with matching box and bottle label. Die-line matched, Supplement Facts panel, and print-ready artwork delivered to printer specs.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%207.png",
  },
  {
    id: "swet-campaign",
    title: "S.W.E.T. Diuretic + Burn — Brand Campaign",
    description: "Packaging design and lifestyle campaign assets for Betancourt's diuretic formula — label, box, and marketing imagery for retail and digital.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%204.png",
  },
  {
    id: "electro-shock",
    title: "Electro Shock — Character Art Pre-Workout",
    description: "Bold character-illustration label design for a premium pre-workout — dramatic visual identity built to stand out on shelf and in digital channels.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%2031.png",
  },
  {
    id: "simply-aminos-lifestyle",
    title: "Simply Aminos — Label & Lifestyle",
    description: "Label design for Simply Nutrition's amino complex — clean architecture, complete workout claims, and lifestyle photography for Amazon and retail.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%2039.png",
  },
  {
    id: "athletes-cbd",
    title: "Athletes Only CBD — Tincture & Tube System",
    description: "Full packaging for a 2,000mg CBD line — matching tincture label and canister system with compliant claims and print-ready production files.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%203.png",
  },
  {
    id: "shield-labs-cla",
    title: "Shield Labs Daily CLA — Clean Label",
    description: "Premium supplement label with clean visual architecture — brand identity, compliant claims, and tub label delivered print-ready for co-packer handoff.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%2015.png",
  },
  {
    id: "365-pudding-suite",
    title: "365 Brand — Multi-Flavor SKU Suite",
    description: "Unified label system across 4 flavors for a keto-friendly line — consistent brand architecture with flavor differentiation and print-ready files.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%2038.png",
  },
  {
    id: "365-creamers",
    title: "365 Nutrition — Functional Food Pouches",
    description: "Pouch label design for a functional coffee creamer line — clean food packaging with nutritional compliance and retail-ready artwork.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%2037.png",
  },
  {
    id: "luxury-body-butter",
    title: "Luxury Body Butter — Premium Beauty",
    description: "Premium beauty label for a fragranced body butter — dark editorial packaging that commands shelf presence in specialty retail.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%2036.png",
  },
  {
    id: "breath-rox",
    title: "Breath Rox — Functional Wellness Vial",
    description: "Unique packaging for a zinc-powered breath crystal vial — distinctive form factor with compliant supplement labeling and retail-ready artwork.",
    href: "https://brandingzombiedesigns.com",
    image: "/assets/product-design/product%20design_%202.png",
  },
];

const Gallery4 = ({
  title = "From concept to shelf. Here's the proof.",
  description = "CPG and supplement packaging work — label systems, compliance, 3D renders, and print-ready production files.",
  items = cpgPlaceholderItems,
  theme = "dark",
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const dark = theme === "dark";

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <Section theme={dark ? "dark" : "light"} pad="spacious" bleed topRule bottomRule>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-10 flex flex-col items-start gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <span
              className={cn(
                "text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.2em]",
                dark ? "text-[var(--color-cyan-text)]" : "text-text-dim",
              )}
            >
              Selected work
            </span>
            <h2
              className={cn(
                "font-[family-name:var(--font-display)] text-[length:var(--text-h2)] leading-[1.1] tracking-tight",
                dark ? "text-[var(--color-dark-text-primary)]" : "text-text-primary",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "text-[length:var(--text-body)] leading-relaxed",
                dark
                  ? "text-[var(--color-dark-text-secondary)]"
                  : "text-text-secondary",
              )}
            >
              {description}
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className={cn(
                "disabled:pointer-events-auto",
                dark
                  ? "text-[var(--color-dark-text-primary)] hover:bg-[var(--color-elevated)]"
                  : "",
              )}
            >
              <ArrowLeft size={18} weight="bold" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className={cn(
                "disabled:pointer-events-auto",
                dark
                  ? "text-[var(--color-dark-text-primary)] hover:bg-[var(--color-elevated)]"
                  : "",
              )}
            >
              <ArrowRight size={18} weight="bold" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[400px]"
              >
                <a
                  href={item.href}
                  className="group block focus-visible:outline-none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={cn(
                      "group relative flex h-[26rem] max-w-full flex-col overflow-hidden border lg:h-[28rem]",
                      dark
                        ? "border-[var(--color-dark-border)] bg-[var(--color-surface)] group-hover:border-[var(--color-dark-border-strong)]"
                        : "border-[var(--color-hairline-strong)] bg-[var(--color-cloud)] group-hover:border-[var(--color-text-primary)]/30",
                    )}
                  >
                    {/* Image plate — object-contain so varied aspect
                        ratios (tall bottles, wide banners, square labels)
                        all sit center-stage on a consistent backdrop. */}
                    <div
                      className={cn(
                        "relative flex flex-1 items-center justify-center overflow-hidden",
                        dark
                          ? "bg-gradient-to-br from-[var(--color-grave)] via-[var(--color-surface)] to-[var(--color-elevated)]"
                          : "bg-gradient-to-br from-[var(--color-cloud)] via-[var(--color-fog)] to-[var(--color-mist)]",
                      )}
                    >
                      {/* Soft radial spotlight */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute inset-0",
                          dark
                            ? "bg-[radial-gradient(circle_at_50%_45%,rgba(191,255,0,0.06),transparent_60%)]"
                            : "bg-[radial-gradient(circle_at_50%_45%,rgba(124,184,124,0.12),transparent_60%)]",
                        )}
                      />
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 400px, 320px"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>

                    {/* Caption strip — separate from the image so we
                        never overlap critical packaging detail. */}
                    <div
                      className={cn(
                        "flex flex-col gap-1.5 border-t p-5 md:p-6",
                        dark
                          ? "border-[var(--color-dark-border)] bg-[var(--color-grave)]"
                          : "border-[var(--color-hairline-strong)] bg-[var(--color-cloud)]",
                      )}
                    >
                      <h3
                        className={cn(
                          "text-[length:var(--text-h4)] font-semibold leading-tight",
                          dark ? "text-[var(--color-dark-text-primary)]" : "text-text-primary",
                        )}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={cn(
                          "line-clamp-2 text-[length:var(--text-secondary)] leading-snug",
                          dark ? "text-[var(--color-dark-text-secondary)]" : "text-text-secondary",
                        )}
                      >
                        {item.description}
                      </p>
                      <span
                        className={cn(
                          "mt-2 inline-flex items-center gap-1.5 text-[length:var(--text-caption)] font-semibold uppercase tracking-[0.18em]",
                          dark ? "text-[var(--color-toxic-text)]" : "text-[var(--color-neon-text)]",
                        )}
                      >
                        View project
                        <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/* Pagination dots — wrapped in 44px tap targets per WCAG /
            mobile-design touch-target guidelines. */}
        <div className="mt-8 flex justify-center gap-1">
          {items.map((_, index) => (
            <button
              key={index}
              className="group flex h-11 w-11 items-center justify-center"
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index}
            >
              <span
                aria-hidden
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  currentSlide === index
                    ? dark
                      ? "w-7 bg-[var(--color-toxic)]"
                      : "w-7 bg-[var(--color-neon-text)]"
                    : dark
                    ? "w-3 bg-[var(--color-dark-border-strong)] group-hover:bg-[var(--color-dark-text-dim)]"
                    : "w-3 bg-[var(--color-hairline-strong)] group-hover:bg-[var(--color-text-dim)]",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { Gallery4 };
