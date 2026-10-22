"use client";

import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import ExecutionFlow from "./execution-flow";
import Bio from "./bio";
import Info from "./info";
import Professional from "./professional";
import { LogsIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState<
    "biography" | "execution-flow" | "info" | "professional"
  >("info");
  const [sheetOpen, openSheet] = React.useState(false);

  return (<div className="h-full min-h-0 overflow-y-auto"> <div className="lg:grid lg:grid-cols-3 pb-32"> <div className="lg:col-span-2 h-full w-full">
    {activeTab === "info" && (
      <Suspense fallback={<div>Loading...</div>}> <Info /> </Suspense>
    )}

    {activeTab === "execution-flow" && <ExecutionFlow />}

    {activeTab === "professional" && <Professional />}

    {activeTab === "biography" && <Bio />}
  </div>

    <div className="h-full w-full p-18 pr-24 hidden lg:block">
      <RenderButtons activeTab={activeTab} setActiveTab={setActiveTab} openSheet={openSheet} />
    </div>
    <Sheet>
      <SheetTrigger render={<button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={sheetOpen}
        onClick={() => openSheet(true)}
        className="lg:hidden inline-flex size-12 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#c9a97d]/60 active:opacity-70 fixed bottom-6 right-6 z-50 bg-background p-2 shadow-xl shadow-secondary"
      />} >
        <LogsIcon size={32} />
      </SheetTrigger>
      <SheetContent side="bottom" className="w-full h-[50dvh]! overflow-y-auto">
        <SheetHeader>
          <SheetTitle>More_Of_Me</SheetTitle>
        </SheetHeader>
        <RenderButtons activeTab={activeTab} setActiveTab={setActiveTab} openSheet={openSheet} />
      </SheetContent>
    </Sheet>
  </div>
  </div>
  );
}

const RenderButtons = ({
  activeTab,
  setActiveTab,
  openSheet,
}: {
  activeTab: "biography" | "execution-flow" | "info" | "professional";
  setActiveTab: (
    tab: "biography" | "execution-flow" | "info" | "professional"
  ) => void;
  openSheet: (open: boolean) => void;
}) => {
  const handleTabChange = (
    tab: "biography" | "execution-flow" | "info" | "professional"
  ) => {
    setActiveTab(tab);
    openSheet(false);
  };

  return (
    <div className="w-full flex flex-col justify-start items-end">
      <Button
        className="w-full justify-end"
        variant={activeTab === "info" ? "secondary" : "ghost"}
        onClick={() => handleTabChange("info")}
      >
        Information & Education
      </Button>

      <Button
        className="w-full justify-end"
        variant={activeTab === "professional" ? "secondary" : "ghost"}
        onClick={() => handleTabChange("professional")}
      >
        Professional Experience
      </Button>

      <Button
        className="w-full justify-end"
        variant={activeTab === "biography" ? "secondary" : "ghost"}
        onClick={() => handleTabChange("biography")}
      >
        My Journey so far
      </Button>

      <Button
        className="w-full justify-end"
        variant={activeTab === "execution-flow" ? "secondary" : "ghost"}
        onClick={() => handleTabChange("execution-flow")}
      >
        Execution Flow
      </Button>
    </div>
  );
};
