
"use client";

import { InfoIcon, PauseIcon, PlayIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useSound from "use-sound";
import { Button } from "../ui/button";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

type SoundCloudWidget = {
  bind: (event: string, listener: () => void) => void;
  play: () => void;
  pause: () => void;
};

declare global {
  interface Window {
    SC?: {
      Widget: ((iframe: HTMLIFrameElement) => SoundCloudWidget) & {
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
        };
      };
    };
  }
}

const trackUrl =
  "https://soundcloud.com/ryuta-5/wip-ost-spirited-away-itsumo-nando-demo-read-desc";

const loadSoundCloudApi = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  if (window.SC?.Widget) return;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://w.soundcloud.com/player/api.js"]',
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load SoundCloud API script")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load SoundCloud API script"));
    document.head.appendChild(script);
  });
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch track");
  return response.json();
};

export default function AudioPlayer() {
  const [play] = useSound("audio/click.mp3", { volume: 0.5 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const infoButtonRef = useRef<HTMLButtonElement | null>(null);
  const infoPanelRef = useRef<HTMLDivElement | null>(null);

  const {
    data: embedData,
    isLoading,
    error,
  } = useSWR(
    `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(trackUrl)}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  const embedSrc = embedData?.html?.match(/src="([^"]+)"/)?.[1] ?? "";
  const trackTitle = embedData?.title ?? "SoundCloud Track";

  useEffect(() => {
    if (!embedSrc || !iframeRef.current) return;

    const initWidget = async () => {
      await loadSoundCloudApi();
      const iframe = iframeRef.current;

      if (!iframe || !window.SC?.Widget) return;

      const widget = window.SC.Widget(iframe);
      widgetRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {
        setIsPlayerReady(true);
      });

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
      });

      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false);
      });

      widget.bind(window.SC.Widget.Events.FINISH, () => {
        setIsPlaying(false);
      });
    };

    initWidget();
  }, [embedSrc]);

  // Close the info panel when clicking outside it (and not the trigger button)
  useEffect(() => {
    if (!isInfoOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        infoPanelRef.current?.contains(target) ||
        infoButtonRef.current?.contains(target)
      ) {
        return;
      }
      setIsInfoOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsInfoOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInfoOpen]);

  const togglePlayback = () => {
    play();

    if (!isPlayerReady || !widgetRef.current) return;

    if (isPlaying) {
      widgetRef.current.pause();
    } else {
      widgetRef.current.play();
    }
  };

  return (
    <div className="fixed! top-4! overflow-hidden right-3! bottom-auto! z-50 flex h-min w-40! flex-col items-center justify-between gap-3 p-3 glass-card sm:left-auto! sm:right-4! sm:top-4! sm:w-80! md:right-6! md:left-auto! md:top-6! md:w-1/3! md:flex-row md:items-center md:gap-4 md:p-4 xl:top-auto! xl:right-6! xl:bottom-6! xl:w-124! bg-none!">
      <Button
        ref={infoButtonRef}
        className="absolute! bottom-2 xl:bottom-auto xl:top-2 right-2 rounded-full"
        size="icon-xs"
        variant="outline"
        onClick={() => setIsInfoOpen((prev) => !prev)}
        aria-expanded={isInfoOpen}
        aria-label="Why this song?"
      >
        <InfoIcon />
      </Button>

      <AnimatePresence mode="wait">
        {isInfoOpen && (
          <motion.div
            ref={infoPanelRef}
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.96,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.96,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1], // smooth easeOutExpo-like
            }}
            className="absolute! top-full! bottom-auto! left-0 right-auto mt-2 w-[min(18rem,calc(100vw-2rem))] max-w-78 glass-card backdrop-blur-xs px-4 py-4 origin-top-left lg:top-auto! lg:bottom-full! lg:left-auto! lg:right-4 lg:mt-0 lg:mb-2 lg:origin-bottom-right">
            <h4 className="text-sm text-amber-300">Why this song?</h4>

            <p className="text-xs text-muted-foreground">
              This song is a soft instrumental variant of the main theme from
              the movie Spirited Away. The melody is so dreamy and
              nostalgic—truly something I can't explain in words.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {embedData?.thumbnail_url && (
        <Image
          src={embedData.thumbnail_url}
          alt={trackTitle}
          width={128}
          height={128}
          className="pointer-events-none absolute inset-0 z-0 size-full rounded-2xl object-cover object-center opacity-30 mix-blend-soft-light md:relative md:inset-auto md:z-0 md:size-16! md:shrink-0 md:rounded-none md:object-cover md:opacity-100 md:mix-blend-normal"
        />
      )}
      <div className="flex w-full min-w-0 items-center justify-between gap-2 overflow-hidden md:overflow-x-auto">
        <div className="min-w-0 flex-1 overflow-hidden text-[10px] uppercase tracking-widest text-[#ffb4a8] md:min-w-28 md:max-w-44 md:flex-none">
          {isLoading ? (
            <span className="inline-flex items-center gap-2 text-[#d7ffc5]">
              <span className="size-2 animate-pulse rounded-full bg-[#d7ffc5]" />
              Loading track...
            </span>
          ) : error ? (
            <span className="text-[#ff9a9a]">Track failed to load</span>
          ) : isPlaying ? (
            <div className="overflow-hidden whitespace-nowrap text-[#d7ffc5]">
              <div className="inline-flex min-w-full gap-8 pr-8 animate-[track-marquee_12s_linear_infinite]">
                <span>Playing:</span>
                <span>{trackTitle}</span>
                <span>Playing:</span>
                <span>{trackTitle}</span>
              </div>
            </div>
          ) : (
            <span className="text-[#ffb4a8b3]">Ready to play</span>
          )}
        </div>
        <Button
          size={"icon-lg"}
          variant={"ghost"}
          onClick={togglePlayback}
          disabled={isLoading || !isPlayerReady}
          className="size-12 shrink-0 object-cover md:size-16 mr-4 md:mr-0"
          aria-label={
            isLoading
              ? "Loading track"
              : isPlaying
                ? "Pause track"
                : "Play track"
          }
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </Button>
      </div>

      {embedSrc ? (
        <iframe
          ref={iframeRef}
          title="SoundCloud player"
          src={embedSrc}
          className="pointer-events-none absolute size-0 overflow-hidden opacity-0"
          allow="autoplay"
        />
      ) : null}
    </div>
  );
}
