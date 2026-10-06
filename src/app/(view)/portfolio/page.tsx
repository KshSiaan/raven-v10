import { WorksWheel } from "@/components/core/wheel-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="flex gap-0 *:border-0">
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
      <div className="w-full h-dvh">
        <WorksWheel items={items} label="My Favourite Projects" />
      </div>
    </>
  );
}
