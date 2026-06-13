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
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-pink-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar ID do pedido, cliente, nota..." 
            className="w-full bg-[#0a0a0a] border border-neutral-900 rounded-lg pl-10 pr-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-pink-500/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] placeholder:text-neutral-600 font-mono"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-neutral-900 text-neutral-400 text-[11px] uppercase tracking-widest font-mono font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-all shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-transparent text-black text-[11px] uppercase tracking-widest font-mono font-medium rounded-lg hover:bg-neutral-200 transition-transform active:scale-95 shadow-lg shrink-0">
            <Download className="w-3.5 h-3.5" />
            Exportar
          </button>
        </div>
      </div>

      <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-[#121212]/50 border-b border-neutral-900 text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-mono">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">ID Pedido / Data</th>
                <th className="px-6 py-4 font-medium">Cliente / Canal</th>
                <th className="px-6 py-4 font-medium text-right">Liquidez (Recebido)</th>
                <th className="px-6 py-4 font-medium text-right">Abatimento (CMV+Frete)</th>
                <th className="px-6 py-4 font-medium text-right">Lucro Estimado</th>
                <th className="px-6 py-4 font-medium text-right">Status Operacional</th>
                <th className="px-5 py-4 font-medium text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/50 text-neutral-300">
              {mockSales.map((order) => {
                let statusColor = "bg-neutral-900 text-neutral-500 border-neutral-800/80";
                let statusLabel = order.status;

                if (order.status === 'entregue') {
                  statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                  statusLabel = "Finalizado";
                } else if (order.status === 'em_transito') {
                  statusColor = "bg-sky-500/10 text-sky-400 border-sky-500/20";
                  statusLabel = "Em Transporte";
                } else if (order.status === 'processando') {
                  statusColor = "bg-pink-500/10 text-pink-500 border-pink-500/20";
                  statusLabel = "Em Preparo";
                }

                const totalCosts = order.productCost + order.deliveryCost;

                return (
                  <tr key={order.id} className="hover:bg-[#121212] transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[13px] tracking-widest text-neutral-100 uppercase group-hover:text-pink-400 transition-colors">{order.id}</span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500">{format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-[13px] text-white tracking-wide">{order.customer}</span>
                        <div className="flex items-center gap-1.5 mt-1">
                           <span className="text-[9px] uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{order.paymentMethod}</span>
                           <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{order.store}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end gap-0.5">
                        <span className="font-mono text-[13px] text-neutral-200 tabular-nums">{formatCurrency(order.netTotal)}</span>
                        {order.fee > 0 && <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 mt-1 bg-neutral-900/50 px-1.5 py-0.5 rounded">Taxada: {formatCurrency(order.fee)}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end gap-0.5">
                        <span className="font-mono text-[13px] text-red-400 tracking-tight tabular-nums">-{formatCurrency(totalCosts)}</span>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-500 mt-1">Produto: <span className="font-mono">{formatCurrency(order.productCost)}</span></span>
                      </div>
                    </td>
                     <td className="px-6 py-4 text-right relative">
                       <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                       <span className="font-mono text-[14px] text-emerald-400 tracking-tight font-medium tabular-nums relative z-10">
                         {formatCurrency(order.profit)}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded text-[9px] font-mono font-medium tracking-widest uppercase border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-2 text-neutral-600 hover:text-white rounded-md hover:bg-neutral-800 transition-colors group-hover:translate-x-1 duration-300">
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
        title={`Detalhes do ${selectedOrder?.id}`}
      >
        {selectedOrder && (
           <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4 p-5 bg-[#0a0a0a] rounded-xl border border-neutral-900 mb-6 shadow-inner">
               <div>
                 <span className="block text-[9px] uppercase font-mono tracking-widest text-neutral-500 mb-1">Cliente Solicitante</span>
                 <span className="text-[13px] font-medium text-white tracking-wide">{selectedOrder.customer}</span>
               </div>
               <div>
                 <span className="block text-[9px] uppercase font-mono tracking-widest text-neutral-500 mb-1">Status Base</span>
                 <span className="text-[12px] font-medium text-emerald-400 tracking-wide uppercase">{selectedOrder.status}</span>
               </div>
               <div>
                 <span className="block text-[9px] uppercase font-mono tracking-widest text-neutral-500 mb-1">Origem do Cadastro</span>
                 <span className="text-[12px] font-medium text-white uppercase tracking-wider">{selectedOrder.store}</span>
               </div>
                <div>
                 <span className="block text-[9px] uppercase font-mono tracking-widest text-neutral-500 mb-1">Fechamento</span>
                 <span className="text-[12px] font-mono tracking-widest text-neutral-300">{format(new Date(selectedOrder.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
               </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2 px-1 border-b border-neutral-900 pb-2">
                  <Package className="w-3.5 h-3.5 text-pink-500" />
                  Grade de Faturamento
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: { sku: string; qty: number; price: number; cost: number }, i: number) => (
                    <div key={i} className="bg-[#050505] border border-neutral-900 p-4 rounded-lg flex items-center justify-between shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-neutral-200 uppercase tracking-widest">{item.qty}x</span>
                          <span className="text-[12px] font-mono text-pink-400 tracking-wider bg-pink-500/10 px-2 py-0.5 rounded">{item.sku}</span>
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-600 mt-1">Custo base: <span className="text-neutral-400">{formatCurrency(item.cost)}</span></span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-sm text-white tracking-tight tabular-nums">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-[#121212] border border-neutral-900 rounded-xl p-6 space-y-4 mt-8 shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 relative z-10">Lançamento Bruto (Cliente)</span>
                  <span className="font-mono text-white text-sm tabular-nums relative z-10">{formatCurrency(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between items-center text-xs relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Taxas ({selectedOrder.paymentMethod})</span>
                  <span className="font-mono text-red-400 tabular-nums">-{formatCurrency(selectedOrder.fee)}</span>
                </div>
                 <div className="flex justify-between items-center text-xs relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Despesa Mercadoria (CMV)</span>
                  <span className="font-mono text-red-400 tabular-nums">-{formatCurrency(selectedOrder.productCost)}</span>
                </div>
                <div className="flex justify-between items-center text-xs relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">Despesa Operador Lógico</span>
                  <span className="font-mono text-red-400 tabular-nums">-{formatCurrency(selectedOrder.deliveryCost)}</span>
                </div>
                <div className="h-px bg-neutral-800/80 my-3 relative z-10" />
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[11px] font-mono font-medium uppercase tracking-widest text-white">Consolidação de Lucro</span>
                  <span className="font-mono text-xl text-emerald-400 tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">{formatCurrency(selectedOrder.profit)}</span>
                </div>
             </div>
           </div>
        )}
      </Drawer>
    </div>
  );
}
