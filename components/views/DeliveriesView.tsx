'use client';
import { useState, useMemo } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { mockDeliveries } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

export function DeliveriesView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = mockDeliveries;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(d => d.id.toLowerCase().includes(q) || d.customer.toLowerCase().includes(q) || d.tracking.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') data = data.filter(d => d.status === statusFilter);
    return data;
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / 20);
  const paginated = filtered.slice((page - 1) * 20, page * 20);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Entregas e Logística</h2>
          <p className="text-muted-foreground">Gestão de envios, rastreamento e prazos com transportadoras ou motoboys.</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar por cliente, pedido ou rastreio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">Todas as Situações</option>
            <option value="entregue">Entregue</option>
            <option value="em_transito">Em Trânsito</option>
            <option value="processando">Em Separação</option>
            <option value="preparando">Aguardando Coleta</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Pedido</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Motoboy/Transportadora</th>
                <th className="px-4 py-3 font-medium">Rastreio</th>
                <th className="px-4 py-3 font-medium">Prazo</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Custo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map(delivery => (
                <tr key={delivery.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{delivery.id}</td>
                  <td className="px-4 py-3 font-medium">{delivery.customer}</td>
                  <td className="px-4 py-3">{delivery.carrier}</td>
                  <td className="px-4 py-3 font-mono text-xs">{(delivery.tracking !== 'N/A' && delivery.tracking) ? delivery.tracking : '-'}</td>
                  <td className="px-4 py-3">{delivery.deadline}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(delivery.status)}`}>
                      {getStatusLabel(delivery.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(delivery.cost)}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Nenhuma entrega encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="p-4 border-t border-border flex justify-between items-center bg-muted/20">
            <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 bg-background border border-border rounded disabled:opacity-50 hover:bg-muted transition-colors text-sm">Anterior</button>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 bg-background border border-border rounded disabled:opacity-50 hover:bg-muted transition-colors text-sm">Próxima</button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
