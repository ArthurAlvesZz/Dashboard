'use client';
import { useState, useMemo } from 'react';
import { mockBusinessCosts, filterByStore } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Search, Filter, Plus } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { useToast } from '@/components/ui/Toast';
import { useStore } from '@/contexts/StoreContext';

export function BusinessCostsView() {
  const { selectedStore } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedCost, setSelectedCost] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    let data = filterByStore(mockBusinessCosts, selectedStore);
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      data = data.filter(c => c.summary.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.store.toLowerCase().includes(q));
    }
    if (statusFilter !== 'all') data = data.filter(c => c.status === statusFilter);
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
          <h2 className="text-2xl font-bold tracking-tight">Custos do Negócio</h2>
          <p className="text-muted-foreground">Acompanhamento e registro de despesas operacionais fixas e variáveis.</p>
        </div>
        <button onClick={() => { setSelectedCost(null); setIsDrawerOpen(true); }} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Novo Custo
        </button>
      </div>

      <Card>
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar por descrição, categoria ou loja..."
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
            <option value="pago">Pago</option>
            <option value="vencendo">Vencendo</option>
            <option value="atrasado">Atrasado</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Data Venc.</th>
                <th className="px-4 py-3 font-medium">Resumo/Descrição</th>
                <th className="px-4 py-3 font-medium">Loja</th>
                <th className="px-4 py-3 font-medium">Categoria</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Situação</th>
                <th className="px-4 py-3 font-medium text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map(cost => (
                <tr key={cost.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => { setSelectedCost(cost); setIsDrawerOpen(true); }}>
                  <td className="px-4 py-3 font-medium">{new Date(cost.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-medium">{cost.summary}</td>
                  <td className="px-4 py-3">{cost.store}</td>
                  <td className="px-4 py-3">{cost.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cost.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(cost.status)}`}>
                      {getStatusLabel(cost.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(cost.value)}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Nenhum custo encontrado com estes filtros.</td>
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

      <Drawer isOpen={isDrawerOpen} onClose={() => {setIsDrawerOpen(false); setSelectedCost(null)}} title={selectedCost ? 'Editar Custo' : 'Lançar Novo Custo'}>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Descrição</label>
              <input type="text" defaultValue={selectedCost?.summary} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Data Vencimento</label>
                <input type="date" defaultValue={selectedCost?.date?.slice(0, 10)} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Valor (R$)</label>
                <input type="number" defaultValue={selectedCost?.value} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Categoria</label>
                <input type="text" defaultValue={selectedCost?.category} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Loja</label>
                <select defaultValue={selectedCost?.storeId} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
                  <option value="all">Todas as Lojas</option>
                  <option value="araguari">Araguari</option>
                  <option value="uberlandia">Uberlândia</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-border flex justify-end gap-3">
             <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md transition-colors">Cancelar</button>
             <button onClick={handleSave} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">{selectedCost ? 'Salvar Custo' : 'Lançar Custo'}</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
