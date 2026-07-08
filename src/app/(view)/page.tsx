import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-5 w-full">
      <div className="col-span-2 p-12 pr-24">
        <div className="h-full w-full flex justify-center items-center">
          <div className="perspective-normal perspective-origin-bottom ">
            <div className="rotate-x-60 rotate-z-60 glass-card aspect-square w-[10dvw] transition-all hover:bg-green-500/10"></div>
            <div className="rotate-x-60 rotate-z-60 glass-card aspect-square w-[10dvw] mt-[-12dvw] transition-all hover:bg-purple-500/10"></div>
            <div className="rotate-x-60 rotate-z-60 glass-card aspect-square w-[10dvw] mt-[-12dvw] hover:bg-amber-500/10" />
            <div className="rotate-x-60 rotate-z-60 glass-card aspect-square w-[10dvw] mt-[-12dvw] hover:bg-red-500/10" />
          </div>
        </div>
      </div>
      <div className="col-span-2 h-full"></div>
      <div className="h-full flex flex-col justify-end items-center p-6">
        <div className="w-full aspect-video glass-card border-l-none!"></div>
      </div>
    </div>
  );
}
