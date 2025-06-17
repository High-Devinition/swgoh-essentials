import React from "react";

export default function UnitCard({ unit, omicrons }) {
  return (
    <div className="flex items-center gap-2 bg-gray-700 rounded px-2 py-1 mb-1">
      <img src={unit.image} alt={unit.name} className="w-8 h-8 rounded" />
      <span className="font-semibold">{unit.name}</span>
      {omicrons && omicrons.map(o => (
        <span key={o.name} className="ml-2 px-2 py-0.5 bg-indigo-700 text-xs rounded">
          {o.name} ({o.modes.join(", ")})
        </span>
      ))}
    </div>
  );
}
