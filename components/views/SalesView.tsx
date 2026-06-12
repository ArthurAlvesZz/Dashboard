import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockSales } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Filter, Download, ExternalLink, ArrowRight, Package } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Drawer } from '@/components/ui/Drawer';

export function SalesView() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Buscar pedido, cliente..." 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 transition-colors placeholder:text-neutral-600"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-medium whitespace-nowrap">ID Pedido / Data</th>
                <th className="px-5 py-4 font-medium">Cliente / Pagamento</th>
                <th className="px-5 py-4 font-medium text-right">Total Recebido</th>
                <th className="px-5 py-4 font-medium text-right">Custos (CMV+Frete)</th>
                <th className="px-5 py-4 font-medium text-right">Lucro Estimado</th>
                <th className="px-5 py-4 font-medium text-right">Status</th>
                <th className="px-5 py-4 font-medium text-right w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {mockSales.map((order) => {
                let statusColor = "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
                let statusLabel = order.status;

                if (order.status === 'entregue') {
                  statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                  statusLabel = "Entregue";
                } else if (order.status === 'em_transito') {
                  statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                  statusLabel = "Em Trânsito";
                } else if (order.status === 'processando') {
                  statusColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                  statusLabel = "Processando";
                }

                const totalCosts = order.productCost + order.deliveryCost;

                return (
                  <tr key={order.id} className="hover:bg-neutral-900/50 transition-colors group cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                        <span className="font-mono text-sm tracking-tight text-white mb-0.5">{order.id}</span>
                        <span className="text-[11px] text-neutral-500">{format(new Date(order.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                       <div className="flex flex-col">
                        <span className="font-medium text-white mb-0.5">{order.customer}</span>
                        <span className="text-[11px] text-neutral-500">{order.paymentMethod} • {order.store}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                       <div className="flex flex-col items-end">
                        <span className="font-mono text-sm text-white tracking-tight">{formatCurrency(order.netTotal)}</span>
                        {order.fee > 0 && <span className="text-[10px] text-neutral-500 mt-0.5">Taxa de {formatCurrency(order.fee)} abatida</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                       <div className="flex flex-col items-end">
                        <span className="font-mono text-sm text-red-400 tracking-tight">-{formatCurrency(totalCosts)}</span>
                        <span className="text-[10px] text-neutral-500 mt-0.5">CMV: {formatCurrency(order.productCost)}</span>
                      </div>
                    </td>
                     <td className="px-5 py-3 text-right">
                       <span className="font-mono text-sm text-emerald-400 tracking-tight font-medium">
                         {formatCurrency(order.profit)}
                       </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="text-neutral-600 hover:text-white transition-colors">
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
             <div className="grid grid-cols-2 gap-4 pb-6 border-b border-neutral-800">
               <div>
                 <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Cliente</span>
                 <span className="text-sm font-medium text-white">{selectedOrder.customer}</span>
               </div>
               <div>
                 <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Status</span>
                 <span className="text-sm font-medium text-emerald-400">{selectedOrder.status}</span>
               </div>
               <div>
                 <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Loja Origem</span>
                 <span className="text-sm font-medium text-white">{selectedOrder.store}</span>
               </div>
                <div>
                 <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Data</span>
                 <span className="text-sm text-neutral-300">{format(new Date(selectedOrder.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
               </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <Package className="w-4 h-4 text-neutral-500" />
                  Itens Faturados
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-neutral-200">{item.qty}x {item.sku}</span>
                        <span className="text-xs text-neutral-500 mt-1">Custo unitário congelado: {formatCurrency(item.cost)}</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-sm text-white">{formatCurrency(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 space-y-3 mt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Total Pago pelo Cliente</span>
                  <span className="font-mono text-white">{formatCurrency(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-neutral-400">
                  <span>Taxas ({selectedOrder.paymentMethod})</span>
                  <span className="font-mono text-red-400">-{formatCurrency(selectedOrder.fee)}</span>
                </div>
                 <div className="flex justify-between items-center text-sm text-neutral-400">
                  <span>Custo dos Produtos (CMV)</span>
                  <span className="font-mono text-red-400">-{formatCurrency(selectedOrder.productCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-neutral-400">
                  <span>Custo com Frete</span>
                  <span className="font-mono text-red-400">-{formatCurrency(selectedOrder.deliveryCost)}</span>
                </div>
                <div className="h-px bg-neutral-800 my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">Lucro Estimado Operação</span>
                  <span className="font-mono text-lg text-emerald-400 font-semibold">{formatCurrency(selectedOrder.profit)}</span>
                </div>
             </div>
           </div>
        )}
      </Drawer>
    </div>
  );
}
