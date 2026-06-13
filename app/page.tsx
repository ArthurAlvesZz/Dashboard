'use client';

import { useState, useEffect } from 'react';
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
  Bell,
  Search,
  CheckCircle2,
  Zap
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
  { id: 'importar', label: 'Importar Planilha', icon: UploadCloud },
  { id: 'negocio', label: 'Custos da Empresa', icon: Wallet },
  { id: 'estoque', label: 'Fluxo de Estoque', icon: ArrowRightLeft },
  { id: 'custo_entrega', label: 'Auditoria de Fretes', icon: Map },
  { id: 'relatorios', label: 'Relatórios Visuais', icon: FileText },
  { id: 'equipe', label: 'Configurações', icon: Settings },
];

export default function SantaBronxOps() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [selectedDate, setSelectedDate] = useState(dateFilters[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Persistence for sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('santa-bronx-sidebar-collapsed');
    if (savedState) {
      setIsSidebarCollapsed(savedState === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    localStorage.setItem('santa-bronx-sidebar-collapsed', (!isSidebarCollapsed).toString());
  };

  return (
    <div className="flex h-[100dvh] bg-background text-foreground overflow-hidden font-sans">
      {/* Desktop Sidebar Rail */}
      <aside 
        className={cn(
          "hidden lg:flex border-r border-border bg-card flex-col shrink-0 z-20 transition-all duration-300 ease-in-out relative",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <button 
           onClick={toggleSidebar}
           className="absolute -right-3 top-6 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent z-30 transition-colors shadow-sm"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform duration-300", isSidebarCollapsed ? "rotate-180" : "")}>
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="h-16 flex items-center px-4 border-b border-border w-full shrink-0 overflow-hidden">
           <div className="flex items-center gap-3 w-full">
             <div className="w-8 h-8 shrink-0 bg-primary/10 border border-primary/20 text-primary rounded-lg flex items-center justify-center shadow-sm">
               <Zap className="w-4 h-4" />
             </div>
             <div className={cn("flex flex-col whitespace-nowrap transition-opacity duration-300", isSidebarCollapsed ? "opacity-0 invisible w-0" : "opacity-100 visible")}>
                <span className="font-sans font-semibold text-sm tracking-tight text-foreground leading-tight">Santa Bronx</span>
                <span className="text-[10px] uppercase tracking-widest text-primary font-medium font-mono">Operations</span>
             </div>
           </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar overflow-x-hidden">
          {MENUS.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeMenu === menu.id;
            return (
              <button
                key={menu.id}
                title={isSidebarCollapsed ? menu.label : undefined}
                onClick={() => setActiveMenu(menu.id)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg text-sm transition-all relative group",
                  isSidebarCollapsed ? "px-0 justify-center h-10" : "px-3 py-2.5",
                  isActive 
                    ? "text-primary font-medium bg-primary/10" 
                    : "text-muted-foreground font-normal hover:bg-accent hover:text-foreground"
                )}
              >
                {isActive && (
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
                )}
                <Icon className={cn("w-[18px] h-[18px] shrink-0 transition-colors group-hover:scale-110", isActive ? "text-primary scale-110" : "text-muted-foreground")} />
                <span className={cn("truncate whitespace-nowrap transition-all duration-300", isSidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>{menu.label}</span>
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 w-full border-t border-border bg-card mt-auto flex justify-center shrink-0">
          <div className={cn("flex w-full items-center rounded-lg hover:bg-accent transition-colors cursor-pointer", isSidebarCollapsed ? "justify-center px-0 py-2" : "gap-3 px-2 py-2")}>
            <div className="w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground shrink-0">
              AF
            </div>
            <div className={cn("flex flex-col text-left overflow-hidden transition-all duration-300", isSidebarCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
              <span className="text-sm font-medium text-foreground leading-tight truncate">Arthur Alves</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 truncate">Administrador</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background relative">
        {/* Topbar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 sm:px-6 shrink-0 bg-background/80 backdrop-blur-xl relative z-10 w-full overflow-x-auto gap-4 custom-scrollbar">
          <div className="flex items-center gap-3 w-full max-w-md">
            <button 
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            
            <div className="relative w-full sm:w-80 hidden sm:block group">
              <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
              <input 
                 type="text" 
                 placeholder="Buscar transações, pedidos ou faturas..." 
                 className="w-full h-9 bg-card border border-border shadow-sm rounded-lg pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                 <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-muted border border-border px-1.5 font-sans text-[10px] font-medium text-muted-foreground">
                   <span className="text-xs">⌘</span>K
                 </kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
             <div className="hidden lg:flex items-center gap-2 mr-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">Sistemas Operacionais</span>
             </div>

             <div className="h-6 w-px bg-border mx-1 hidden sm:block"></div>

            {/* Store Selector */}
            <div className="relative group">
              <button className="flex items-center justify-center sm:justify-start gap-2 h-8 px-2 sm:px-3 rounded-md hover:bg-accent border border-transparent transition-colors cursor-pointer text-muted-foreground hover:text-foreground">
                <Store className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline-block">
                  {stores.find(s => s.id === selectedStore)?.name?.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 opacity-50 hidden sm:block" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                 <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50 bg-muted/20">Selecione a Filial</div>
                 {stores.map(store => (
                   <div 
                     key={store.id} 
                     onClick={() => setSelectedStore(store.id)}
                     className={cn(
                       "px-4 py-2 text-sm cursor-pointer hover:bg-accent text-foreground transition-colors flex items-center justify-between",
                       selectedStore === store.id ? "bg-accent font-medium text-primary" : ""
                     )}
                   >
                     {store.name}
                     {selectedStore === store.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                   </div>
                 ))}
              </div>
            </div>

            {/* Date Filter */}
            <div className="relative group">
              <button className="flex items-center justify-center sm:justify-start gap-2 h-8 px-2 sm:px-3 rounded-md hover:bg-accent border border-transparent transition-colors cursor-pointer text-muted-foreground hover:text-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline-block">
                  {dateFilters.find(d => d.id === selectedDate)?.name}
                </span>
                <ChevronDown className="w-3 h-3 opacity-50 hidden sm:block" />
              </button>
               <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                 <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/50 bg-muted/20">Período</div>
                 {dateFilters.map(df => (
                   <div 
                     key={df.id} 
                     onClick={() => setSelectedDate(df.id)}
                     className={cn(
                       "px-4 py-2 text-sm cursor-pointer hover:bg-accent text-foreground transition-colors flex items-center justify-between",
                       selectedDate === df.id ? "bg-accent font-medium text-primary" : ""
                     )}
                   >
                     {df.name}
                     {selectedDate === df.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                   </div>
                 ))}
              </div>
            </div>
            
            <button className="relative h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ml-1">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border-2 border-background"></span>
            </button>
          </div>
        </header>

        {/* View rendering */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background custom-scrollbar">
          <div className="mx-auto space-y-6">
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
            className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[280px] bg-card border-r border-border shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-20 flex items-center justify-between px-6 border-b border-border relative overflow-hidden">
               <div className="flex items-center">
                 <div className="w-9 h-9 bg-primary/10 border border-primary/20 text-primary rounded-lg flex items-center justify-center mr-3 shadow-sm relative z-10">
                   <Zap className="w-5 h-5" />
                 </div>
                 <div className="flex flex-col relative z-10">
                    <span className="font-sans font-semibold text-base tracking-tight text-foreground leading-tight">Santa Bronx</span>
                    <span className="text-[10px] uppercase tracking-widest text-primary font-medium font-mono">Operations</span>
                 </div>
               </div>
               <button 
                  className="p-2 -mr-2 text-muted-foreground hover:text-foreground"
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
                        ? "text-primary font-medium bg-primary/10" 
                        : "text-muted-foreground font-normal hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {isActive && (
                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full shadow-[0_0_8px_rgba(236,72,153,0.5)]"></div>
                    )}
                    <Icon className={cn("w-[18px] h-[18px] transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
                    {menu.label}
                  </button>
                )
              })}
            </nav>
            
            <div className="p-4 w-full border-t border-border bg-card">
              <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground">
                  AF
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-foreground leading-tight">Arthur Alves</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Administrador</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
