import Image from "next/image";
import React from "react";

export default function Bio() {
  return (
    <div className="w-full h-full relative ">
      Bio
      <Image
        src="/laying.webp"
        height={1024}
        width={1536}
        loading="eager"
        alt="me"
        unoptimized
        className="w-min absolute bottom-0 h-48 object-contain right-6 -scale-x-100"
      />
    </div>
  );
}
