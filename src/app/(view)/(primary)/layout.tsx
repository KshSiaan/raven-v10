import { Suspense } from "react";
import Selectors from "../_home/selectors";
import MyImage from "./my-image";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-4 w-full relative overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <Selectors />
      </Suspense>

      <div className="h-full lg:col-span-3 overflow-hidden">
        {children}
      </div>
      <Suspense>
        <MyImage />
      </Suspense>
    </div>
  );
}
