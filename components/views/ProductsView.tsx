import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockProducts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, AlertCircle, Plus, Filter, MoreHorizontal, Image as ImageIcon, Database, Info } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import Image from 'next/image';

type Product = typeof mockProducts[0];

export function ProductsView() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Example rates for simulator
  const PIX_RATE = 0.0099;
  const CARD_RATE = 0.0399;
  const FIXED_COST = 5.00; // Frete ou embalagem simulado

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventário e Margens</h1>
           <p className="text-sm font-medium text-muted-foreground mt-0.5">Visão consolidada de SKUs, custo médio (CMV) e lucratividade.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
        <div className="relative max-w-md w-full flex items-center gap-2 group">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por código SKU, nome do produto..." 
              className="w-full bg-card border border-border shadow-sm rounded-md pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border text-foreground text-xs font-bold tracking-wider uppercase rounded-md hover:bg-muted/80 transition-colors shrink-0 shadow-sm">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            Filtros
          </button>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase rounded-md hover:bg-primary/90 transition-transform active:scale-95 shadow-sm">
          <Plus className="w-4 h-4" /> Novo SKU
        </button>
      </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden">
        <div className="overflow-x-auto relative z-10 custom-scrollbar">
          <table className="w-full text-left font-sans text-sm min-w-[900px]">
            <thead className="bg-muted/20 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Produto</th>
                <th className="px-6 py-4 font-semibold text-right">Custo Líquido</th>
                <th className="px-6 py-4 font-semibold text-right">Preços (Pix/Cartão)</th>
                <th className="px-6 py-4 font-semibold text-right">Margem Operacional</th>
                <th className="px-6 py-4 font-semibold text-right">Estoque</th>
                <th className="px-6 py-4 font-semibold text-right">Auditoria</th>
                <th className="px-4 py-4 font-semibold text-center w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockProducts.map((product) => {
                const isPending = product.status === 'pendente';
                const badMargin = product.margin !== '0%' && parseInt(product.margin) < 15;
                
                return (
                  <tr key={product.id} className="hover:bg-muted/40 transition-colors group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-muted/50 rounded-xl overflow-hidden shrink-0 border border-border flex items-center justify-center relative shadow-sm group-hover:border-primary/50 transition-colors">
                          {product.image ? (
                            <Image src={product.image} alt={product.name} fill referrerPolicy="no-referrer" className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-300" />
                          ) : (
                            <Database className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-foreground line-clamp-1 text-sm tracking-tight">{product.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded text-primary">{product.sku}</span>
                            <span className="text-[11px] font-medium text-muted-foreground">{product.variation}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPending ? (
                        <div className="inline-flex justify-end">
                           <button className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] uppercase font-bold tracking-wider hover:bg-amber-500/20 transition-all shadow-sm">
                             Sem Custo
                           </button>
                        </div>
                      ) : (
                        <span className="font-mono text-[13px] font-bold tracking-tight text-foreground tabular-nums">{formatCurrency(product.cost)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-mono text-[13px] font-bold text-foreground tabular-nums" title="Preço Pix">{formatCurrency(product.pixPrice)}</span>
                        <span className="font-mono text-[10px] font-medium text-muted-foreground tabular-nums" title="Preço Cartão">{formatCurrency(product.cardPrice)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className={cn(
                          "font-mono text-[13px] tracking-tight tabular-nums font-bold px-2.5 py-1 rounded border",
                           isPending ? "text-muted-foreground border-border bg-muted/50" : 
                           badMargin ? "text-destructive bg-destructive/10 border-destructive/20" :
                           "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                        )}>
                          {product.margin}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-[13px] font-bold text-foreground tabular-nums px-2 py-1 bg-muted/50 border border-border rounded inline-block">{product.stock}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-muted border border-border px-1.5 py-0.5 text-muted-foreground rounded shadow-sm">{product.lastUpdate}</span>
                        <span className="text-[10px] font-medium text-muted-foreground line-clamp-1">{product.origin}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
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
        title="Auditoria de Margens: Pix vs Cartão"
      >
        {selectedProduct && (
          <div className="space-y-6 mt-2">
            <div className="flex items-center gap-5 p-4 bg-muted/10 rounded-xl border border-border shadow-sm">
              <div className="w-20 h-20 bg-muted/50 border border-border rounded-xl overflow-hidden shrink-0 relative shadow-inner">
                 {selectedProduct.image ? (
                    <Image src={selectedProduct.image} alt={selectedProduct.name} fill referrerPolicy="no-referrer" className="object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center"><Database className="text-muted-foreground w-6 h-6" /></div>
                 )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground tracking-tight text-lg leading-tight">{selectedProduct.name}</span>
                <span className="text-sm font-medium text-muted-foreground mt-1">{selectedProduct.variation}</span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded mt-2 self-start">{selectedProduct.sku}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground px-1 border-b border-border pb-2">Simulador de Resultado Operacional</h3>
              
              <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">Custo Unitário (CMV Real)</span>
                    <span className="font-mono text-lg font-bold text-foreground tabular-nums">{formatCurrency(selectedProduct.cost)}</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    {/* COLUNA PIX */}
                    <div className="space-y-3">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Aferição via Pix</span>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Preço Venda</span>
                          <span className="font-mono text-foreground font-semibold">{formatCurrency(selectedProduct.pixPrice)}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs text-destructive">
                          <span>Taxa Pix (0.99%)</span>
                          <span className="font-mono font-semibold">-{formatCurrency(selectedProduct.pixPrice * PIX_RATE)}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs text-destructive">
                          <span>Rateio Fixo (Est.)</span>
                          <span className="font-mono font-semibold">-{formatCurrency(FIXED_COST)}</span>
                       </div>
                       
                       <div className="pt-2 border-t border-border/50 mt-2 flex justify-between items-center">
                          <span className="text-xs font-bold text-foreground">Lucro Líquido Real</span>
                          <span className="font-mono text-sm font-bold text-emerald-500 tabular-nums">
                              {formatCurrency(selectedProduct.pixPrice - selectedProduct.cost - (selectedProduct.pixPrice * PIX_RATE) - FIXED_COST)}
                          </span>
                       </div>
                    </div>

                    {/* COLUNA CARTAO */}
                    <div className="space-y-3 pl-4 border-l border-border/50">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Aferição Cartão (3x)</span>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Preço Venda</span>
                          <span className="font-mono text-foreground font-semibold">{formatCurrency(selectedProduct.cardPrice)}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs text-destructive">
                          <span>Taxa Cartão (3.99%)</span>
                          <span className="font-mono font-semibold">-{formatCurrency(selectedProduct.cardPrice * CARD_RATE)}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs text-destructive">
                          <span>Rateio Fixo (Est.)</span>
                          <span className="font-mono font-semibold">-{formatCurrency(FIXED_COST)}</span>
                       </div>
                       
                       <div className="pt-2 border-t border-border/50 mt-2 flex justify-between items-center">
                          <span className="text-xs font-bold text-foreground">Lucro Líquido Real</span>
                          <span className="font-mono text-sm font-bold text-sky-500 tabular-nums">
                              {formatCurrency(selectedProduct.cardPrice - selectedProduct.cost - (selectedProduct.cardPrice * CARD_RATE) - FIXED_COST)}
                          </span>
                       </div>
                    </div>
                 </div>
              </div>

               <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 p-4 rounded-xl">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-primary leading-relaxed font-medium">
                     Neste cenário simulado, o lucro via Pix é mais vantajoso, porém o cartão absorve bem os custos devido ao acréscimo no preço. Margens calculadas com base nos parâmetros globais de custos da loja.
                  </p>
               </div>
            </div>

            <div className="pt-6 flex gap-3">
              <button className="flex-1 px-4 py-3 bg-muted text-foreground text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-accent hover:text-foreground transition-colors shadow-sm">Editar Preço Base</button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
