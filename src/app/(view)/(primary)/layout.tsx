import { Suspense } from "react";
import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import Selectors from "../_home/selectors";
import MyImage from "./my-image";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-4 w-full">
      <div className="p-12 pr-24">
        <Suspense fallback={<div>Loading...</div>}>
          <Selectors />
        </Suspense>
      </div>
      <div className="h-full relative col-span-3">{children}</div>
      <Suspense>
        <MyImage />
      </Suspense>
    </div>
  );
}
