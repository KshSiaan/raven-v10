import AudioPlayer from "@/components/core/audioplayer";
import Noise from "@/components/Noise";
import Image from "next/image";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-dvh! w-dvw! relative">
      {children}
      <AudioPlayer />
      <Noise patternAlpha={10} />
    </main>
  );
}
