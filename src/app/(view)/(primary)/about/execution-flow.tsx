"use client";

import { useEffect, useRef, useState } from "react";
import { CircuitBoard } from "@/components/ui/circuit-board";
import {
  BoomBoxIcon,
  BotIcon,
  BrainCircuit,
  BrainIcon,
  BrushIcon,
  CircuitBoardIcon,
  Code2Icon,
  CoffeeIcon,
  HatGlasses,
  PaletteIcon,
  ScaleIcon,
  SoupIcon,
  TabletSmartphoneIcon,
  WorkflowIcon,
} from "lucide-react";

// Design-space dimensions. Everything is laid out here, then scaled to fit.
const WIDTH = 600;
const HEIGHT = 800;

const nodes = [
  { id: "11", label: "Coffee", icon: <CoffeeIcon />, x: WIDTH / 4, y: 50 },
  { id: "12", label: "Music", icon: <BoomBoxIcon />, x: WIDTH / 2, y: 100 },
  { id: "13", label: "Pasta(if_craving)", icon: <SoupIcon />, x: (WIDTH / 4) * 3, y: 50 },
  { id: "21", label: "Knowledge", icon: <BrainIcon />, x: WIDTH / 4, y: 150 },
  { id: "22", label: "Skills", icon: <Code2Icon />, x: (WIDTH / 4) * 3, y: 150 },
  { id: "3", label: "Judgment", icon: <ScaleIcon />, x: WIDTH / 2, y: 250 },
  { id: "4", label: "System Design", icon: <CircuitBoardIcon />, x: WIDTH / 2, y: 350 },
  { id: "51", label: "Front-End", icon: <BrushIcon />, x: WIDTH / 4, y: 450 },
  { id: "52", label: "AI Engineering", icon: <BrainCircuit />, x: WIDTH / 2, y: 450 },
  { id: "53", label: "Back-End", icon: <HatGlasses />, x: (WIDTH / 4) * 3, y: 450 },
  { id: "61", label: "UI UX Design", icon: <PaletteIcon />, x: WIDTH / 6, y: 550 },
  { id: "62", label: "Full stack apps", icon: <TabletSmartphoneIcon />, x: (WIDTH / 6) * 2.25, y: 650 },
  { id: "63", label: "AI Agents", icon: <BotIcon />, x: (WIDTH / 6) * 3.75, y: 650 },
  { id: "64", label: "Problem Solving", icon: <WorkflowIcon />, x: (WIDTH / 3.5) * 3, y: 550 },
];

const connections = [
  { from: "11", to: "12" },
  { from: "13", to: "12" },
  { from: "12", to: "21" },
  { from: "12", to: "22" },
  { from: "21", to: "3" },
  { from: "22", to: "3" },
  { from: "3", to: "4" },
  { from: "4", to: "51" },
  { from: "4", to: "52" },
  { from: "4", to: "53" },
  { from: "51", to: "61" },
  { from: "52", to: "62" },
  { from: "52", to: "63" },
  { from: "53", to: "64" },
  { from: "61", to: "62" },
  { from: "62", to: "63" },
  { from: "63", to: "64" },
].map((c) => ({ ...c, animated: false }));

export default function ExecutionFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      // Never scale up past the design size; shrink to fit narrow containers.
      setScale(Math.min(1, el.clientWidth / WIDTH));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const s = scale ?? 1;

  return (
    <div
      ref={containerRef}
      className="w-full lg:h-dvh flex justify-center items-center pt-12 lg:pt-0"
    >
      {/* Wrapper takes the *scaled* size so layout/flow stays correct */}
      <div
        style={{
          width: WIDTH * s,
          height: HEIGHT * s,
          visibility: scale === null ? "hidden" : "visible", // avoid first-paint flash
        }}
      >
        <div
          style={{
            width: WIDTH,
            height: HEIGHT,
            transform: `scale(${s})`,
            transformOrigin: "top left",
          }}
        >
          <CircuitBoard
            nodes={nodes}
            connections={connections}
            width={WIDTH}
            height={HEIGHT}
            className="glass-card"
          />
        </div>
      </div>
    </div>
  );
}