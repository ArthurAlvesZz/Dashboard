import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockProducts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, AlertCircle, Plus, Filter, MoreHorizontal, Image as ImageIcon, Database } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import Image from 'next/image';

type Product = typeof mockProducts[0];

export function ProductsView() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full flex items-center gap-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-pink-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar SKU ou nome do item..." 
              className="w-full bg-[#0a0a0a] border border-neutral-900 rounded-lg pl-10 pr-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-pink-500/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] placeholder:text-neutral-600 font-mono"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-neutral-900 text-neutral-400 text-[11px] uppercase tracking-widest font-mono font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-all shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Filtrar
          </button>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[11px] font-mono tracking-widest uppercase font-bold rounded-lg hover:bg-neutral-200 transition-transform active:scale-95 shadow-lg">
          <Plus className="w-4 h-4" />
          Novo Registro
        </button>
      </div>

      <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-pink-500/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-[#121212]/50 border-b border-neutral-900 text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-mono">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Indentificação do Produto</th>
                <th className="px-6 py-4 font-medium text-right">Custo Base (CMV)</th>
                <th className="px-6 py-4 font-medium text-right">Margem Ref.</th>
                <th className="px-6 py-4 font-medium text-right">Preço Venda (Pix/3x)</th>
                <th className="px-6 py-4 font-medium text-right">Inventário</th>
                <th className="px-6 py-4 font-medium text-right">Auditoria</th>
                <th className="px-4 py-4 font-medium text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/50 text-neutral-300">
              {mockProducts.map((product) => {
                const isPending = product.status === 'pendente';
                return (
                  <tr key={product.id} className="hover:bg-[#121212] transition-colors group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg overflow-hidden shrink-0 border border-neutral-800 flex items-center justify-center relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] group-hover:border-neutral-700 transition-colors">
                          {product.image ? (
                            <Image src={product.image} alt={product.name} fill referrerPolicy="no-referrer" className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-300" />
                          ) : (
                            <Database className="w-4 h-4 text-neutral-600" />
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-neutral-100 line-clamp-1 text-[13px] tracking-wide">{product.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-pink-500">{product.sku}</span>
                            <span className="text-[10px] text-neutral-600 uppercase tracking-widest">{product.variation}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPending ? (
                        <div className="inline-flex justify-end">
                           <button 
                             className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-pink-500/10 text-pink-500 border border-pink-500/20 text-[10px] uppercase font-mono tracking-widest font-medium hover:bg-pink-500/20 transition-all shadow-[0_0_10px_rgba(236,72,153,0.1)] relative"
                           >
                             <div className="absolute inset-0 bg-pink-500/20 rounded animate-ping opacity-20"></div>
                             Definir Custo
                           </button>
                        </div>
                      ) : (
                        <span className="font-mono text-sm tracking-tight text-white">{formatCurrency(product.cost)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "font-mono text-[13px] tracking-tight tabular-nums relative",
                         product.margin === '0%' ? "text-neutral-600" : "text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded"
                      )}>{product.margin}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs">
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="font-mono text-[13px] text-neutral-200 tabular-nums">{formatCurrency(product.pixPrice)}</span>
                        <span className="font-mono text-[10px] text-neutral-600 tabular-nums">{formatCurrency(product.cardPrice)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-[13px] text-neutral-300 tabular-nums px-2 py-1 bg-neutral-900 border border-neutral-800/80 rounded inline-block">{product.stock} un.</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">{product.lastUpdate}</span>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-600 bg-neutral-900 px-1 py-0.5 rounded">{product.origin}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-2 text-neutral-600 hover:text-white rounded-md hover:bg-neutral-800 transition-colors">
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
        title="Modificação de Produto"
      >
        {selectedProduct && (
          <div className="space-y-6 mt-2">
            <div className="flex items-center gap-5 p-4 bg-[#0a0a0a] rounded-xl border border-neutral-900 shadow-inner">
              <div className="w-16 h-16 bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shrink-0 relative">
                 {selectedProduct.image ? (
                    <Image src={selectedProduct.image} alt={selectedProduct.name} fill referrerPolicy="no-referrer" className="object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center"><Database className="text-neutral-700 w-6 h-6" /></div>
                 )}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-white tracking-wide">{selectedProduct.name}</span>
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 mt-1">{selectedProduct.variation}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-pink-500/10 text-pink-500 border border-pink-500/20 px-2 py-0.5 rounded mt-2 self-start">{selectedProduct.sku}</span>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-1 border-b border-neutral-900 pb-2">Precificação & Margem (CMV)</h3>
              
              <div>
                <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 mb-2 block">Custo Unitário Fechado</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 font-mono text-xs">R$</span>
                  <input 
                    type="number" 
                    defaultValue={selectedProduct.cost === 0 ? '' : selectedProduct.cost} 
                    className="w-full bg-[#050505] border border-neutral-800 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-pink-500/50 transition-colors font-mono tabular-nums shadow-inner"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2 block">Preço Pix Venda</label>
                  <input type="text" readOnly value={formatCurrency(selectedProduct.pixPrice)} className="w-full bg-[#050505]/50 border border-transparent rounded-lg px-4 py-3 text-neutral-500 font-mono tabular-nums text-sm cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 mb-2 block">Preço Cartão (3x)</label>
                  <input type="text" readOnly value={formatCurrency(selectedProduct.cardPrice)} className="w-full bg-[#050505]/50 border border-transparent rounded-lg px-4 py-3 text-neutral-500 font-mono tabular-nums text-sm cursor-not-allowed" />
                </div>
              </div>

              <div className="bg-[#121212] border border-neutral-900 rounded-lg p-5 flex justify-between items-center relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500"></div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">Margem Estimada Referência</span>
                <span className={cn("font-mono text-lg tracking-tighter tabular-nums", selectedProduct.cost === 0 ? "text-neutral-500" : "text-emerald-400")}>
                  {selectedProduct.cost === 0 ? '--%' : selectedProduct.margin}
                </span>
              </div>
            </div>

            <div className="pt-6 flex gap-3 border-t border-neutral-900">
              <button onClick={() => setSelectedProduct(null)} className="flex-1 px-4 py-3 bg-neutral-900 text-neutral-300 font-mono text-[10px] uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors">Voltar</button>
              <button className="flex-1 px-4 py-3 bg-white text-black font-mono font-medium text-[10px] uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-colors shadow-lg active:scale-95">Gravar Modificação</button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
