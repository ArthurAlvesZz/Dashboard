import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockProducts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, AlertCircle, Plus, Filter, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

export function ProductsView() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Buscar por SKU, nome..." 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 transition-colors placeholder:text-neutral-600"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-medium whitespace-nowrap">Produto</th>
                <th className="px-5 py-4 font-medium text-right">Custo Univ.</th>
                <th className="px-5 py-4 font-medium text-right">Margem</th>
                <th className="px-5 py-4 font-medium text-right">Pix / Cartão</th>
                <th className="px-5 py-4 font-medium text-right">Estoque</th>
                <th className="px-5 py-4 font-medium text-right">Atualização / Origem</th>
                <th className="px-5 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {mockProducts.map((product) => {
                const isPending = product.status === 'pendente';
                return (
                  <tr key={product.id} className="hover:bg-neutral-900/50 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-neutral-800 rounded-md overflow-hidden shrink-0 border border-neutral-700 flex items-center justify-center">
                          {product.image ? (
                             // eslint-disable-next-line @next/next/no-img-element
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-neutral-600" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-white line-clamp-1">{product.name}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400">{product.sku}</span>
                            <span className="text-[11px] text-neutral-500">{product.variation}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {isPending ? (
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-medium hover:bg-amber-500/20 transition-colors"
                        >
                          <AlertCircle className="w-3 h-3" />
                          Definir Custo
                        </button>
                      ) : (
                        <span className="font-mono text-sm tracking-tight">{formatCurrency(product.cost)}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={cn(
                        "font-mono text-sm tracking-tight",
                         product.margin === '0%' ? "text-neutral-600" : "text-emerald-400"
                      )}>{product.margin}</span>
                    </td>
                    <td className="px-5 py-3 text-right text-xs">
                      <div className="flex flex-col items-end">
                        <span className="text-white">{formatCurrency(product.pixPrice)}</span>
                        <span className="text-neutral-500 mt-0.5">{formatCurrency(product.cardPrice)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums">
                      {product.stock} un.
                    </td>
                    <td className="px-5 py-3 text-right text-xs">
                       <div className="flex flex-col items-end">
                        <span className="text-neutral-400">{product.lastUpdate}</span>
                        <span className="text-neutral-600 mt-0.5">{product.origin}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button 
                        onClick={() => setSelectedProduct(product)}
                        className="p-1.5 text-neutral-500 hover:text-white rounded-md hover:bg-neutral-800 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
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
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        title="Detalhes do Produto"
      >
        {selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shrink-0">
                 // eslint-disable-next-line @next/next/no-img-element
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-white">{selectedProduct.name}</span>
                <span className="text-sm text-neutral-400">{selectedProduct.variation}</span>
                <span className="font-mono text-xs bg-neutral-900 border border-neutral-800 px-2 py-1 rounded mt-2 self-start text-neutral-300">{selectedProduct.sku}</span>
              </div>
            </div>

            <div className="h-px bg-neutral-800" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Editar Custo</h3>
              <div>
                <label className="text-xs text-neutral-500 mb-1 block">Custo Unitário (R$)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">R$</span>
                  <input 
                    type="number" 
                    defaultValue={selectedProduct.cost === 0 ? '' : selectedProduct.cost} 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-neutral-600 transition-colors font-mono"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="text-xs text-neutral-500 mb-1 block">Preço Pix</label>
                  <input type="text" readOnly value={formatCurrency(selectedProduct.pixPrice)} className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-400 font-mono text-sm cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-xs text-neutral-500 mb-1 block">Preço Cartão</label>
                  <input type="text" readOnly value={formatCurrency(selectedProduct.cardPrice)} className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-400 font-mono text-sm cursor-not-allowed" />
                </div>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex justify-between items-center mt-2">
                <span className="text-sm text-neutral-400">Margem Estimada</span>
                <span className={cn("font-mono font-medium", selectedProduct.cost === 0 ? "text-neutral-500" : "text-emerald-400")}>
                  {selectedProduct.cost === 0 ? '--%' : selectedProduct.margin}
                </span>
              </div>
            </div>

            <div className="h-px bg-neutral-800" />

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                Salvar Alterações
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
