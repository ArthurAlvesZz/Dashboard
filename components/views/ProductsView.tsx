import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockProducts } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { Search, AlertCircle, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProductsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Buscar por SKU, nome..." 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      <Card>
        <CardHeader className="border-b border-neutral-800 flex flex-row items-center justify-between py-4">
          <CardTitle>Catálogo de Produtos e Custos</CardTitle>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-medium flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              2 Custos Pendentes
            </span>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
              <tr>
                <th className="px-6 py-3 font-medium whitespace-nowrap">SKU</th>
                <th className="px-6 py-3 font-medium">Nome do Produto</th>
                <th className="px-6 py-3 font-medium">Custo Unitário</th>
                <th className="px-6 py-3 font-medium text-right">Estoque</th>
                <th className="px-6 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {mockProducts.map((product) => {
                const isPending = product.status === 'pendente';
                return (
                  <tr key={product.id} className="hover:bg-neutral-900/50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs whitespace-nowrap">
                      {product.sku}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {isPending ? (
                        <button className="text-amber-500 hover:text-amber-400 font-medium underline underline-offset-4 decoration-amber-500/30 flex items-center gap-1.5 transition-colors">
                          <AlertCircle className="w-3 h-3" />
                          R$ 0,00 (Definir)
                        </button>
                      ) : (
                        <span>{formatCurrency(product.cost)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right tabular-nums">
                      {product.stock} un.
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium tracking-wide uppercase",
                        isPending 
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                          : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      )}>
                        {isPending ? 'S/ Custo' : 'Custo OK'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
