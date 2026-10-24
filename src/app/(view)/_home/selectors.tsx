"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";
import Link from "next/link";
import React from "react";
import { EB_Garamond } from "next/font/google";
import { usePathname } from "next/navigation";
import { EqualIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const ebGaramond = EB_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const MENU = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About me", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const STORAGE_KEY = "hasBeenNavigated";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

export default function Selectors() {
  const path = usePathname();
  const [isInside, setIsInside] = React.useState(false); // desktop inline menu
  const [sheetOpen, setSheetOpen] = React.useState(false); // mobile/tablet sheet
  const [hasBeenNavigated, setHasBeenNavigated] = React.useState(true);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const pointerType = React.useRef<string>("mouse");

  const items = React.useMemo(
    () => MENU.filter((item) => item.href !== path),
    [path],
  );

  // First-visit hint
  React.useEffect(() => {
    setHasBeenNavigated(!!localStorage.getItem(STORAGE_KEY));
  }, []);

  const handleNavigated = React.useCallback(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setHasBeenNavigated(true);
  }, []);

  // Close menus after navigating (inline menu stays open for mouse users, as before)
  // biome-ignore lint/correctness/useExhaustiveDependencies: only react to route changes
  React.useEffect(() => {
    setSheetOpen(false);
    if (pointerType.current !== "mouse") setIsInside(false);
  }, [path]);
  
  // Inline menu: close on outside tap (touch/pen) and on Escape
  React.useEffect(() => {
    if (!isInside) return;
    const onDown = (e: PointerEvent) => {
      if (
        e.pointerType !== "mouse" &&
        !rootRef.current?.contains(e.target as Node)
      ) {
        setIsInside(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsInside(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isInside]);

  const openSheet = (open: boolean) => {
    if (open) handleNavigated();
    setSheetOpen(open);
  };

  return (
    <>
      {/* ───────────── Mobile / tablet (< lg): trigger + Sheet ───────────── */}
      <div className="lg:hidden">
        <div
          className={cn(
            "ann ann-nw ann-no-mark fixed z-40 text-[#c9a97d]",
            "left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))]",
            ebGaramond.className,
          )}
          data-note={!sheetOpen && !hasBeenNavigated ? "Navigation Menu" : ""}
        >
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={sheetOpen}
            onClick={() => openSheet(true)}
            className="inline-flex size-12 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#c9a97d]/60 active:opacity-70"
          >
            <EqualIcon size={32} />
          </button>
        </div>

        <Sheet open={sheetOpen} onOpenChange={openSheet}>
          <SheetContent
            side="left"
            // Sheet is portaled outside this component, so the font is applied here
            className={cn(
              "w-full overflow-y-auto overflow-x-hidden border-none sm:max-w-md [&>button]:text-[#c9a97d] bg-background max-h-dvh overflow-hidden",
              "pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:pt-[max(1.5rem,env(safe-area-inset-top))]",
              ebGaramond.className,
            )}
          >
            <SheetHeader>
              <SheetTitle className="text-sm font-sans font-light text-muted-foreground">Nav_Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate between pages
              </SheetDescription>
            </SheetHeader>

            <motion.nav
              aria-label="Main"
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex min-h-full flex-col items-start justify-center gap-[clamp(0.5rem,2.5vh,1.25rem)] px-6 py-8"
            >
              {items.map((item) => (
                <motion.div key={item.label} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setSheetOpen(false)}
                    className="block max-w-full wrap-break-word py-1 text-[clamp(2.25rem,min(11vw,8vh),3.75rem)] leading-tight text-[#c9a97d] transition-all duration-300 ease-in-out active:pl-4"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </SheetContent>
        </Sheet>
      </div >

      {/* ───────────── Desktop (lg+): inline menu ───────────── */}
      <div className="hidden min-w-0 lg:block lg:p-8 xl:p-12 xl:pr-24" >
        <motion.div
          ref={rootRef}
          className={cn("w-full", ebGaramond.className)}
          onPointerDown={(e) => {
            pointerType.current = e.pointerType;
          }}
          // Hover only for real mice; touch emulates mouse events and would flicker
          onPointerEnter={(e) => {
            pointerType.current = e.pointerType;
            if (e.pointerType === "mouse") {
              handleNavigated();
              setIsInside(true);
            }
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setIsInside(false);
          }}
        >
          <div className="w-full p-4 xl:p-6">
            <div
              className="ann ann-nw ann-no-mark mb-6 text-[#c9a97d]"
              data-note={!isInside && !hasBeenNavigated ? "Navigation Menu" : ""}
            >
              <button
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={isInside}
                // Mouse: hover already opened it, so click keeps it open. Touch/keyboard: toggle.
                onClick={() => {
                  handleNavigated();
                  setIsInside((open) =>
                    pointerType.current === "mouse" ? true : !open,
                  );
                }}
                className="-m-2 inline-flex cursor-pointer items-center justify-center rounded-md p-2 outline-none focus-visible:ring-2 focus-visible:ring-[#c9a97d]/60"
              >
                <EqualIcon size={32} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isInside && (
                <motion.nav
                  aria-label="Main"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="flex w-full flex-col items-start gap-[clamp(0.5rem,1.5vh,1rem)]"
                >
                  {items.map((item) => (
                    <Link
                      href={item.href}
                      key={item.label}
                      className="max-w-full break-words text-[clamp(2.25rem,min(4.5vw,7.5vh),3.75rem)] leading-tight text-[#c9a97d] transition-normal duration-300 ease-in-out hover:pl-4"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div >
    </>
  );
}