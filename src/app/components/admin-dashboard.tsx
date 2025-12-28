import {
  LayoutDashboard,
  Package,
  Truck,
  ShoppingCart,
  FileText,
  Users,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  TriangleAlert,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Warehouse,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data
const stockData = [
  { type: "Jumbo", cantidad: 4500, color: "#f59e0b" },
  { type: "Grande", cantidad: 6200, color: "#3b82f6" },
  { type: "Mediano", cantidad: 3800, color: "#10b981" },
  { type: "Pequeño", cantidad: 900, color: "#8b5cf6" },
];

const ventasVsMermasData = [
  { mes: "Jul", ventas: 95, mermas: 5 },
  { mes: "Ago", ventas: 96, mermas: 4 },
  { mes: "Sep", ventas: 97, mermas: 3 },
  { mes: "Oct", ventas: 97.5, mermas: 2.5 },
  { mes: "Nov", ventas: 98, mermas: 2 },
  { mes: "Dic", ventas: 98.8, mermas: 1.2 },
];

const lotesRiesgo = [
  { lote: "Lote-A20", dias: 0, ubicacion: "Estantería A-2", cantidad: 120 },
  { lote: "Lote-B15", dias: 1, ubicacion: "Estantería B-5", cantidad: 85 },
  { lote: "Lote-C05", dias: 3, ubicacion: "Estantería C-1", cantidad: 150 },
  { lote: "Lote-D12", dias: 4, ubicacion: "Estantería D-3", cantidad: 95 },
  { lote: "Lote-E08", dias: 4, ubicacion: "Estantería E-7", cantidad: 110 },
];

const auditLog = [
  { tiempo: "10:05 AM", usuario: "Juan Pérez", accion: "Despachó 50 cartones (Lote-A20)" },
  { tiempo: "09:30 AM", usuario: "Sistema", accion: "Recepción Camión Granja #4 - 800 cartones" },
  { tiempo: "08:15 AM", usuario: "María López", accion: "Ajuste de inventario - Lote-C05 (-5 unidades rotas)" },
  { tiempo: "07:45 AM", usuario: "Carlos Díaz", accion: "Registró entrada de 350 cartones (Lote-F20)" },
];

type View = "admin" | "warehouse";

interface AdminDashboardProps {
  onViewChange: (view: View) => void;
}

export function AdminDashboard({ onViewChange }: AdminDashboardProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2C3E50] p-6 flex flex-col">
        {/* Logo Don Chiche */}
        <div className="mb-8">
          <div className="bg-amber-500 text-white px-4 py-3 rounded-lg text-center">
            <span className="font-bold text-xl">DON CHICHE</span>
          </div>
          <p className="text-gray-400 text-sm text-center mt-2">Sistema de Gestión</p>
        </div>

        <nav className="space-y-2 flex-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#34495e] rounded-lg">
            <Package className="w-5 h-5" />
            <span>Inventario</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#34495e] rounded-lg">
            <Truck className="w-5 h-5" />
            <span>Entradas</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#34495e] rounded-lg">
            <ShoppingCart className="w-5 h-5" />
            <span>Salidas</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#34495e] rounded-lg">
            <FileText className="w-5 h-5" />
            <span>Reportes</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#34495e] rounded-lg">
            <Users className="w-5 h-5" />
            <span>Usuarios</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#34495e] rounded-lg">
            <Settings className="w-5 h-5" />
            <span>Configuración</span>
          </a>
          
          <div className="pt-4 border-t border-gray-600 mt-4">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-[#34495e] rounded-lg">
              <LogOut className="w-5 h-5" />
              <span>Salir</span>
            </a>
          </div>
        </nav>

        {/* User Info */}
        <div className="border-t border-gray-600 pt-4 mt-4">
          <div className="text-white">
            <p className="text-sm text-gray-400 mb-1">Admin: Ryan Durán</p>
            <p className="text-xs text-gray-500">Gerente General</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* View Toggle and Search */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Panel Administrativo
              </button>
              <button
                onClick={() => onViewChange("warehouse")}
                className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
              >
                <Warehouse className="w-4 h-4 inline-block mr-2" />
                Panel Almacén
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar lote o factura..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-gray-900 mb-1">Panel de Control Administrativo</h1>
            <p className="text-gray-600">Supervisión financiera y control de mermas</p>
          </div>

          {/* Critical Alert */}
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-6 animate-pulse">
            <div className="flex items-center gap-3">
              <TriangleAlert className="w-6 h-6 text-red-600" />
              <div>
                <p className="text-red-900">
                  <span className="font-bold">ALERTA CRÍTICA:</span> 2 Lotes vencen en 48 horas o menos
                </p>
                <p className="text-red-700 text-sm">Revisar sección "Lotes en Riesgo" inmediatamente</p>
              </div>
            </div>
          </div>

          {/* KPI Cards - Zona A */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Card 1: Stock Total */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Stock Total</p>
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-gray-900 mb-1">15,400 Unidades</p>
              <div className="flex items-center gap-2 text-green-600">
                <Activity className="w-4 h-4" />
                <span className="text-sm">Estable</span>
              </div>
            </div>

            {/* Card 2: Valor Inventario */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Valor del Inventario</p>
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-gray-900 mb-1">RD$ 1,232,000</p>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+5% vs mes anterior</span>
              </div>
            </div>

            {/* Card 3: Lotes en Riesgo - CRITICAL */}
            <div className="bg-red-600 rounded-lg p-6 text-white animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <p className="text-red-100">Lotes en Riesgo</p>
                <TriangleAlert className="w-5 h-5 text-white" />
              </div>
              <p className="mb-1">2 Lotes (&lt; 2 días)</p>
              <p className="text-red-100 text-sm">¡Acción inmediata requerida!</p>
            </div>

            {/* Card 4: Mermas del Mes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">Mermas del Mes</p>
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-gray-900 mb-1">1.2%</p>
              <div className="flex items-center gap-2 text-green-600">
                <span className="text-sm">Meta: 1% • Excelente ✓</span>
              </div>
            </div>
          </div>

          {/* Charts and Tables Grid - Zona B & C */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Stock por Tipo - Zona B */}
            <div className="col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Stock por Tipo de Huevo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lotes en Riesgo - Zona C */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Top 5 Lotes Más Antiguos</h3>
              <div className="space-y-3">
                {lotesRiesgo.map((lote, index) => (
                  <div
                    key={lote.lote}
                    className={`p-3 rounded-lg border ${
                      lote.dias <= 1
                        ? "bg-red-50 border-red-300"
                        : lote.dias <= 3
                        ? "bg-yellow-50 border-yellow-300"
                        : "bg-blue-50 border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className={`font-medium ${
                        lote.dias <= 1 ? "text-red-900" : lote.dias <= 3 ? "text-yellow-900" : "text-blue-900"
                      }`}>
                        {index + 1}. {lote.lote}
                      </span>
                      <span className={`text-sm ${
                        lote.dias <= 1 ? "text-red-700" : lote.dias <= 3 ? "text-yellow-700" : "text-blue-700"
                      }`}>
                        {lote.dias === 0 ? "HOY" : lote.dias === 1 ? "Mañana" : `${lote.dias} días`}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      lote.dias <= 1 ? "text-red-700" : lote.dias <= 3 ? "text-yellow-700" : "text-blue-700"
                    }`}>
                      {lote.ubicacion} • {lote.cantidad} cart.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ventas vs Mermas Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="mb-4">
              <h3 className="text-gray-900 mb-1">Tendencia: Ventas vs. Mermas (Últimos 6 Meses)</h3>
              <p className="text-gray-600 text-sm">Demostración del ROI del sistema PEPS</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ventasVsMermasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventas" stroke="#10b981" strokeWidth={2} name="% Ventas Exitosas" />
                <Line type="monotone" dataKey="mermas" stroke="#ef4444" strokeWidth={2} name="% Mermas" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Audit Log - Zona D */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Registro de Auditoría Reciente</h3>
            <div className="space-y-3">
              {auditLog.map((entry, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-20 text-sm text-gray-600 flex-shrink-0">{entry.tiempo}</div>
                  <div className="flex-1">
                    <span className="text-gray-900">{entry.usuario}</span>
                    <span className="text-gray-600"> - {entry.accion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}