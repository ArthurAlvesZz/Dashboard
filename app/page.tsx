'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  ShoppingCart, 
  Truck, 
  Box, 
  UploadCloud, 
  Wallet, 
  ArrowRightLeft, 
  Map, 
  FileText, 
  Settings,
  Store,
  Calendar,
  ChevronDown,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { dateFilters, stores } from '@/lib/mockData';
import { DashboardView } from '@/components/views/DashboardView';
import { ProductsView } from '@/components/views/ProductsView';
import { ImportCostsView } from '@/components/views/ImportCostsView';
import { SalesView } from '@/components/views/SalesView';
import { BusinessCostsView } from '@/components/views/BusinessCostsView';
import { DeliveriesView } from '@/components/views/DeliveriesView';
import { StockFlowView } from '@/components/views/StockFlowView';
import { DeliveryCostView } from '@/components/views/DeliveryCostView';
import { ReportsView } from '@/components/views/ReportsView';
import { SettingsView } from '@/components/views/SettingsView';

const MENUS = [
  { id: 'dashboard', label: 'Dashboard Financeiro', icon: BarChart3 },
  { id: 'pedidos', label: 'Pedidos e Vendas', icon: ShoppingCart },
  { id: 'entregas', label: 'Logística de Entregas', icon: Truck },
  { id: 'produtos', label: 'Produtos e Custos', icon: Box },
  { id: 'importar', label: 'Importar Planilha (Massa)', icon: UploadCloud },
  { id: 'negocio', label: 'Custos da Empresa', icon: Wallet },
  { id: 'estoque', label: 'Fluxo de Estoque', icon: ArrowRightLeft },
  { id: 'custo_entrega', label: 'Auditoria de Fretes', icon: Map },
  { id: 'relatorios', label: 'Relatórios Visuais', icon: FileText },
  { id: 'equipe', label: 'Equipe e Configurações', icon: Settings },
];

export default function SantaBronxOps() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [selectedDate, setSelectedDate] = useState(dateFilters[0].id);

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-950 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-neutral-800">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mr-3">
            <span className="text-black font-bold font-display text-lg tracking-tighter">SB</span>
          </div>
          <span className="font-display font-medium text-lg tracking-tight">Santa Bronx Ops</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenu(menu.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-neutral-800 text-white" 
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-neutral-500")} />
                {menu.label}
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
              <span className="text-xs font-medium">AF</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">Arthur Alves</span>
              <span className="text-xs text-neutral-500">Administrador</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-neutral-950">
        {/* Topbar */}
        <header className="h-16 border-b border-neutral-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium font-display tracking-tight text-white">
              {MENUS.find(m => m.id === activeMenu)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Store Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer">
                <Store className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-medium text-neutral-300">
                  {stores.find(s => s.id === selectedStore)?.name}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                 {stores.map(store => (
                   <div 
                     key={store.id} 
                     onClick={() => setSelectedStore(store.id)}
                     className={cn(
                       "px-4 py-2 text-sm cursor-pointer hover:bg-neutral-800 text-white",
                       selectedStore === store.id ? "bg-neutral-800" : ""
                     )}
                   >
                     {store.name}
                   </div>
                 ))}
              </div>
            </div>

            {/* Date Filter */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-medium text-neutral-300">
                  {dateFilters.find(d => d.id === selectedDate)?.name}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>
               <div className="absolute right-0 top-full mt-1 w-48 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                 {dateFilters.map(df => (
                   <div 
                     key={df.id} 
                     onClick={() => setSelectedDate(df.id)}
                     className={cn(
                       "px-4 py-2 text-sm cursor-pointer hover:bg-neutral-800 text-white",
                       selectedDate === df.id ? "bg-neutral-800" : ""
                     )}
                   >
                     {df.name}
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="h-4 w-px bg-neutral-800 mx-2"></div>
            
            <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-neutral-950"></span>
            </button>
          </div>
        </header>

        {/* View rendering */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeMenu === 'dashboard' && <DashboardView />}
            {activeMenu === 'pedidos' && <SalesView />}
            {activeMenu === 'produtos' && <ProductsView />}
            {activeMenu === 'importar' && <ImportCostsView />}
            {activeMenu === 'entregas' && <DeliveriesView />}
            {activeMenu === 'negocio' && <BusinessCostsView />}
            {activeMenu === 'estoque' && <StockFlowView />}
            {activeMenu === 'custo_entrega' && <DeliveryCostView />}
            {activeMenu === 'relatorios' && <ReportsView />}
            {activeMenu === 'equipe' && <SettingsView />}
          </div>
        </div>
      </main>
    </div>
  );
}
