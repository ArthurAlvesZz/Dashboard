import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockStockFlow } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Drawer } from '@/components/ui/Drawer';
import { Package, TrendingDown, ArrowRight } from 'lucide-react';

export function StockFlowView() {
  const [selectedDay, setSelectedDay] = useState<typeof mockStockFlow.exits[0] | null>(null);

  // Mocked details for the selected day
  const mockDayDetails = [
    { sku: 'ADS01', qty: 3, unitCost: 45.50, total: 136.50 },
    { sku: 'Creme PRT50', qty: 2, unitCost: 110.00, total: 220.00 },
    { sku: 'CON07', qty: 1, unitCost: 93.50, total: 93.50 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
           <CardContent className="p-5">
             <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">Total Compras (Entrada Estoque)</span>
             <span className="text-2xl font-mono text-white tracking-tight">{formatCurrency(mockStockFlow.comprasMes)}</span>
           </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-800">
           <CardContent className="p-5">
             <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">Total Baixado (Custo CMV)</span>
             <span className="text-2xl font-mono text-white tracking-tight">{formatCurrency(mockStockFlow.custoSaida)}</span>
           </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-800">
           <CardContent className="p-5">
             <span className="text-xs text-amber-500 uppercase tracking-widest block mb-2">Necessidade Reposição</span>
             <span className="text-2xl font-mono text-amber-500 tracking-tight">{formatCurrency(mockStockFlow.necessidadeReposicao)}</span>
           </CardContent>
        </Card>
         <Card className="bg-neutral-900 border-neutral-800">
           <CardContent className="p-5">
             <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">Saldo Fluxo (Capital Físico)</span>
             <span className={cn("text-2xl font-mono tracking-tight", mockStockFlow.saldoFluxo < 0 ? "text-red-400" : "text-emerald-400")}>
               {formatCurrency(mockStockFlow.saldoFluxo)}
             </span>
             <span className="block mt-2 text-[10px] text-neutral-500 leading-tight">Diferença entre o que foi comprado (entrada) e o que foi baixado em vendas (CMV).</span>
           </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader className="border-b border-neutral-800">
              <CardTitle className="text-sm">Registro de Pagamento de Fornecedores (Lotes)</CardTitle>
            </CardHeader>
            <div className="p-0">
               <ul className="divide-y divide-neutral-800">
                  {mockStockFlow.entries.map((item, i) => (
                    <li key={i} className="p-4 flex items-center justify-between hover:bg-neutral-900/50 transition-colors">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                           <Package className="w-4 h-4 text-emerald-500" />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-sm font-medium text-white">{item.description}</span>
                           <span className="text-xs text-neutral-500 mt-0.5">{format(new Date(item.date), "dd MMM", { locale: ptBR })}</span>
                         </div>
                       </div>
                       <span className="font-mono text-sm text-emerald-400">+{formatCurrency(item.value)}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </Card>

         <Card>
            <CardHeader className="border-b border-neutral-800">
              <CardTitle className="text-sm">Baixa Diária Consolidada (Custo CMV)</CardTitle>
            </CardHeader>
             <div className="p-0">
               <ul className="divide-y divide-neutral-800">
                  {mockStockFlow.exits.map((item, i) => (
                    <li key={i} onClick={() => setSelectedDay(item)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-900/50 transition-colors group">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                           <TrendingDown className="w-4 h-4 text-neutral-400" />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Vendas do dia {format(new Date(item.date), "dd/MM", { locale: ptBR })}</span>
                           <span className="text-xs text-neutral-500 mt-0.5">CMV (Custo da Mercadoria Vendida)</span>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <span className="font-mono text-sm text-neutral-300">-{formatCurrency(item.value)}</span>
                         <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-emerald-500 transition-colors" />
                       </div>
                    </li>
                  ))}
               </ul>
            </div>
         </Card>
       </div>

       <Drawer isOpen={!!selectedDay} onClose={() => setSelectedDay(null)} title="Detalhamento da Baixa (CMV)">
         {selectedDay && (
           <div className="space-y-6">
             <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex items-center justify-between">
                <div>
                   <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest block mb-1">Referência</span>
                   <span className="text-lg text-white">{format(new Date(selectedDay.date), "dd 'de' MMMM", { locale: ptBR })}</span>
                </div>
                <div className="text-right">
                   <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest block mb-1">CMV Total Exigido</span>
                   <span className="text-lg font-mono text-white">{formatCurrency(selectedDay.value)}</span>
                </div>
             </div>

             <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400 mb-3">Produtos Baixados no Período</h3>
                
                <table className="w-full text-left font-sans text-sm border-collapse">
                   <thead>
                     <tr className="border-b border-neutral-800 text-neutral-500 text-xs uppercase tracking-wider">
                       <th className="pb-2 font-medium">SKU / Venda</th>
                       <th className="pb-2 font-medium text-center">Qtd</th>
                       <th className="pb-2 font-medium text-right">Custo Unit.</th>
                       <th className="pb-2 font-medium text-right">CMV Somado</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-neutral-800/60">
                     {mockDayDetails.map((detail, idx) => (
                       <tr key={idx} className="text-neutral-300">
                         <td className="py-3 pr-2 font-mono text-xs">{detail.sku}</td>
                         <td className="py-3 px-2 text-center text-xs">{detail.qty}x</td>
                         <td className="py-3 px-2 text-right font-mono text-xs text-neutral-400">{formatCurrency(detail.unitCost)}</td>
                         <td className="py-3 pl-2 text-right font-mono text-sm text-white">{formatCurrency(detail.total)}</td>
                       </tr>
                     ))}
                   </tbody>
                   <tfoot>
                      <tr className="border-t border-neutral-800">
                         <td colSpan={3} className="py-3 text-right text-xs uppercase text-neutral-500 font-medium">Soma Auditada:</td>
                         <td className="py-3 text-right font-mono text-sm text-emerald-400">{formatCurrency(selectedDay.value)}</td>
                      </tr>
                   </tfoot>
                </table>
             </div>

             <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-start gap-3 mt-4">
                <div className="text-xs text-emerald-500/80 leading-relaxed">
                   <strong>Nota:</strong> Este valor de CMV é a soma dos custos de cada produto que saiu do estoque nas vendas fechadas. Ele representa o capital físico consumido, não o faturamento gerado.
                </div>
             </div>
           </div>
         )}
       </Drawer>
    </div>
  );
}
