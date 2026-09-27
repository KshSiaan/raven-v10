"use client";

import Grainient from "@/components/Grainient";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MyImage() {
  const path = usePathname();

  return (
    <>
      {path === "/" && (
        <Image
          src="/me.webp"
          alt="Me"
          width={1240}
          height={1240}
          className="fixed top-0 left-0 -z-10 h-dvh! w-dvw! object-contain mix-blend-lighten"
        />

        // ) : (
        //   <Grainient
        //     color1="#310b10"
        //     color2="#191825"
        //     color3="#191825"
        //     className="fixed! top-0 left-0 -z-10 h-dvh! w-dvw! object-cover mix-blend-lighten"
        //     timeSpeed={0.25}
        //     colorBalance={0}
        //     warpStrength={1}
        //     warpFrequency={5}
        //     warpSpeed={2}
        //     warpAmplitude={50}
        //     blendAngle={0}
        //     blendSoftness={0.05}
        //     rotationAmount={480}
        //     noiseScale={1.95}
        //     grainAmount={0}
        //     grainScale={0.2}
        //     grainAnimated={false}
        //     contrast={1.5}
        //     gamma={1}
        //     saturation={1}
        //     centerX={0}
        //     centerY={0}
        //     zoom={0.9}
        //   />
      )}
    </>
  );
}
