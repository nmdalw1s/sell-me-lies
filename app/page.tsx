"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function Counter({
  to,
  start,
  duration = 2200,
  delay = 600,
}: {
  to: number;
  start: boolean;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [to]);

  useEffect(() => {
    if (!start) return;

    let rafId: number | null = null;
    let startTs: number | null = null;
    const startAt = performance.now() + delay;

    function step(ts: number) {
      if (ts < startAt) {
        rafId = requestAnimationFrame(step);
        return;
      }

      if (startTs === null) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(to * eased));

      if (progress < 1) rafId = requestAnimationFrame(step);
    }

    rafId = requestAnimationFrame(step);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [start, to, duration, delay]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [startCounters, setStartCounters] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setStartCounters(true);
    }, 3000);

    return () => window.clearTimeout(t);
  }, []);

  const onSpotifyLoad = () => {
    window.setTimeout(() => setStartCounters(true), 500);
  };

  const iconLinks = useMemo(
    () => [
      {
        href: "https://open.spotify.com/show/5J7nmvZTGvjgDI58bJ3RBk",
        label: "Spotify",
        src: "/spotify.png",
      },
      {
        href: "https://podcasts.apple.com/us/podcast/sell-me-lies/id1882191656",
        label: "Apple Podcasts",
        src: "/apple.png",
      },
      {
        href: "#",
        label: "Amazon Music",
        src: "/amazon.png",
      },
      {
        href: "#",
        label: "YouTube",
        src: "/youtube.png",
      },
    ],
    []
  );

  const MenuPanel = () => (
    <div className="absolute right-0 mt-3 w-64 rounded-xl bg-[#173739]/95 p-4 shadow-xl backdrop-blur-md">
      <nav className="flex flex-col gap-4">
        <a
          href="/about"
          className="font-[var(--font-inter)] text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ede3]/95 transition hover:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          About
        </a>
        <a
          href="/score-report"
          className="font-[var(--font-inter)] text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ede3]/95 transition hover:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          Try the Score Report
        </a>
        <a
          href="/have-a-lie"
          className="font-[var(--font-inter)] text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ede3]/95 transition hover:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          Have a Lie? Tell Us
        </a>
      </nav>
    </div>
  );

  const MenuButton = () => (
    <button
      type="button"
      aria-label="Open menu"
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((v) => !v)}
      className="flex h-12 w-12 items-center justify-center rounded-md bg-black/20 backdrop-blur-sm transition hover:bg-black/30"
    >
      <div className="flex flex-col gap-1.5">
        <span className="block h-0.5 w-5 bg-[#f3ede3]" />
        <span className="block h-0.5 w-5 bg-[#f3ede3]" />
        <span className="block h-0.5 w-5 bg-[#f3ede3]" />
      </div>
    </button>
  );

  return (
    <main className={`${inter.variable} min-h-screen bg-[#f3ede3] text-[#173739]`}>
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative overflow-hidden border-r border-[#173739]/10">
          <div className="absolute inset-0">
            <img
              src="/hero.jpg"
              alt="Sell Me Lies hero"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[#173739]/80" />
          </div>

          {/* GREEN-SIDE HAMBURGER: ONLY WHEN STACKED */}
          <div className="relative z-20 flex w-full justify-end px-6 pt-6 lg:hidden">
            <div className="relative">
              <MenuButton />
              {menuOpen && <MenuPanel />}
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-10 flex min-h-screen items-center">
            <div className="mx-auto w-full max-w-[760px] px-6 py-12 text-[#f3ede3] sm:px-10 sm:py-16 lg:px-10 lg:py-16 text-center lg:text-left">
              <p className="mb-3 font-[var(--font-inter)] text-base font-medium uppercase tracking-[0.24em] text-[#e2bf72] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                Now Streaming
              </p>

              <p className="mb-6 font-[var(--font-inter)] text-base uppercase tracking-[0.24em] text-[#f3ede3]/85 drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                A Podcast by Neth
              </p>

              <h1
                className={`${playfair.className} font-medium leading-[0.88] tracking-[-0.02em] drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] text-6xl sm:text-7xl lg:text-[96px]`}
              >
                NEW LIES
                <br />
                EVERY
                <br />
                SATURDAY
              </h1>

              <p className="mt-8 mx-auto max-w-[560px] font-[var(--font-inter)] text-base font-medium uppercase tracking-[0.08em] text-[#f3ede3]/92 drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)] sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl lg:leading-9">
              THE LIES BEHIND THE ALGORITHMS
              <br className="hidden sm:block" />
              THAT SHAPE WHAT WE WANT AND BUY
              </p>

              <div className="mt-10">
                <p className="mb-4 font-[var(--font-inter)] text-sm font-medium uppercase tracking-[0.26em] text-[#e2bf72] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                  Follow Wherever You Listen
                </p>

                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  {iconLinks.map((x) => (
                    <a
                      key={x.label}
                      href={x.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={x.label}
                      className="flex h-14 w-14 items-center justify-center rounded-md bg-[#cfa85e] transition hover:opacity-90"
                    >
                      <img
                        src={x.src}
                        alt={x.label}
                        className="h-6 w-6 object-contain brightness-0 invert"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col bg-[#f3ede3] px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-12">
          {/* DESKTOP / SIDE-BY-SIDE NAV */}
          <div className="mb-14 hidden items-start justify-center gap-6 font-[var(--font-inter)] text-xs font-semibold uppercase tracking-[0.16em] text-[#173739]/70 lg:flex xl:gap-10 xl:text-sm xl:tracking-[0.2em]">
            <a href="/about" className="whitespace-nowrap transition hover:opacity-60">
              About
            </a>
            <a
              href="/score-report"
              className="whitespace-nowrap transition hover:opacity-60"
            >
              Try the Score Report
            </a>
            <a
              href="/have-a-lie"
              className="whitespace-nowrap transition hover:opacity-60"
            >
              Have a Lie? Tell Us
            </a>
          </div>

          <div className="my-auto mx-auto w-full max-w-[860px]">
            <div className="overflow-hidden rounded-[24px] bg-[#173739] min-h-[352px]">
              <iframe
                ref={iframeRef}
                onLoad={onSpotifyLoad}
                src="https://open.spotify.com/embed/show/5J7nmvZTGvjgDI58bJ3RBk"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen"
                loading="lazy"
              />
            </div>

            <p className="mt-10 text-center font-[var(--font-inter)] text-xs uppercase tracking-[0.28em] text-[#9f8357]">
              Launched in 2025
            </p>

            <div className="mt-6 grid grid-cols-3 border-t border-[#173739]/10 pt-6 text-center">
              <div>
                <p className="font-[var(--font-inter)] text-3xl font-semibold sm:text-4xl">
                  <Counter to={2387} start={startCounters} duration={2600} delay={650} />
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[10px] uppercase tracking-[0.24em] text-[#173739]/60 sm:text-xs">
                  Plays
                </p>
              </div>

              <div>
                <p className="font-[var(--font-inter)] text-3xl font-semibold sm:text-4xl">
                  <Counter to={242} start={startCounters} duration={2600} delay={650} />
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[10px] uppercase tracking-[0.24em] text-[#173739]/60 sm:text-xs">
                  Downloads
                </p>
              </div>

              <div>
                <p className="font-[var(--font-inter)] text-3xl font-semibold sm:text-4xl">
                  <Counter to={3} start={startCounters} duration={1200} delay={650} />
                </p>
                <p className="mt-1 font-[var(--font-inter)] text-[10px] uppercase tracking-[0.24em] text-[#173739]/60 sm:text-xs">
                  Episodes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}