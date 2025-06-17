import React, { useState } from "react";
import unitsData from "../data/units.json";
import omicronsData from "../data/omicrons.json";
import UnitCard from "../components/UnitCard";

const MODES = ["Territory Battles", "Raids/Conquest"];
const GRADES = ["S", "A", "B", "C", "D", "Trash"];

function makeGrid() {
  let grid = {};
  for (let mode of MODES) {
    grid[mode] = {};
    for (let grade of GRADES) grid[mode][grade] = [];
  }
  return grid;
}

export default function PvePage() {
  const [grid, setGrid] = useState(makeGrid());
  const addUnit = (unit, mode, grade) => {
    setGrid(g => {
      const newGrid = JSON.parse(JSON.stringify(g));
      newGrid[mode][grade].push(unit);
      return newGrid;
    });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">PvE Omicron Grid</h2>
      {/* (same grid logic for PvE modes) */}
      {/* ...copy your grid UI here, change MODES as needed... */}
    </div>
  );
}
