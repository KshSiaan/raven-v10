import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main
      className="flex h-dvh w-dvw relative bg-background bg-blend-lighten bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/me.webp)" }}
    ></main>
  );
}
