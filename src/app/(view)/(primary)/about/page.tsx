"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import ExecutionFlow from "./execution-flow";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState<
    "biography" | "execution-flow"
  >("biography");
  return (
    <div className="grid grid-cols-3 h-full">
      <div className="col-span-2 h-full w-full ">
        <ExecutionFlow />
      </div>
      <div className="h-full w-full p-18 pr-24">
        <div className="w-full h-12 flex flex-col justify-start items-end">
          <Button
            className="w-full justify-end"
            variant={activeTab === "biography" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("biography")}
          >
            Biography
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
