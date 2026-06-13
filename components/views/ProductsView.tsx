'use client';
import { useState, useMemo } from 'react';
import { mockProducts } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Search, Plus, Filter } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { useToast } from '@/components/ui/Toast';

import { toast } from 'sonner';

export function ProductsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();

  const [products, setProducts] = useState(mockProducts);
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', pixPrice: '', cardPrice: '', cost: '' });

  const filtered = useMemo(() => {
    let data = products;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      data = data.filter(p => p.sku.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.variation.toLowerCase().includes(q));
    }
    return data;
  }, [searchTerm]);

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
          <h2 className="text-2xl font-bold tracking-tight">Produtos e Custos</h2>
          <p className="text-muted-foreground">Catálogo de SKUs, tabela de preços e custos atrelados por item.</p>
        </div>
        <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" /> Cadastrar Produto
        </button>
      </div>

      <Card>
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar por SKU, nome ou variação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button className="h-9 px-4 rounded-md border border-input bg-background flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Produto</th>
                <th className="px-4 py-3 font-medium">Estoque</th>
                <th className="px-4 py-3 font-medium text-right">Custo</th>
                <th className="px-4 py-3 font-medium text-right">Preço (Cartão)</th>
                <th className="px-4 py-3 font-medium text-right">Margem</th>
                <th className="px-4 py-3 font-medium">Situação Custo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.map(product => {
                 const price = product.cardPrice || product.pixPrice;
                 const marginPercent = price && product.cost ? ((price - product.cost) / price) * 100 : 0;
                 return (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => { setSelectedProduct(product); setIsDrawerOpen(true); }}>
                  <td className="px-4 py-3 font-mono text-xs">{product.sku}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.variation}</p>
                  </td>
                  <td className="px-4 py-3">{product.stock} un.</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(product.cost)}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(product.cardPrice || product.pixPrice)}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={marginPercent > 40 ? 'text-emerald-500' : 'text-amber-500'}>
                       {marginPercent > 0 ? marginPercent.toFixed(1) + '%' : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(product.status)}`}>
                      {getStatusLabel(product.status)}
                    </span>
                  </td>
                </tr>
              )})}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Nenhum produto encontrado.</td>
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

      <Drawer isOpen={isDrawerOpen} onClose={() => {setIsDrawerOpen(false); setSelectedProduct(null)}} title={selectedProduct ? 'Editar Produto' : 'Novo Produto'}>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Nome do Produto</label>
              <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">SKU</label>
                <input type="text" value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} className="font-mono text-xs h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Preço Pix / Cartão (R$)</label>
                <input type="number" value={newProduct.pixPrice} onChange={(e) => setNewProduct({ ...newProduct, pixPrice: e.target.value, cardPrice: e.target.value })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Custo Unitário (R$)</label>
                <input type="number" value={newProduct.cost} onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })} className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" />
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-border flex justify-end gap-3">
             <button onClick={() => setIsDrawerOpen(false)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md transition-colors">Cancelar</button>
             <button onClick={() => {
                if (!newProduct.name || !newProduct.sku) {
                  toast.error('Preencha nome e SKU do produto');
                  return;
                }
                const item = {
                  id: String(products.length + 1),
                  sku: newProduct.sku,
                  name: newProduct.name,
                  variation: 'Único',
                  image: `https://picsum.photos/seed/${newProduct.sku}/200`,
                  pixPrice: parseFloat(newProduct.pixPrice) || 0,
                  cardPrice: parseFloat(newProduct.cardPrice) || 0,
                  cost: parseFloat(newProduct.cost) || 0,
                  margin: newProduct.cost ? `${(((parseFloat(newProduct.pixPrice) - parseFloat(newProduct.cost)) / parseFloat(newProduct.pixPrice)) * 100).toFixed(0)}%` : '0%',
                  origin: 'Manual',
                  lastUpdate: 'Agora',
                  status: 'ok' as const,
                  stock: 0,
                };
                setProducts([item, ...products]);
                setNewProduct({ name: '', sku: '', pixPrice: '', cardPrice: '', cost: '' });
                setIsDrawerOpen(false);
                toast.success('Produto salvo com sucesso');
             }} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Salvar Alterações</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
