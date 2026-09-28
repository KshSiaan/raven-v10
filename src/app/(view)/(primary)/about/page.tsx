"use client";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import ExecutionFlow from "./execution-flow";
import Bio from "./bio";
import Info from "./info";
import Professional from "./professional";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState<
    "biography" | "execution-flow" | "info" | "professional"
  >("info");
  return (
    <div className="grid grid-cols-3 h-full">
      <div className="col-span-2 h-full w-full ">
        {activeTab === "info" && (
          <Suspense fallback={<div>Loading...</div>}>
            <Info />
          </Suspense>
        )}
        {activeTab === "execution-flow" && <ExecutionFlow />}
        {activeTab === "professional" && <Professional />}
        {activeTab === "biography" && <Bio />}
      </div>
      <div className="h-full w-full p-18 pr-24">
        <div className="w-full h-12 flex flex-col justify-start items-end">
          <Button
            className="w-full justify-end"
            variant={activeTab === "info" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("info")}
          >
            Information & Education
          </Button>
          <Button
            className="w-full justify-end"
            variant={activeTab === "professional" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("professional")}
          >
            Professional Experience
          </Button>
          <Button
            className="w-full justify-end"
            variant={activeTab === "biography" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("biography")}
          >
            My Journey so far
          </Button>
          <Button
            className="w-full justify-end"
            variant={activeTab === "execution-flow" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("execution-flow")}
          >
            Execution Flow
          </Button>
        </div>
      </div>
    </div>
  );
}
