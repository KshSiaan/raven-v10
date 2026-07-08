import Noise from "@/components/Noise";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="flex h-dvh! w-dvw relative bg-background bg-blend-lighten bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/me.webp)" }}
    >
      {children}
      <Noise patternAlpha={10} />
    </main>
  );
}
