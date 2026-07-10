import { CircuitBoard } from "@/components/ui/circuit-board";
import {
  BrainCircuit,
  BrainIcon,
  BrushIcon,
  Code2Icon,
  CoffeeIcon,
  HatGlasses,
  Scale,
  ScaleIcon,
} from "lucide-react";
import React from "react";

export default function ExecutionFlow() {
  const width = 600;
  const height = 800;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircuitBoard
        nodes={[
          {
            id: "1",
            label: "Coffee",
            icon: <CoffeeIcon />,
            x: width / 2,
            y: 50,
          },
          {
            id: "21",
            label: "Knowledge",
            icon: <BrainIcon />,
            x: width / 2 / 2,
            y: 150,
          },
          {
            id: "22",
            label: "Skills",
            icon: <Code2Icon />,
            x: width / 2 + width / 4,
            y: 150,
          },
          {
            id: "3",
            label: "Judgment",
            icon: <ScaleIcon />,
            x: width / 2,
            y: 250,
          },
          {
            id: "41",
            label: "Front-End",
            icon: <BrushIcon />,
            x: width / 4,
            y: 350,
          },
          {
            id: "42",
            label: "AI Engineering",
            icon: <BrainCircuit />,
            x: width / 2,
            y: 350,
          },
          {
            id: "43",
            label: "Back-End",
            icon: <HatGlasses />,
            x: (width / 4) * 3,
            y: 350,
          },
        ]}
        connections={[
          {
            from: "1",
            to: "21",
            animated: true,
          },
          {
            from: "1",
            to: "22",
            animated: true,
          },
          { from: "21", to: "3", animated: true },
          { from: "22", to: "3", animated: true },
          { from: "3", to: "41", animated: true },
          { from: "3", to: "42", animated: true },
          { from: "3", to: "43", animated: true },
          { from: "41", to: "42", animated: true },
          { from: "42", to: "43", animated: true },
        ]}
        height={height}
        className="glass-card"
        width={width}
      />
    </div>
  );
}
