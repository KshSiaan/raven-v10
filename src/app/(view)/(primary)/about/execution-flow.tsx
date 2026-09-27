import { CircuitBoard } from "@/components/ui/circuit-board";
import {
  BoomBoxIcon,
  BotIcon,
  BrainCircuit,
  BrainCogIcon,
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

export default function ExecutionFlow() {
  const width = 600;
  const height = 800;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <CircuitBoard
        nodes={[
          {
            id: "11",
            label: "Coffee",
            icon: <CoffeeIcon />,
            x: width / 2 / 2,
            y: 50,
          },
          {
            id: "12",
            label: "Music",
            icon: <BoomBoxIcon />,
            x: width / 2,
            y: 100,
          },
          {
            id: "13",
            label: "Pasta(if_craving)",
            icon: <SoupIcon />,
            x: width / 2 + width / 4,
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
            id: "4",
            label: "System Design",
            icon: <CircuitBoardIcon />,
            x: width / 2,
            y: 350,
          },
          {
            id: "51",
            label: "Front-End",
            icon: <BrushIcon />,
            x: width / 4,
            y: 450,
          },
          {
            id: "52",
            label: "AI Engineering",
            icon: <BrainCircuit />,
            x: width / 2,
            y: 450,
          },
          {
            id: "53",
            label: "Back-End",
            icon: <HatGlasses />,
            x: (width / 4) * 3,
            y: 450,
          },
          {
            id: "61",
            label: "UI UX Design",
            icon: <PaletteIcon />,
            x: width / 6,
            y: 550,
          },
          {
            id: "62",
            label: "Full stack apps",
            icon: <TabletSmartphoneIcon />,
            x: (width / 6) * 2.25,
            y: 650,
          },
          {
            id: "63",
            label: "AI Agents",
            icon: <BotIcon />,
            x: (width / 6) * 3.75,
            y: 650,
          },
          {
            id: "64",
            label: "Problem Solving",
            icon: <WorkflowIcon />,
            x: (width / 3.5) * 3,
            y: 550,
          },
        ]}
        connections={[
          {
            from: "11",
            to: "12",
            animated: false,
          },
          {
            from: "13",
            to: "12",
            animated: false,
          },
          { from: "12", to: "21", animated: false },
          { from: "12", to: "22", animated: false },
          { from: "21", to: "3", animated: false },
          { from: "22", to: "3", animated: false },
          { from: "3", to: "4", animated: false },
          { from: "4", to: "51", animated: false },
          { from: "4", to: "52", animated: false },
          { from: "4", to: "53", animated: false },
          { from: "51", to: "61", animated: false },
          { from: "52", to: "62", animated: false },
          { from: "52", to: "63", animated: false },
          { from: "53", to: "64", animated: false },
          { from: "61", to: "62", animated: false },
          { from: "62", to: "63", animated: false },
          { from: "63", to: "64", animated: false },
        ]}
        height={height}
        className="glass-card"
        width={width}
      />
    </div>
  );
}
