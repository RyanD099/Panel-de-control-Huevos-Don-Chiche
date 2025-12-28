import {
  PackageCheck,
  ShoppingCart,
  Search,
  MapPin,
  TriangleAlert,
  Clock,
  Truck,
  Package,
  LayoutDashboard,
} from "lucide-react";

// Mock data
const nextLote = {
  codigo: "LOTE-A20",
  ubicacion: "Estantería A-2",
  tipo: "Huevos Jumbo",
  cantidad: 120,
  horasRestantes: 18,
  fechaVencimiento: "29 Dic 2024",
};

const tareasPendientes = [
  {
    id: 1,
    tipo: "devolucion",
    titulo: "Devolución Cliente #542",
    descripcion: "20 cartones - Revisar y registrar en sistema",
    urgencia: "alta",
  },
  {
    id: 2,
    tipo: "ajuste",
    titulo: "Ajuste de Inventario",
    descripcion: "Lote-C05: Verificar cantidad real vs sistema",
    urgencia: "media",
  },
  {
    id: 3,
    tipo: "recepcion",
    titulo: "Camión en Ruta",
    descripcion: "Granja #7 - Llegada estimada: 2:30 PM",
    urgencia: "baja",
  },
];

const lotesProximos = [
  { codigo: "LOTE-B15", ubicacion: "Estantería B-5", dias: 1, tipo: "Grande" },
  { codigo: "LOTE-C05", ubicacion: "Estantería C-1", dias: 3, tipo: "Mediano" },
  { codigo: "LOTE-D12", ubicacion: "Estantería D-3", dias: 4, tipo: "Jumbo" },
];

type View = "admin" | "warehouse";

interface WarehouseDashboardProps {
  onViewChange: (view: View) => void;
}

export function WarehouseDashboard({ onViewChange }: WarehouseDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* View Toggle */}
      <div className="max-w-6xl mx-auto pt-6 px-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => onViewChange("admin")}
            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 inline-block mr-2" />
            Panel Administrativo
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Panel Almacén
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-gray-900 mb-2">Panel de Control - Almacén</h1>
          <p className="text-gray-600">Operaciones diarias y sistema PEPS (Primero en Entrar, Primero en Salir)</p>
        </div>

        {/* ZONA A: Semáforo PEPS - CRÍTICO */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 mb-6 text-white shadow-2xl border-4 border-red-800">
          <div className="flex items-center gap-3 mb-4">
            <TriangleAlert className="w-10 h-10 animate-pulse" />
            <div>
              <h2 className="text-white mb-1">PRÓXIMO LOTE A DESPACHAR</h2>
              <p className="text-red-100">Sistema PEPS Activo - Siga estas instrucciones</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-red-100 mb-2">CÓDIGO DE LOTE</p>
                <p className="text-white mb-4">{nextLote.codigo}</p>
              </div>
              <div>
                <p className="text-red-100 mb-2">TIPO</p>
                <p className="text-white">{nextLote.tipo}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-red-100" />
                  <p className="text-red-100">UBICACIÓN FÍSICA</p>
                </div>
                <p className="text-white mb-4">{nextLote.ubicacion}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-red-100" />
                  <p className="text-red-100">TIEMPO RESTANTE</p>
                </div>
                <p className="text-white">{nextLote.horasRestantes} horas</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-900/50 rounded-lg border-2 border-white/30">
              <p className="text-white text-center">
                <span className="font-bold">Cantidad Disponible:</span> {nextLote.cantidad} cartones
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-yellow-400 text-yellow-900 p-4 rounded-lg">
            <TriangleAlert className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium">
              <strong>¡IMPORTANTE!</strong> Este lote debe despacharse HOY. Vence: {nextLote.fechaVencimiento}
            </p>
          </div>
        </div>

        {/* ZONA B: Botones de Acción Rápida */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-8 shadow-lg transition-all hover:scale-105 active:scale-95">
            <Truck className="w-12 h-12 mx-auto mb-4" />
            <p className="mb-2">RECIBIR MERCANCÍA</p>
            <p className="text-green-100 text-sm">Registrar nueva entrada</p>
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-8 shadow-lg transition-all hover:scale-105 active:scale-95">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4" />
            <p className="mb-2">REGISTRAR SALIDA</p>
            <p className="text-blue-100 text-sm">Despacho de venta</p>
          </button>

          <button className="bg-amber-600 hover:bg-amber-700 text-white rounded-2xl p-8 shadow-lg transition-all hover:scale-105 active:scale-95">
            <Search className="w-12 h-12 mx-auto mb-4" />
            <p className="mb-2">CONSULTAR LOTE</p>
            <p className="text-amber-100 text-sm">Buscar información</p>
          </button>
        </div>

        {/* Próximos Lotes en Espera */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-gray-900 mb-4">Próximos Lotes en Cola PEPS</h3>
          <p className="text-gray-600 text-sm mb-4">Estos se despacharán después del lote actual</p>
          <div className="space-y-3">
            {lotesProximos.map((lote, index) => (
              <div
                key={lote.codigo}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{lote.codigo}</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{lote.ubicacion}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-900">{lote.tipo}</p>
                  <p className="text-gray-600 text-sm">
                    {lote.dias} {lote.dias === 1 ? "día" : "días"} restantes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ZONA C: Alertas de Tareas */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <PackageCheck className="w-6 h-6 text-blue-600" />
            <h3 className="text-gray-900">Tareas y Alertas Pendientes</h3>
          </div>
          <div className="space-y-3">
            {tareasPendientes.map((tarea) => (
              <div
                key={tarea.id}
                className={`p-4 rounded-lg border-l-4 ${
                  tarea.urgencia === "alta"
                    ? "bg-red-50 border-red-500"
                    : tarea.urgencia === "media"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {tarea.tipo === "devolucion" && <Package className="w-5 h-5 text-red-600" />}
                    {tarea.tipo === "ajuste" && <PackageCheck className="w-5 h-5 text-yellow-600" />}
                    {tarea.tipo === "recepcion" && <Truck className="w-5 h-5 text-blue-600" />}
                    <p className={`font-medium ${
                      tarea.urgencia === "alta"
                        ? "text-red-900"
                        : tarea.urgencia === "media"
                        ? "text-yellow-900"
                        : "text-blue-900"
                    }`}>
                      {tarea.titulo}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    tarea.urgencia === "alta"
                      ? "bg-red-200 text-red-800"
                      : tarea.urgencia === "media"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-blue-200 text-blue-800"
                  }`}>
                    {tarea.urgencia === "alta" ? "URGENTE" : tarea.urgencia === "media" ? "PRIORIDAD" : "NORMAL"}
                  </span>
                </div>
                <p className={`text-sm ${
                  tarea.urgencia === "alta"
                    ? "text-red-700"
                    : tarea.urgencia === "media"
                    ? "text-yellow-700"
                    : "text-blue-700"
                }`}>
                  {tarea.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <PackageCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-blue-900 font-medium mb-1">Sistema PEPS Automático</p>
              <p className="text-blue-700 text-sm">
                El sistema calcula automáticamente qué lote debe salir primero para minimizar mermas. 
                Siempre siga las instrucciones del "Semáforo PEPS" para garantizar la rotación correcta del inventario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}