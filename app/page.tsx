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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-neutral-900 bg-[#0a0a0a] flex-col shrink-0 z-20">
        <div className="h-20 flex items-center px-6 border-b border-neutral-900 relative overflow-hidden">
          {/* Subtle glow effect behind logo */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="w-9 h-9 bg-pink-600 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(219,39,119,0.4)]">
            <span className="text-white font-bold font-display text-lg tracking-tighter">SB</span>
          </div>
          <div className="flex flex-col">
             <span className="font-display font-semibold text-lg tracking-tight text-white leading-tight">Santa Bronx</span>
             <span className="text-[10px] uppercase tracking-widest text-pink-500 font-medium font-mono">Operations</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
          {MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenu(menu.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative group",
                  isActive 
                    ? "text-white font-medium bg-[#121212]" 
                    : "text-neutral-400 font-normal hover:bg-[#121212]/50 hover:text-neutral-200"
                )}
              >
                {/* Active Indicator Line */}
                {isActive && (
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-pink-500 rounded-r-full shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
                )}
                <Icon className={cn("w-[18px] h-[18px] transition-colors", isActive ? "text-pink-500" : "text-neutral-500 group-hover:text-neutral-400")} />
                {menu.label}
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-neutral-900 bg-[#0a0a0a]">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-neutral-900/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 text-pink-400 font-medium text-xs">
              AF
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-neutral-200 leading-tight">Arthur Alves</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">Administrador</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-neutral-950 relative">
        {/* Topbar */}
        <header className="h-16 border-b border-neutral-900 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-[#0a0a0a] relative z-10 w-full overflow-x-auto gap-4 custom-scrollbar">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <h1 className="text-base sm:text-lg font-medium font-sans tracking-tight text-white whitespace-nowrap">
              {MENUS.find(m => m.id === activeMenu)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
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

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden focus:outline-none">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[280px] bg-[#0a0a0a] border-r border-neutral-900 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-20 flex items-center justify-between px-6 border-b border-neutral-900 relative overflow-hidden">
               <div className="flex items-center">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                 <div className="w-9 h-9 bg-pink-600 rounded-lg flex items-center justify-center mr-3 shadow-[0_0_15px_rgba(219,39,119,0.4)] relative z-10">
                   <span className="text-white font-bold font-display text-lg tracking-tighter">SB</span>
                 </div>
                 <div className="flex flex-col relative z-10">
                    <span className="font-display font-semibold text-lg tracking-tight text-white leading-tight">Santa Bronx</span>
                 </div>
               </div>
               <button 
                  className="p-2 -mr-2 text-neutral-400 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 custom-scrollbar">
              {MENUS.map((menu) => {
                const Icon = menu.icon;
                const isActive = activeMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => {
                       setActiveMenu(menu.id);
                       setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-all relative group",
                      isActive 
                        ? "text-white font-medium bg-[#121212]" 
                        : "text-neutral-400 font-normal hover:bg-[#121212]/50 hover:text-neutral-200"
                    )}
                  >
                    {isActive && (
                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-pink-500 rounded-r-full shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
                    )}
                    <Icon className={cn("w-[18px] h-[18px] transition-colors", isActive ? "text-pink-500" : "text-neutral-500")} />
                    {menu.label}
                  </button>
                )
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
