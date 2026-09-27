"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { EB_Garamond } from "next/font/google";
import { usePathname } from "next/navigation";
import { EqualIcon } from "lucide-react";
const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function Selectors() {
  const [isInside, setIsInside] = React.useState(false);
  const path = usePathname();
  const menu = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Portfolio",
      href: "/portfolio",
    },
    {
      label: "About me",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <motion.div
      className={`grid h-full w-full grid-rows-2 items-center justify-stretch gap-6 ${ebGaramond.className}`}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      <div className="h-full w-full p-6">
        <div
          className="text-[#c9a97d] mb-6 ann-nw"
          data-note="Click to navigate"
        >
          <EqualIcon size={32} />
        </div>
        <AnimatePresence mode="wait">
          {isInside && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col justify-start items-start gap-4 h-full w-full"
            >
              {menu
                .filter((item) => item.href !== path)
                .map((item) => (
                  <Link
                    href={item.href}
                    key={item.label}
                    className={cn(
                      "text-6xl text-[#c9a97d] hover:pl-4 transition-normal duration-300 ease-in-out",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
