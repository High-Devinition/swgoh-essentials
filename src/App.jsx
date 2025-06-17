import React, { useState } from "react";
import UnitSearchList from "./components/UnitSearchList";

export default function App() {
  const [selectedUnit, setSelectedUnit] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">SWGOH Character Search Demo</h1>
      <UnitSearchList onSelect={setSelectedUnit} />
      {selectedUnit && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg flex items-center gap-4 shadow-lg">
          <img
            src={`https://game-assets.swgoh.gg/tex.charui_${selectedUnit.baseId.toLowerCase()}.png`}
            alt={selectedUnit.nameKey}
            className="w-16 h-16 rounded"
            onError={e => {
              e.target.onerror = null;
              e.target.src = "/fallback.png";
            }}
          />
          <div>
            <div className="text-xl font-bold">{selectedUnit.nameKey}</div>
            <div className="text-sm text-gray-400">
              Alignment: {selectedUnit.alignment}
            </div>
            <div className="text-sm text-gray-400">
              Tags: {(selectedUnit.categories || []).join(", ")}
            </div>
          </div>
        </div>
      )}
      <p className="text-gray-500 mt-8 text-sm">
        (Click a character above to see their details. Drag-and-drop coming soon!)
      </p>
    </div>
  );
}

