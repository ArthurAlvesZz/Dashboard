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

const MENUS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'pedidos', label: 'Pedidos/Vendas', icon: ShoppingCart },
  { id: 'entregas', label: 'Entregas', icon: Truck },
  { id: 'produtos', label: 'Produtos/Custos', icon: Box },
  { id: 'importar', label: 'Importar Custos', icon: UploadCloud },
  { id: 'negocio', label: 'Custos do Negócio', icon: Wallet },
  { id: 'estoque', label: 'Fluxo de Estoque', icon: ArrowRightLeft },
  { id: 'custo_entrega', label: 'Custo com Entrega', icon: Map },
  { id: 'relatorios', label: 'Relatórios', icon: FileText },
  { id: 'equipe', label: 'Equipe/Ajustes', icon: Settings },
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
            <div className="relative group cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors">
              <Store className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-300">
                {stores.find(s => s.id === selectedStore)?.name}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </div>

            {/* Date Filter */}
            <div className="relative group cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span className="text-sm font-medium text-neutral-300">
                {dateFilters.find(d => d.id === selectedDate)?.name}
              </span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
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
            
            {/* Fallback empty states for other tabs */}
            {!['dashboard', 'pedidos', 'produtos', 'importar'].includes(activeMenu) && (
              <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/30">
                <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mb-4">
                  {MENUS.find(m => m.id === activeMenu)?.icon && 
                    // @ts-ignore
                    (() => { const Icon = MENUS.find(m => m.id === activeMenu)?.icon; return <Icon className="w-6 h-6 text-neutral-500" />; })()
                  }
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Módulo em Desenvolvimento</h3>
                <p className="text-sm text-neutral-400 max-w-sm mb-6">
                  Esta área ainda não está conectada na fase atual do protótipo. 
                  O modelo visual e relatórios estarão disponíveis na próxima etapa.
                </p>
                <button className="px-4 py-2 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-colors">
                  Notificar quando estiver pronto
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
