import { WorksWheel } from "@/components/core/wheel-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GridSystem from "./grid-system";
import { MenuIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const items = [
  {
    title: "KinteHobe (Lab)",
    description: "AI Powered E-commerce with $0 maintainance cost",
    image: "/projects/1.webp",
    href: "https://kintehobe.vercel.app",
  },
  {
    title: "Pocketoire",
    description: "An Affiliate Marketing Platform",
    image: "/projects/2.webp",
    href: "https://pocketoire.com",
  },
  {
    title: "MrNiceApp",
    description: "A Secure and Faster delivery System",
    image: "/projects/3.webp",
    href: "https://mrniceapp.com",
  },
  {
    title: "TryOnAndFit",
    description: "AI-powered virtual try-on and fitting platform",
    image: "/projects/4.webp",
    href: "https://www.tryonandfit.com",
  },
  {
    title: "MockingBird AI (Lab)",
    description: "This AI does the exact opposite of what other AI's does",
    image: "/projects/5.webp",
    href: "https://mockingbirdai.vercel.app",
  },
];

export default function Page() {
  return (
    <>
      <div className="2xl:flex gap-0 *:border-0 hidden">
        <Button render={<Link href="/" />} nativeButton={false} variant="link">
          Go Home
        </Button>

        <Button
          render={<Link href="/about" />}
          nativeButton={false}
          variant="secondary"
        >
          About Me
        </Button>
      </div>
      <div className="w-full h-dvh hidden 2xl:block">
        <WorksWheel items={items} label="My Favourite Projects" />
      </div>
      <div className="w-full h-dvh 2xl:hidden block md:pt-12 overflow-y-auto!">
        <div className="flex items-center justify-between px-4 gap-0 *:border-0 fixed bottom-0 lg:bottom-auto top-auto lg:top-0 left-0 w-full z-50 bg-background">
          <h1 className="">Raven</h1>
          <div className="hidden lg:block">
            <Button render={<Link href="/" />} nativeButton={false} variant="link">
              Go Home
            </Button>

            <Button
              render={<Link href="/about" />}
              nativeButton={false}
              variant="secondary"
            >
              About Me
            </Button>
          </div>
          <div className="block lg:hidden">
            <Popover>
              <PopoverTrigger render={
                <Button
                  nativeButton={false}
                  variant="ghost"
                  size="icon"
                />
              }>

                <MenuIcon />

              </PopoverTrigger>
              <PopoverContent align="end" side="top" className="">
                <Button render={<Link href="/" />} nativeButton={false} variant="outline">
                  Go Home
                </Button>

                <Button
                  render={<Link href="/about" />}
                  nativeButton={false}
                  variant="outline"
                >
                  About Me
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <GridSystem items={items} />
      </div >
    </>
  );
}
