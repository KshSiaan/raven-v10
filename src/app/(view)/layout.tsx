import AudioPlayer from "@/components/core/audioplayer";
import LiveOrb from "@/components/core/live-orb";
import Noise from "@/components/Noise";
import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-dvh! w-dvw! relative">
      {children}
      <AudioPlayer />
      <Noise patternAlpha={10} />
      <div className="fixed bottom-2 right-1/2 translate-x-1/2 z-50">
        <LiveOrb size={60} variant="black" interactive={true} />
      </div>
    </main>
  );
}
