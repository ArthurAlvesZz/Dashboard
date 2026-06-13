'use client';
import { useState, useMemo } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { mockSales, filterByStore, filterByDate } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel, getPaymentLabel } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Download, ExternalLink, ArrowRight, Package } from 'lucide-react';
import { format } from 'date-fns';
import { Drawer } from '@/components/ui/Drawer';
import * as XLSX from 'xlsx';

export function SalesView() {
  const { selectedStore, getDateRange } = useStore();
  const range = getDateRange();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const filtered = useMemo(() => {
    let data = filterByDate(filterByStore(mockSales, selectedStore), range.from, range.to);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      data = data.filter(s => s.id.toLowerCase().includes(q) || s.customer.toLowerCase().includes(q) || s.store.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') data = data.filter(s => s.status === statusFilter);
    return data;
  }, [selectedStore, range.from, range.to, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filtered.length / 20);
  const paginated = filtered.slice((page - 1) * 20, page * 20);

  // Métricas
  const totalReceita = filtered.reduce((a, s) => a + s.netTotal, 0);
  const totalLucro = filtered.reduce((a, s) => a + s.profit, 0);
  const ticketMedio = filtered.length > 0 ? totalReceita / filtered.length : 0;

  const exportToXLSX = () => {
    const data = filtered.map(s => ({
      ID: s.id, Cliente: s.customer, Data: format(new Date(s.date), 'dd/MM/yyyy'),
      Loja: s.store, Pagamento: s.paymentMethod, Total: s.total,
      'Receita Líquida': s.netTotal, 'Custo Produto': s.productCost,
      'Custo Entrega': s.deliveryCost, Lucro: s.profit, Status: s.status,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vendas');
    XLSX.writeFile(wb, `vendas_santa_bronx_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pedidos e Vendas</h2>
          <p className="text-muted-foreground">Acompanhe todos os pedidos realizados no período.</p>
        </div>
        <button
          onClick={exportToXLSX}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar XLSX
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
             <div className="text-sm font-medium text-muted-foreground">Receita Líquida</div>
             <div className="text-2xl font-bold mt-1 text-emerald-500">{formatCurrency(totalReceita)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
             <div className="text-sm font-medium text-muted-foreground">Ticket Médio</div>
             <div className="text-2xl font-bold mt-1">{formatCurrency(ticketMedio)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
             <div className="text-sm font-medium text-muted-foreground">Lucro Total</div>
             <div className="text-2xl font-bold mt-1 text-emerald-500">{formatCurrency(totalLucro)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar por cliente ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="all">Todos os Status</option>
            <option value="entregue">Entregue</option>
            <option value="em_transito">Em Trânsito</option>
            <option value="processando">Processando</option>
            <option value="preparando">Preparando</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Pagamento</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map(sale => (
                <tr key={sale.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setSelectedOrder(sale)}>
                  <td className="px-4 py-3 font-mono text-xs">{sale.id}</td>
                  <td className="px-4 py-3">{format(new Date(sale.date), 'dd/MM HH:mm')}</td>
                  <td className="px-4 py-3 font-medium">{sale.customer}</td>
                  <td className="px-4 py-3">{getPaymentLabel(sale.paymentMethod)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(sale.status)}`}>
                      {getStatusLabel(sale.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(sale.total)}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Nenhuma venda encontrada.</td>
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

      <Drawer isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Detalhes do Pedido ${selectedOrder?.id}`}>
        {selectedOrder && (
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                   <p className="text-muted-foreground">Cliente</p>
                   <p className="font-medium text-foreground">{selectedOrder.customer}</p>
                </div>
                <div>
                   <p className="text-muted-foreground">Data</p>
                   <p className="font-medium text-foreground">{format(new Date(selectedOrder.date), 'dd/MM/yyyy HH:mm')}</p>
                </div>
                <div>
                   <p className="text-muted-foreground">Pagamento</p>
                   <p className="font-medium text-foreground">{getPaymentLabel(selectedOrder.paymentMethod)}</p>
                </div>
                <div>
                   <p className="text-muted-foreground">Status</p>
                   <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(selectedOrder.status)}`}>
                     {getStatusLabel(selectedOrder.status)}
                   </span>
                </div>
             </div>

             <div>
                <h3 className="font-medium mb-3 pb-2 border-b border-border">Itens do Pedido</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                         <div className="bg-muted p-2 rounded-md">
                           <Package className="w-4 h-4 text-muted-foreground" />
                         </div>
                         <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">SKU: {item.sku} | Qtd: {item.qty}</p>
                         </div>
                      </div>
                      <div className="font-medium text-right">
                         {formatCurrency(item.price * item.qty)}
                         {item.qty > 1 && <p className="text-xs text-muted-foreground">{formatCurrency(item.price)} un.</p>}
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="bg-muted/30 p-4 rounded-lg space-y-2 text-sm border border-border">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(selectedOrder.total)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Taxa {selectedOrder.paymentMethod}</span><span className="text-destructive">-{formatCurrency(selectedOrder.fee)}</span></div>
                <div className="flex justify-between font-medium pt-2 border-t border-border mt-2"><span>Receita Líquida</span><span className="text-emerald-500">{formatCurrency(selectedOrder.netTotal)}</span></div>
                <div className="flex justify-between mt-2 pt-2 border-t border-border border-dashed"><span className="text-muted-foreground">Custo Produtos</span><span className="text-destructive">-{formatCurrency(selectedOrder.productCost)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Custo Envio</span><span className="text-destructive">-{formatCurrency(selectedOrder.deliveryCost)}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-border mt-2"><span>Lucro Estimado</span><span className="text-emerald-500">{formatCurrency(selectedOrder.profit)}</span></div>
             </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
