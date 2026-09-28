import React from "react";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
export default function Page() {
  return (
    <div className=" h-full w-full ">
      <div className="w-[50dvw] flex flex-col items-center justify-center h-full">
        <CursorDrivenParticleTypography
          text="Lets Talk"
          className="border-b h-[20dvh]"
        />
        <div className="w-full grid grid-cols-6 gap-4">
          <div className="aspect-square flex items-center justify-center ">
            LOL
          </div>
        </div>
      </div>
    </div>
  );
}
