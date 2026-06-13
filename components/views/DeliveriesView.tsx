'use client';
import { useState, useMemo } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { mockDeliveries, filterByStore, mockDeliveryCosts } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { useToast } from '@/components/ui/Toast';

import { toast } from 'sonner';

export function DeliveriesView() {
  const { selectedStore } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();

  const [newDelivery, setNewDelivery] = useState({ order: '', method: 'Motoboy Lógico', realCost: '' });
  const [deliveryCosts, setDeliveryCosts] = useState(mockDeliveryCosts);
  const [deliveries, setDeliveries] = useState(mockDeliveries);

  const filtered = useMemo(() => {
    let data = filterByStore(deliveries, selectedStore);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      data = data.filter(d => d.id.toLowerCase().includes(q) || d.carrier.toLowerCase().includes(q) || d.store.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') data = data.filter(d => d.status === statusFilter);
    return data;
  }, [searchTerm, statusFilter, selectedStore]);

  const totalPages = Math.ceil(filtered.length / 20);
  const paginated = filtered.slice((page - 1) * 20, page * 20);

  const handleSave = () => {
    showToast("Salvo com sucesso");
    setIsDrawerOpen(false);
  };

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
                <tr key={delivery.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => { setSelectedDelivery(delivery); setIsDrawerOpen(true); }}>
                  <td className="px-4 py-3 font-mono text-xs">{delivery.id}</td>
                  <td className="px-4 py-3 font-medium">{delivery.customer}</td>
                  <td className="px-4 py-3">{delivery.carrier}</td>
                  <td className="px-4 py-3 font-mono text-xs">{(delivery.tracking !== 'N/A' && delivery.tracking) ? delivery.tracking : '-'}</td>
                  <td className="px-4 py-3">{delivery.deadline}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(delivery.status)}`}>
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

      <Drawer isOpen={isDrawerOpen} onClose={() => {setIsDrawerOpen(false); setSelectedDelivery(null)}} title={selectedDelivery ? `Editar Entrega ${selectedDelivery.id}` : 'Nova Entrega'}>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Pedido</label>
              <input type="text" value={newDelivery.order} onChange={(e) => setNewDelivery({ ...newDelivery, order: e.target.value })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Motoboy/Transportadora</label>
                <input type="text" value={newDelivery.method} onChange={(e) => setNewDelivery({ ...newDelivery, method: e.target.value })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Custo Real</label>
                <input type="number" value={newDelivery.realCost} onChange={(e) => setNewDelivery({ ...newDelivery, realCost: e.target.value })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm font-mono text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-border flex justify-end gap-3">
             <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md transition-colors">Cancelar</button>
             <button onClick={() => {
                if (!newDelivery.order || !newDelivery.realCost) {
                  toast.error('Preencha pedido e custo real');
                  return;
                }
                const item = {
                  id: String(deliveryCosts.length + 1),
                  order: newDelivery.order,
                  saleId: newDelivery.order,
                  date: new Date().toISOString(),
                  method: newDelivery.method,
                  charged: 0,
                  realCost: parseFloat(newDelivery.realCost),
                  diff: 0,
                  status: 'ok' as const,
                  store: 'Araguari',
                  storeId: 'araguari'
                };
                setDeliveryCosts([item, ...deliveryCosts]);
                
                // Add to view deliveries too so it updates the actual visible table
                const viewItem = {
                  id: newDelivery.order,
                  customer: 'Novo Cliente',
                  tracking: 'N/A',
                  carrier: newDelivery.method,
                  cost: parseFloat(newDelivery.realCost),
                  deadline: 'Hoje',
                  status: 'processando' as const,
                  store: 'Araguari',
                  storeId: 'araguari'
                };
                setDeliveries([viewItem, ...deliveries]);
                
                setNewDelivery({ order: '', method: 'Motoboy Lógico', realCost: '' });
                setIsDrawerOpen(false);
                toast.success('Custo de entrega registrado');
             }} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Salvar Custo</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
