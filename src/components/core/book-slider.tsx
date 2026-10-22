"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";

/* ---------- responsive sizing ---------- */

const BASE_W = 370;
const BASE_H = 500;
const RATIO = BASE_H / BASE_W;

type BookLayout = {
  portrait: boolean; // single page (mobile) vs two-page spread
  pageW: number;
  pageH: number;
  scale: number; // used to scale text / images inside pages
};

function computeLayout(): BookLayout {
  const vw = window.innerWidth;
  const vh = document.documentElement.clientHeight;

  const portrait = vw < 768; // phones
  const isTablet = vw >= 768 && vw < 1024;

  // vertical space to leave for the "laying" image at the bottom
  const reservedY = vh < 500 ? 24 : portrait ? 190 : isTablet ? 200 : 120;

  const availH = vh - reservedY;
  const availW = vw - 32; // 16px side gutters

  const maxPageW = portrait ? 360 : isTablet ? 400 : BASE_W;

  const pageW = Math.floor(
    Math.max(
      140,
      Math.min(
        portrait ? availW : availW / 2, // spread needs two pages across
        maxPageW,
        availH / RATIO, // keep the book inside the viewport height
      ),
    ),
  );

  const pageH = Math.floor(pageW * RATIO);

  return { portrait, pageW, pageH, scale: pageW / BASE_W };
}

function useBookLayout() {
  const [layout, setLayout] = useState<BookLayout | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const update = () => {
      const next = computeLayout();
      setLayout((prev) =>
        prev &&
          prev.portrait === next.portrait &&
          prev.pageW === next.pageW &&
          prev.pageH === next.pageH
          ? prev
          : next,
      );
    };

    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(update, 150);
    };

    update();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return layout;
}

/* ---------- content ---------- */

const pages = [
  {
    id: "006",
    image: `/sitting.svg`,
    title: "The Prologue",
    description: `To be specific I came from an engineers family, i was inspired about physics and astronomy since childhood. Sorting out my basics and learning the fundamentals until my SSC. but at the edge of 2019, I was able to discover the magic of programming. Soon after I realized okay, This is who I want to become. And The world itself gave me freedom for it afterwards. how? Remember the epidemic of Covid? which rushed in at late 2019, and i was able to spend 6 months straight to learn Javascript, explored Go, Python and many more. With that much in my hand i chose to go and study Computer Science. right before becoming an Undergraduate, I got opportunity to start my career as a Software Engineer.`,
  },
  {
    id: "025",
    image: `/reading.svg`,
    title: "Beginning of my Journey",
    description: (
      <>
        With already 4 years of self thought programming, I gained signifant
        understanding over the concepts and the possibilities in my hand, but i
        was lacking professional experience. <br />
        In February of 2026, I was selected for an internship program in
        Business Automation Ltd. Where i was able to get a deep understanding of
        the fundamentals of Real World Software Engineering. from Planning to
        Development and Testing to Production. This four month i was constantly
        getting hold on the physchology of softwares.
        <br />
        <br />
        After the internship, I took some time off to get myself prepared while
        creating a personal portfolio to prepare myself for the next step of my
        career.
      </>
    ),
  },
  {
    id: "027",
    image: `/contri.svg`,
    title: "The Mirror point",
    description: (
      <>
        In 2025, I decided to join Sparktech Agency. In no time my skills were
        recognized flawlessly. My communication skills got better, I started
        taking responsibilites of projects on my own. From Requirement
        collection to Deployment. I have been contributing to everything.
        Leading my team to be recognzied as the best multiple times while I have
        been learning to expand my skills more depending on the trend and the
        needs of the businesses i’ve had been interacting with.
      </>
    ),
  },
  {
    id: "028",
    image: `/robo.svg`,
    title: "The Journey Continues",
    description: (
      <>
        Just Like that , All of a sudden AI came out. While some people started
        to play victim, I switched my focus to AI driven development, Keeping
        the security matters in mind i have been coding alongside AI until then.
        <br />
        Not only Applications anymore. Soon as I started to see the impact and
        requirement of my clients towards AI, I have been learning AI
        engineering ever since.
        <br />
        <br />
        And Just this year, at late 2026. I was promoted to the position of
        Senior Executive of my team. And Im still helping my clients grow with a
        happy face along my journey..
      </>
    ),
  },
];

/* ---------- component ---------- */

