import { CircuitBoard } from "@/components/ui/circuit-board";
import { BrainIcon, Code2Icon, CoffeeIcon } from "lucide-react";
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
        ]}
        height={height}
        className="glass-card"
        width={width}
      />
    </div>
  );
}
