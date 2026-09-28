import BookSlider from "@/components/core/book-slider";
import Image from "next/image";
import React from "react";

export default function Bio() {
  return (
    <div className="h-full w-full flex justify-center items-center overflow-hidden">
      <BookSlider />
      <Image
        src="/laying.webp"
        height={1024}
        width={1536}
        loading="eager"
        alt="me"
        unoptimized
        className="w-min absolute bottom-0 h-48 object-contain left-6"
      />
    </div>
  );
}
