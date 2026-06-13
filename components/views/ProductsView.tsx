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
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full flex items-center gap-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar SKU ou nome do item..." 
              className="w-full bg-card border border-border shadow-sm rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border shadow-sm text-foreground text-xs font-medium rounded-lg hover:bg-accent transition-all shrink-0">
            <Filter className="w-4 h-4 text-muted-foreground" />
            Filtrar
          </button>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-medium rounded-lg hover:bg-primary/90 transition-transform active:scale-95 shadow-sm">
          <Plus className="w-4 h-4" />
          Novo Registro
        </button>
      </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm min-w-[800px]">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Identificação do Produto</th>
                <th className="px-6 py-4 font-medium text-right">Custo Base (CMV)</th>
                <th className="px-6 py-4 font-medium text-right">Margem Ref.</th>
                <th className="px-6 py-4 font-medium text-right">Preço Venda (Pix/3x)</th>
                <th className="px-6 py-4 font-medium text-right">Inventário</th>
                <th className="px-6 py-4 font-medium text-right">Auditoria</th>
                <th className="px-4 py-4 font-medium text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockProducts.map((product) => {
                const isPending = product.status === 'pendente';
                return (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden shrink-0 border border-border flex items-center justify-center relative shadow-sm group-hover:border-primary/50 transition-colors">
                          {product.image ? (
                            <Image src={product.image} alt={product.name} fill referrerPolicy="no-referrer" className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-300" />
                          ) : (
                            <Database className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-foreground line-clamp-1 text-sm tracking-tight">{product.name}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-mono text-[10px] uppercase tracking-widest bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded text-primary">{product.sku}</span>
                            <span className="text-[11px] text-muted-foreground">{product.variation}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPending ? (
                        <div className="inline-flex justify-end">
                           <button 
                             className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-destructive/10 text-destructive border border-destructive/20 text-[10px] uppercase font-semibold tracking-wider hover:bg-destructive/20 transition-all shadow-sm relative"
                           >
                             <div className="absolute inset-0 bg-destructive/20 rounded-md animate-ping opacity-20"></div>
                             Definir Custo
                           </button>
                        </div>
                      ) : (
                        <span className="font-mono text-sm tracking-tight text-foreground">{formatCurrency(product.cost)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "font-mono text-[13px] tracking-tight tabular-nums relative font-semibold",
                         product.margin === '0%' ? "text-muted-foreground" : "text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"
                      )}>{product.margin}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[13px] font-semibold text-foreground tabular-nums">{formatCurrency(product.pixPrice)}</span>
                        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{formatCurrency(product.cardPrice)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-[13px] text-foreground tabular-nums px-2 py-1 bg-muted/50 border border-border rounded inline-block">{product.stock} un.</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] bg-muted px-1 py-0.5 text-muted-foreground rounded">{product.lastUpdate}</span>
                        <span className="text-[10px] text-muted-foreground line-clamp-1">{product.origin}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
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
            <div className="flex items-center gap-5 p-4 bg-muted/20 rounded-xl border border-border shadow-sm">
              <div className="w-16 h-16 bg-muted border border-border rounded-lg overflow-hidden shrink-0 relative">
                 {selectedProduct.image ? (
                    <Image src={selectedProduct.image} alt={selectedProduct.name} fill referrerPolicy="no-referrer" className="object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center"><Database className="text-muted-foreground w-6 h-6" /></div>
                 )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground tracking-tight">{selectedProduct.name}</span>
                <span className="text-sm text-muted-foreground mt-0.5">{selectedProduct.variation}</span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded mt-2 self-start">{selectedProduct.sku}</span>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-sm font-semibold text-foreground px-1 border-b border-border pb-2">Precificação & Margem (CMV)</h3>
              
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Custo Unitário Fechado</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">R$</span>
                  <input 
                    type="number" 
                    defaultValue={selectedProduct.cost === 0 ? '' : selectedProduct.cost} 
                    className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors font-mono tabular-nums shadow-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div>
                  <label className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1 block">Preço Pix Venda</label>
                  <input type="text" readOnly value={formatCurrency(selectedProduct.pixPrice)} className="w-full bg-muted border border-transparent rounded-lg px-4 py-2.5 text-muted-foreground font-mono tabular-nums text-sm cursor-not-allowed" />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground uppercase tracking-widest mb-1 block">Preço Cartão (3x)</label>
                  <input type="text" readOnly value={formatCurrency(selectedProduct.cardPrice)} className="w-full bg-muted border border-transparent rounded-lg px-4 py-2.5 text-muted-foreground font-mono tabular-nums text-sm cursor-not-allowed" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-5 flex justify-between items-center relative overflow-hidden shadow-sm">
                <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-foreground ml-3">Margem Estimada Referência</span>
                <span className={cn("font-mono text-xl font-bold tabular-nums", selectedProduct.cost === 0 ? "text-muted-foreground" : "text-emerald-500")}>
                  {selectedProduct.cost === 0 ? '--%' : selectedProduct.margin}
                </span>
              </div>
            </div>

            <div className="pt-6 flex gap-3 border-t border-border">
              <button onClick={() => setSelectedProduct(null)} className="flex-1 px-4 py-2.5 bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-accent hover:text-foreground transition-colors">Voltar</button>
              <button className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors shadow-sm active:scale-95">Salvar</button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
