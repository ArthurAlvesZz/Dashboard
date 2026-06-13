import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockSales } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Filter, Download, ExternalLink, ArrowRight, Package } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Drawer } from '@/components/ui/Drawer';

export function SalesView() {
  const [selectedOrder, setSelectedOrder] = useState<typeof mockSales[0] | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar ID do pedido, cliente, nota..." 
            className="w-full bg-card border border-border shadow-sm rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border shadow-sm text-foreground text-xs font-medium rounded-lg hover:bg-accent transition-all shrink-0">
            <Filter className="w-4 h-4 text-muted-foreground" />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-transform active:scale-95 shadow-sm shrink-0">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10 w-full">
          <table className="w-full text-left font-sans text-sm min-w-[800px]">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">ID Pedido / Data</th>
                <th className="px-6 py-4 font-medium">Cliente / Canal</th>
                <th className="px-6 py-4 font-medium text-right">Liquidez (Recebido)</th>
                <th className="px-6 py-4 font-medium text-right">Abatimento (CMV+Frete)</th>
                <th className="px-6 py-4 font-medium text-right">Lucro Estimado</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-5 py-4 font-medium text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockSales.map((order) => {
                let statusColor = "bg-muted/50 text-muted-foreground border-border";
                let statusLabel = order.status;

                if (order.status === 'entregue') {
                  statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                  statusLabel = "Finalizado";
                } else if (order.status === 'em_transito') {
                  statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                  statusLabel = "Em Transporte";
                } else if (order.status === 'processando') {
                  statusColor = "bg-primary/10 text-primary border-primary/20";
                  statusLabel = "Em Preparo";
                }

                const totalCosts = order.productCost + order.deliveryCost;

                return (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-sm tracking-tight text-foreground uppercase group-hover:text-primary transition-colors">{order.id}</span>
                        <span className="text-[11px] text-muted-foreground">{format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-sm text-foreground">{order.customer}</span>
                        <div className="flex items-center gap-1.5 mt-1">
                           <span className="text-[10px] bg-muted border border-border px-1.5 py-0.5 rounded text-muted-foreground font-medium">{order.paymentMethod}</span>
                           <span className="text-[11px] text-muted-foreground">{order.store}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-sm text-foreground tabular-nums">{formatCurrency(order.netTotal)}</span>
                        {order.fee > 0 && <span className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded border border-border/50">Taxa: {formatCurrency(order.fee)}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-sm text-destructive tabular-nums">-{formatCurrency(totalCosts)}</span>
                        <span className="text-[10px] text-muted-foreground">CMV: {formatCurrency(order.productCost)}</span>
                      </div>
                    </td>
                     <td className="px-6 py-4 text-right relative">
                       <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                       <span className="font-mono text-[15px] font-semibold text-emerald-500 tabular-nums relative z-10">
                         {formatCurrency(order.profit)}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors group-hover:translate-x-1 duration-300">
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
        title={`Detalhes do Pedido ${selectedOrder?.id}`}
      >
        {selectedOrder && (
           <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4 p-5 bg-muted/20 rounded-xl border border-border mb-6">
               <div>
                 <span className="block text-[11px] text-muted-foreground mb-1">Cliente Solicitante</span>
                 <span className="text-sm font-medium text-foreground">{selectedOrder.customer}</span>
               </div>
               <div>
                 <span className="block text-[11px] text-muted-foreground mb-1">Status Base</span>
                 <span className="text-sm font-medium text-emerald-500 capitalize">{selectedOrder.status.replace('_', ' ')}</span>
               </div>
               <div>
                 <span className="block text-[11px] text-muted-foreground mb-1">Origem do Cadastro</span>
                 <span className="text-sm font-medium text-foreground">{selectedOrder.store}</span>
               </div>
                <div>
                 <span className="block text-[11px] text-muted-foreground mb-1">Fechamento</span>
                 <span className="text-sm font-mono text-muted-foreground">{format(new Date(selectedOrder.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
               </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 px-1 border-b border-border pb-2">
                  <Package className="w-4 h-4 text-primary" />
                  Grade de Faturamento
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: { sku: string; qty: number; price: number; cost: number }, i: number) => (
                    <div key={i} className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-semibold text-foreground">{item.qty}x</span>
                          <span className="text-[11px] font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/10">{item.sku}</span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">Custo unitário: {formatCurrency(item.cost)}</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-sm font-medium text-foreground tabular-nums">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-card border border-border rounded-xl p-6 space-y-4 mt-8 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground relative z-10">Lançamento Bruto (Cliente)</span>
                  <span className="font-mono text-foreground font-medium tabular-nums relative z-10">{formatCurrency(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between items-center text-sm relative z-10">
                  <span className="text-muted-foreground">Taxas ({selectedOrder.paymentMethod})</span>
                  <span className="font-mono text-destructive tabular-nums">-{formatCurrency(selectedOrder.fee)}</span>
                </div>
                 <div className="flex justify-between items-center text-sm relative z-10">
                  <span className="text-muted-foreground">Despesa Mercadoria (CMV)</span>
                  <span className="font-mono text-destructive tabular-nums">-{formatCurrency(selectedOrder.productCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm relative z-10">
                  <span className="text-muted-foreground">Despesa Logística (Frete)</span>
                  <span className="font-mono text-destructive tabular-nums">-{formatCurrency(selectedOrder.deliveryCost)}</span>
                </div>
                <div className="h-px bg-border my-3 relative z-10" />
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-sm font-semibold text-foreground">Consolidação de Lucro</span>
                  <span className="font-mono text-xl font-bold text-emerald-500 tabular-nums">{formatCurrency(selectedOrder.profit)}</span>
                </div>
             </div>
           </div>
        )}
      </Drawer>
    </div>
  );
}
