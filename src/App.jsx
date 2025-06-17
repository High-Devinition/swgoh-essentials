import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PvpPage from "./pages/PvpPage";
import PvePage from "./pages/PvePage";

export default function App() {
  return (
    <Router basename="/swgoh-essentials">
      <div className="p-4 min-h-screen bg-gray-900 text-white">
        <nav className="mb-6 flex gap-4">
          <Link to="/pvp" className="px-3 py-2 rounded bg-blue-700 hover:bg-blue-800">PvP (GAC, TW)</Link>
          <Link to="/pve" className="px-3 py-2 rounded bg-green-700 hover:bg-green-800">PvE (TB, Raids, Conquest)</Link>
        </nav>
        <Routes>
          <Route path="/pvp" element={<PvpPage />} />
          <Route path="/pve" element={<PvePage />} />
          <Route path="*" element={<Navigate to="/pvp" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
// This is the main App component that sets up routing and navigation
// It uses React Router to switch between PvP and PvE pages 