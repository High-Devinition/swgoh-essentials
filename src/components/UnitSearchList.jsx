import React, { useState } from "react";
import units from "../data/units.json"; // Download this from swgoh-utils/gamedata

const unitsData = units.data;

// Helper: Construct unit portrait image URL based on baseId
function getUnitImage(baseId) {
  return `https://game-assets.swgoh.gg/tex.charui_${baseId.toLowerCase()}.png`;
}

export default function UnitSearchList({ onSelect }) {
  const [search, setSearch] = useState("");
  const [alignment, setAlignment] = useState("All");
  const [tag, setTag] = useState("All");

  // Unique tags for the dropdown
  const allTags = Array.from(
    new Set(unitsData.flatMap(unit => unit.categories || []))
  ).sort();

  // Unique alignments
  const allAlignments = Array.from(
    new Set(unitsData.map(unit => unit.alignment || "Unknown"))
  ).sort();

  // Filtering logic
  const filtered = unitsData.filter(unit => {
    const name = (unit.nameKey || "").toLowerCase();
    const nameMatch = name.includes(search.toLowerCase());
    const alignMatch = alignment === "All" || unit.alignment === alignment;
    const tagMatch =
      tag === "All" || (unit.categories && unit.categories.includes(tag));
    return nameMatch && alignMatch && tagMatch;
  });

  return (
    <div className="p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <input
          className="w-full px-2 py-1 rounded bg-gray-700 text-white"
          placeholder="Search characters..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="px-2 py-1 rounded bg-gray-700 text-white"
          value={alignment}
          onChange={e => setAlignment(e.target.value)}
        >
          <option value="All">All Alignments</option>
          {allAlignments.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <select
          className="px-2 py-1 rounded bg-gray-700 text-white"
          value={tag}
          onChange={e => setTag(e.target.value)}
        >
          <option value="All">All Tags</option>
          {allTags.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      {/* Search Results */}
      <div className="max-h-80 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="text-gray-400 text-center py-4">No units found.</div>
        )}
        {filtered.map(unit => (
          <div
            key={unit.baseId}
            className="flex items-center gap-2 p-2 mb-1 rounded bg-gray-900 cursor-pointer hover:bg-gray-700"
            onClick={() => onSelect?.(unit)}
          >
            <img
              src={getUnitImage(unit.baseId)}
              alt={unit.nameKey}
              className="w-8 h-8 rounded"
              loading="lazy"
              onError={e => {
                e.target.onerror = null;
                e.target.src = "/fallback.png";
              }}
            />
            <span className="font-medium">{unit.nameKey}</span>
            <span className="text-xs text-gray-400">{unit.alignment}</span>
            <span className="text-xs text-gray-500">
              {(unit.categories || []).slice(0, 3).join(", ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
