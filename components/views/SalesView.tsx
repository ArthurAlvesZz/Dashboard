import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockRecentOrders } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Filter, Download, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function SalesView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Buscar pedido, cliente..." 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 transition-colors"
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
        <CardHeader className="border-b border-neutral-800 flex flex-row items-center justify-between py-4">
          <CardTitle>Últimos Pedidos</CardTitle>
          <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">{mockRecentOrders.length} registros</span>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
              <tr>
                <th className="px-6 py-3 font-medium whitespace-nowrap">ID Pedido</th>
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Data e Hora</th>
                <th className="px-6 py-3 font-medium">Loja</th>
                <th className="px-6 py-3 font-medium text-right">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {mockRecentOrders.map((order) => {
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
                } else if (order.status === 'pagamento_pendente') {
                  statusColor = "bg-red-500/10 text-red-500 border-red-500/20";
                  statusLabel = "Pgto. Pendente";
                }

                return (
                  <tr key={order.id} className="hover:bg-neutral-900/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-neutral-400 tabular-nums">
                      {format(new Date(order.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </td>
                    <td className="px-6 py-4">
                      {order.store}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-right">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium tracking-wide uppercase border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-neutral-500 hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
