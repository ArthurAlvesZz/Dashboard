import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockSales } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Filter, Download, ExternalLink, ArrowRight, Package, AlertCircle, ShoppingCart, DollarSign, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Drawer } from '@/components/ui/Drawer';

export function SalesView() {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockSales[0] | null>(null);
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-foreground">Gestão de Vendas</h1>
           <p className="text-sm font-medium text-muted-foreground mt-0.5">Auditoria contábil completa pedido a pedido.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-md hover:bg-primary/90 transition-transform active:scale-95 shadow-sm shrink-0">
          <Download className="w-4 h-4" /> Exportar Financeiro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <OpKPIBox title="Vendas Hoje" value={formatCurrency(14500)} icon={ShoppingCart} color="text-foreground" bgColor="bg-muted" colorBorder="border-border" />
        <OpKPIBox title="Lucro Líquido" value={formatCurrency(4250)} icon={DollarSign} color="text-emerald-500" bgColor="bg-emerald-500/10" colorBorder="border-emerald-500/20" />
        <OpKPIBox title="Margem Baixa (< 15%)" value="2" icon={TrendingDown} color="text-amber-500" bgColor="bg-amber-500/10" colorBorder="border-amber-500/20" />
        <OpKPIBox title="Sem Custo de Base" value="1" icon={AlertCircle} color="text-destructive" bgColor="bg-destructive/10" colorBorder="border-destructive/20" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
        {/* TABS HEADER */}
        <div className="flex items-center gap-1 p-1 bg-muted/30 border border-border rounded-lg shadow-sm overflow-x-auto w-full sm:w-auto">
           {['Todos', 'Pagos', 'Em Transporte', 'Margem Baixa', 'Custo Pendente'].map((tab) => {
             const key = tab.toLowerCase().replace(' ', '_');
             return (
              <button 
                key={tab}
                onClick={() => setActiveTab(key)}
                className={cn("px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap", activeTab === key ? "bg-card border border-border shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
              >
                {tab}
              </button>
             )
           })}
        </div>

        <div className="relative w-full sm:w-64 group shrink-0">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar pedido..." 
            className="w-full bg-card border border-border shadow-sm rounded-md pl-9 pr-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden mt-2">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10 w-full custom-scrollbar">
          <table className="w-full text-left font-sans text-sm min-w-[950px]">
            <thead className="bg-muted/20 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">ID / Data</th>
                <th className="px-6 py-4 font-semibold">Cliente Oficial</th>
                <th className="px-6 py-4 font-semibold text-right">Liquidez (Recibo)</th>
                <th className="px-6 py-4 font-semibold text-right">Deduções (Taxa, CMV, Frete)</th>
                <th className="px-6 py-4 font-semibold text-right">Lucratividade</th>
                <th className="px-6 py-4 font-semibold text-center">Status</th>
                <th className="px-4 py-4 font-semibold text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockSales.map((order, idx) => {
                let statusColor = "bg-muted/50 text-muted-foreground border-border";
                let statusLabel = order.status;

                if (order.status === 'entregue') {
                  statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                  statusLabel = "Entregue";
                } else if (order.status === 'em_transito') {
                  statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                  statusLabel = "Em Trânsito";
                } else if (order.status === 'processando') {
                  statusColor = "bg-primary/10 text-primary border-primary/20";
                  statusLabel = "Preparo";
                }

                // Simulate bad margin alert
                const badMargin = idx === 1;

                const totalCosts = order.productCost + order.deliveryCost + order.fee;

                return (
                  <tr key={order.id} className={cn("transition-colors group cursor-pointer", badMargin ? "bg-amber-500/5 hover:bg-amber-500/10" : "hover:bg-muted/40")} onClick={() => setSelectedOrder(order)}>
                    <td className="px-6 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[13px] font-bold tracking-tight text-foreground uppercase group-hover:text-primary transition-colors flex items-center gap-2">
                           {order.id}
                           {badMargin && <AlertCircle className="w-3.5 h-3.5 text-amber-500" title="Aviso de Margem Aperta" />}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground">{format(new Date(order.date), "dd/MM/yy HH:mm", { locale: ptBR })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                       <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-[13px] text-foreground tracking-tight">{order.customer}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                           <span className="text-[9px] uppercase tracking-wider font-bold bg-muted border border-border px-1.5 py-0.5 rounded text-muted-foreground shadow-sm">{order.paymentMethod}</span>
                           <span className="text-[10px] font-medium text-muted-foreground">{order.store}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <div className="flex flex-col items-end gap-0.5">
                        <span className="font-mono text-[13px] font-bold text-foreground tabular-nums">{formatCurrency(order.netTotal)}</span>
                        <span className="font-mono text-[10px] text-muted-foreground tabular-nums opacity-60 line-through decoration-muted-foreground decoration-1" title="Bruto Cliente">{formatCurrency(order.total)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <div className="flex flex-col items-end gap-0.5">
                        <span className="font-mono text-[13px] font-semibold text-destructive tabular-nums">-{formatCurrency(totalCosts)}</span>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-muted-foreground">CMV: {formatCurrency(order.productCost)} | FRT: {formatCurrency(order.deliveryCost)}</span>
                      </div>
                    </td>
                     <td className="px-6 py-3 text-right relative">
                       <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                       <div className="flex flex-col items-end relative z-10">
                         <span className="font-mono text-[15px] font-bold text-emerald-500 tabular-nums">
                           {formatCurrency(order.profit)}
                         </span>
                         <span className={cn("text-[9px] font-bold uppercase tracking-widest", badMargin ? "text-amber-500" : "text-emerald-500/70")}>{badMargin ? 'Low Margin' : 'Margem Saudável'}</span>
                       </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border shadow-sm",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors group-hover:translate-x-1 duration-300 opacity-0 group-hover:opacity-100 shadow-sm border border-transparent group-hover:border-border">
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Auditoria do Pedido`}
      >
        {selectedOrder && (
           <div className="space-y-6 mt-2">
             <div className="flex items-center justify-between px-1">
                <div>
                   <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground uppercase">{selectedOrder.id}</h2>
                   <p className="text-sm font-medium text-muted-foreground mt-1">Lançamento oficial. <span className="font-mono">{format(new Date(selectedOrder.date), "dd/MM/yyyy • HH:mm", { locale: ptBR })}</span></p>
                </div>
                <span className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border shadow-sm",
                   selectedOrder.status === 'entregue' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                   selectedOrder.status === 'em_transito' ? "bg-sky-500/10 text-sky-500 border-sky-500/20" : 
                   "bg-primary/10 text-primary border-primary/20"
                )}>
                  {selectedOrder.status.replace('_', ' ')}
                </span>
             </div>

             <div className="p-5 bg-card rounded-xl border border-border shadow-sm flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ficha de Cliente</span>
                <span className="text-sm font-bold text-foreground">{selectedOrder.customer}</span>
                <span className="text-sm font-medium text-muted-foreground">{selectedOrder.store} - Via {selectedOrder.paymentMethod}</span>
             </div>

             <div className="space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-1 border-b border-border pb-2">Composição do Pedido (Produtos)</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: { sku: string; qty: number; price: number; cost: number }, i: number) => (
                    <div key={i} className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-foreground tabular-nums">{item.qty}x</span>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{item.sku}</span>
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground">Custo Reposição: {formatCurrency(item.cost)}</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-sm font-bold text-foreground tabular-nums">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-card border border-border rounded-xl p-6 space-y-4 mt-8 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/50 pb-2 mb-2 relative z-10">Demonstrativo de Resultado (Pedido)</h3>
                
                <div className="flex justify-between items-center text-sm relative z-10">
                  <span className="text-foreground font-medium">Bruto Faturado do Cliente</span>
                  <span className="font-mono text-foreground font-bold tabular-nums relative z-10">{formatCurrency(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between items-center text-sm relative z-10">
                  <span className="text-muted-foreground">Gateway / Taxa ({selectedOrder.paymentMethod})</span>
                  <span className="font-mono text-destructive font-medium tabular-nums">-{formatCurrency(selectedOrder.fee)}</span>
                </div>
                 <div className="flex justify-between items-center text-sm relative z-10">
                  <span className="text-muted-foreground">Custo Médio Identificado (CMV)</span>
                  <span className="font-mono text-destructive font-medium tabular-nums">-{formatCurrency(selectedOrder.productCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm relative z-10">
                  <span className="text-muted-foreground">Absorção Frete / Embalagem</span>
                  <span className="font-mono text-destructive font-medium tabular-nums">-{formatCurrency(selectedOrder.deliveryCost)}</span>
                </div>
                
                <div className="h-px bg-border/80 my-4 relative z-10" />
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground">Lucratividade Líquida</span>
                  <span className="font-mono text-2xl font-bold text-emerald-500 tabular-nums">{formatCurrency(selectedOrder.profit)}</span>
                </div>
             </div>
           </div>
        )}
      </Drawer>
    </div>
  );
}

function OpKPIBox({ title, value, icon: Icon, color, bgColor, colorBorder }: any) {
   return (
    <Card className="bg-card border-border shadow-sm group hover:border-border/80 transition-colors">
      <CardContent className="p-5 flex items-center gap-4">
         <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border shadow-sm shrink-0", bgColor, colorBorder, color)}>
            <Icon className="w-5 h-5" />
         </div>
         <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{title}</span>
            <span className="font-mono text-xl font-bold tracking-tight text-foreground tabular-nums">{value}</span>
         </div>
      </CardContent>
    </Card>
   )
}
