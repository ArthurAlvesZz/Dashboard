'use client';
import { useState, useMemo } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { mockDeliveryCosts, filterByStore } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, AlertCircle, Truck, Package } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

export function DeliveryCostView() {
  const { selectedStore } = useStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedCost, setSelectedCost] = useState<any | null>(null);

  const filtered = useMemo(() => {
    let data = filterByStore(mockDeliveryCosts, selectedStore);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(d => d.order.toLowerCase().includes(q) || d.method.toLowerCase().includes(q) || d.saleId.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') data = data.filter(d => d.status === statusFilter);
    return data;
  }, [search, statusFilter, selectedStore]);

  const totalPages = Math.ceil(filtered.length / 20);
  const paginated = filtered.slice((page - 1) * 20, page * 20);

  // Dynamic KPIs calculate from filtered data
  const totalEntregas = filtered.length;
  const custoTotalReal = filtered.reduce((a, c) => a + c.realCost, 0);
  const custoTotalEstimado = filtered.reduce((a, c) => a + c.charged, 0);
  const discrepanciaTotal = custoTotalReal - custoTotalEstimado;
  const entregasDivergentes = filtered.filter(c => c.realCost > c.charged).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Auditoria de Fretes</h2>
        <p className="text-muted-foreground">Revisão e conciliação de custos de entrega e transportadoras.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregas no Período</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">{totalEntregas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custo Real Consolidado</CardTitle>
            <Truck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold text-emerald-500">{formatCurrency(custoTotalReal)}</div>
             <p className="text-xs text-muted-foreground">Est: {formatCurrency(custoTotalEstimado)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Discrepância Total</CardTitle>
            <AlertCircle className={discrepanciaTotal > 0 ? "h-4 w-4 text-destructive" : "h-4 w-4 text-emerald-500"} />
          </CardHeader>
          <CardContent>
             <div className={`text-2xl font-bold ${discrepanciaTotal > 0 ? "text-destructive" : "text-emerald-500"}`}>
                {discrepanciaTotal > 0 ? '+' : ''}{formatCurrency(discrepanciaTotal)}
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fretes Divergentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold text-amber-500">{entregasDivergentes}</div>
             <p className="text-xs text-muted-foreground">{totalEntregas > 0 ? ((entregasDivergentes / totalEntregas) * 100).toFixed(1) : 0}% dos envios</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar por ID, rastreio ou transportadora..."
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
            <option value="auditado">Auditado</option>
            <option value="pendente">Pendente</option>
            <option value="divergente">Divergente</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">ID Entrega</th>
                <th className="px-4 py-3 font-medium">Transportadora</th>
                <th className="px-4 py-3 font-medium">Rastreio</th>
                <th className="px-4 py-3 font-medium text-right">Custo Est.</th>
                <th className="px-4 py-3 font-medium text-right">Custo Real</th>
                <th className="px-4 py-3 font-medium text-right">Diferença</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map(cost => {
                 const diferenca = cost.realCost - cost.charged;
                 return (
                <tr key={cost.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedCost(cost)}>
                  <td className="px-4 py-3 font-mono text-xs">{cost.order}</td>
                  <td className="px-4 py-3 font-medium">{cost.method}</td>
                  <td className="px-4 py-3 font-mono text-xs">{cost.saleId}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(cost.charged)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(cost.realCost)}</td>
                  <td className={`px-4 py-3 text-right font-bold ${diferenca > 0 ? "text-destructive" : (diferenca < 0 ? "text-emerald-500" : "text-muted-foreground")}`}>
                     {diferenca > 0 ? '+' : ''}{formatCurrency(diferenca)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(cost.status)}`}>
                      {getStatusLabel(cost.status)}
                    </span>
                  </td>
                </tr>
              )})}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Nenhum custo encontrado.</td>
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

      <Drawer isOpen={!!selectedCost} onClose={() => setSelectedCost(null)} title={`Auditoria: ${selectedCost?.order}`}>
        <div className="space-y-4">
           {selectedCost && (
             <div className="grid gap-4 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                   <span className="text-muted-foreground">Transportadora</span>
                   <span className="font-medium">{selectedCost.method}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                   <span className="text-muted-foreground">Rastreio</span>
                   <span className="font-mono text-xs">{selectedCost.saleId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                   <span className="text-muted-foreground">Custo Estimado</span>
                   <span>{formatCurrency(selectedCost.charged)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                   <span className="font-medium">Custo Real (Faturado)</span>
                   <span className="font-bold">{formatCurrency(selectedCost.realCost)}</span>
                </div>
                {selectedCost.realCost - selectedCost.charged !== 0 && (
                  <div className="flex justify-between py-2 rounded-md bg-muted/50 px-3 mt-2">
                     <span className="font-medium">Divergência</span>
                     <span className={`font-bold ${(selectedCost.realCost - selectedCost.charged) > 0 ? 'text-destructive' : 'text-emerald-500'}`}>
                       {(selectedCost.realCost - selectedCost.charged) > 0 ? '+' : ''}
                       {formatCurrency(selectedCost.realCost - selectedCost.charged)}
                     </span>
                  </div>
                )}
             </div>
           )}
        </div>
      </Drawer>
    </div>
  );
}
