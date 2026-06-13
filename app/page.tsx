"use client";

import { useState } from "react";
import { 
  Building2, 
  LayoutDashboard, 
  ShoppingCart, 
  Truck, 
  Package, 
  UploadCloud, 
  Wallet, 
  Activity, 
  Calculator, 
  FileText, 
  Settings as SettingsIcon,
  Menu
} from "lucide-react";

import { DashboardView } from "@/components/views/DashboardView";
import { SalesView } from "@/components/views/SalesView";
import { DeliveriesView } from "@/components/views/DeliveriesView";
import { ProductsView } from "@/components/views/ProductsView";
import { ImportCostsView } from "@/components/views/ImportCostsView";
import { BusinessCostsView } from "@/components/views/BusinessCostsView";
import { StockFlowView } from "@/components/views/StockFlowView";
import { DeliveryCostView } from "@/components/views/DeliveryCostView";
import { ReportsView } from "@/components/views/ReportsView";
import { SettingsView } from "@/components/views/SettingsView";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, component: DashboardView },
  { id: "sales", label: "Pedidos e Vendas", icon: ShoppingCart, component: SalesView },
  { id: "deliveries", label: "Entregas", icon: Truck, component: DeliveriesView },
  { id: "products", label: "Produtos e Custos", icon: Package, component: ProductsView },
  { id: "import", label: "Importar Custos", icon: UploadCloud, component: ImportCostsView },
  { id: "business_costs", label: "Custos do Negócio", icon: Wallet, component: BusinessCostsView },
  { id: "stock", label: "Fluxo de Estoque", icon: Activity, component: StockFlowView },
  { id: "delivery_audits", label: "Auditoria de Fretes", icon: Calculator, component: DeliveryCostView },
  { id: "reports", label: "Relatórios", icon: FileText, component: ReportsView },
  { id: "settings", label: "Configurações", icon: SettingsIcon, component: SettingsView },
];

export default function Shell() {
  const [activeTab, setActiveTab] = useState(NAV_ITEMS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ActiveComponent = NAV_ITEMS.find((item) => item.id === activeTab)?.component || DashboardView;

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:hidden">
        <div className="flex items-center gap-2 font-bold text-primary">
          <Building2 className="h-6 w-6" />
          <span>Santa Bronx Ops</span>
        </div>
        <button className="text-muted-foreground hover:text-foreground" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2 border-b border-border px-6 font-bold text-primary">
          <Building2 className="h-6 w-6" />
          <span>Santa Bronx Ops</span>
        </div>
        <nav className="space-y-1 p-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div key={activeTab} className="animate-fade-in">
          <ActiveComponent />
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
