import React, { useState } from "react";
import unitsData from "./data/units.json";
import omicronsData from "./data/omicrons.json";
// import datacronsData from "./data/datacrons.json";
import { DndContext } from "@dnd-kit/core";
import UnitCard from "./components/UnitCard";

const MODES = ["Grand Arena", "Territory Wars", "Territory Battles", "Raids/Conquest"];
const GRADES = ["S", "A", "B", "C", "D", "Trash"];

function makeGrid() {
  let grid = {};
  for (let mode of MODES) {
    grid[mode] = {};
    for (let grade of GRADES) grid[mode][grade] = [];
  }
  return grid;
}

export default function App() {
  const [grid, setGrid] = useState(makeGrid());

  // Simple add button for demo (no drag/drop yet)
  const addUnit = (unit, mode, grade) => {
    setGrid(g => {
      const newGrid = JSON.parse(JSON.stringify(g));
      newGrid[mode][grade].push(unit);
      return newGrid;
    });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">SWGOH Essentials - Omicron Grader</h1>
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div></div>
        {MODES.map(mode => <div key={mode} className="font-bold text-center">{mode}</div>)}
        {GRADES.map(grade => (
          <React.Fragment key={grade}>
            <div className="font-bold text-center">{grade}</div>
            {MODES.map(mode => (
              <div key={mode + grade} className="min-h-[60px] bg-gray-800 rounded-lg p-1">
                {grid[mode][grade].map(unit => (
                  <UnitCard key={unit.id} unit={unit} omicrons={omicronsData.find(o => o.unitId === unit.id)?.abilities} />
                ))}
                {/* Demo button: add unit here */}
                <button
                  className="mt-1 px-2 py-1 text-xs bg-gray-700 rounded"
                  onClick={() => addUnit(unitsData[0], mode, grade)}
                >+ Add Malgus</button>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <p className="text-sm text-gray-400">Future-proof: add Datacron features in src/components/ and src/data/datacrons.json.</p>
    </div>
  );
}
