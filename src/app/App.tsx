import { useState } from "react";
import { AdminDashboard } from "./components/admin-dashboard";
import { WarehouseDashboard } from "./components/warehouse-dashboard";

type View = "admin" | "warehouse";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("admin");

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "admin" ? (
        <AdminDashboard onViewChange={setCurrentView} />
      ) : (
        <WarehouseDashboard onViewChange={setCurrentView} />
      )}
    </div>
  );
}