function Component() {
  const layout = useBookLayout();

  // avoid SSR/hydration mismatch – render once we know the viewport
  if (!layout) return null;

  const { portrait, pageW, pageH, scale } = layout;

  // scaled sizes for page internals
  const bodyFont = Math.max(10, Math.round(14 * scale * 10) / 10);
  const titleFont = Math.max(13, Math.round(18 * scale * 10) / 10);
  const coverTitleFont = Math.max(16, Math.round(24 * scale * 10) / 10);
  const coverEndFont = Math.max(13, Math.round(14 * scale * 10) / 10);
  const smallFont = Math.max(10, Math.round(14 * scale * 10) / 10);
  const pagePadding = Math.max(10, Math.round(16 * scale));
  const illustration = Math.max(56, Math.round(112 * scale));

  return (
    <div
      className="mx-auto"
      style={{
        width: portrait ? pageW : pageW * 2,
        height: pageH,
      }}
    >
      <HTMLFlipBook
        // remount only when switching between single page and spread
        key={portrait ? "portrait" : "landscape"}
        width={pageW}
        height={pageH}
        size="stretch"
        minWidth={pageW}
        maxWidth={pageW}
        minHeight={pageH}
        maxHeight={pageH}
        usePortrait={true}
        showCover={true}
        drawShadow={true}
        maxShadowOpacity={0}
        flippingTime={portrait ? 800 : 1000}
        startPage={0}
        startZIndex={0}
        autoSize={true}
        mobileScrollSupport={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={!portrait}
        disableFlipByClick={false}
        className=""
        style={{}}
      >
        {/* Cover */}
        <div className="bg-linear-to-b from-[#7D9DC9] to-foreground rounded-lg overflow-hidden">
          <Image
            src={`/noteverde.webp`}
            height={1370}
            width={1024}
            className="w-full h-full object-cover absolute top-0 left-0 rounded-lg mix-blend-overlay opacity-50"
            alt="Background"
          />
          <div className="page-content cover h-full w-full relative">
            <h2
              className="text-background font-black font-serif text-center leading-tight"
              style={{ fontSize: coverTitleFont, paddingTop: pagePadding * 1.5 }}
            >
              How My Work <br /> Impacts the World
            </h2>
            <p
              className="w-full text-center text-muted-foreground tracking-[0.5rem] font-extralight font-sans"
              style={{ fontSize: smallFont, padding: pagePadding, paddingTop: 8 }}
            >
              Raven
            </p>
            <Image
              src="/astro.svg"
              alt="Astro"
              className="pokemon-logo -bottom-3.5! w-2/3! left-1/2 -translate-x-1/2 absolute"
              height={500}
              width={500}
            />
          </div>
        </div>

        {/* Story pages */}
        {pages.map((page) => (
          <div
            className="page bg-foreground/70 text-background rounded-lg overflow-hidden p-4 lg:p-auto"
            style={{ padding: pagePadding }}
            key={page.id}
          >
            <Image
              src={`/noteverde.webp`}
              height={1370}
              width={1024}
              className="w-full h-full object-cover absolute top-0 left-0 rounded-lg mix-blend-overlay opacity-30"
              alt={page.title}
            />
            <div className="page-content">
              <Image
                src={page.image}
                height={500}
                width={500}
                className="object-cover mx-auto"
                style={{ width: illustration, height: illustration }}
                alt={page.title}
              />
              <div
                className="pokemon-container"
                style={{ paddingTop: pagePadding * 0.75 }}
              >
                <div className="pokemon-info">
                  <h3
                    className="font-bold leading-tight"
                    style={{ fontSize: titleFont }}
                  >
                    {page.title}
                  </h3>
                  <p
                    className="pokemon-description font-serif tracking-wide"
                    style={{
                      fontSize: bodyFont,
                      lineHeight: 1.45,
                      marginTop: 4,
                    }}
                  >
                    {page.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Back cover */}
        <div className="bg-linear-to-b from-[#7D9DC9] to-foreground rounded-lg overflow-hidden">
          <Image
            src={`/noteverde.webp`}
            height={1370}
            width={1024}
            className="w-full h-full object-cover absolute top-0 left-0 rounded-lg mix-blend-overlay opacity-50"
            alt="Background"
          />
          <div className="page-content cover h-full w-full relative flex flex-col pb-12 items-center justify-center">
            <h2
              className="text-background font-black font-serif text-center"
              style={{ fontSize: coverEndFont, paddingTop: pagePadding * 1.5 }}
            >
              Thank you for <br /> reading my story
            </h2>
            <p
              className="w-full text-center text-muted-foreground tracking-[0.5rem] font-extralight font-sans"
              style={{ fontSize: smallFont, padding: pagePadding, paddingTop: 8 }}
            >
              Raven
            </p>
            <Image
              src="/sofa.svg"
              alt="Sitting in sofa"
              className="pokemon-logo -bottom-3.5! w-2/3! left-1/2 -translate-x-1/2 absolute"
              height={500}
              width={500}
            />
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
}

export default Component;