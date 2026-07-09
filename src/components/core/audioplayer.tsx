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
    <div className="fixed! bottom-4 right-4 w-124 h-min p-4 glass-card flex justify-between items-center gap-4">
      <Button
        ref={infoButtonRef}
        className="absolute! top-2 right-2 rounded-full"
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
            className="absolute! -top-10.5 right-4 max-w-78 glass-card backdrop-blur-xs px-4 py-4 origin-bottom-right"
          >
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
          src={embedData?.thumbnail_url}
          alt={trackTitle}
          className=""
          width={64}
          height={64}
        />
      )}
      <div className="w-full">
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
          className="shrink-0"
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
