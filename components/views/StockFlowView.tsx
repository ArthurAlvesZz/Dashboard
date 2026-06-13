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
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-xl relative overflow-hidden group">
           <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-widest block">Total Compras (Entrada)</span>
             </div>
             <span className="text-2xl font-mono text-white tracking-tight">{formatCurrency(mockStockFlow.comprasMes)}</span>
           </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-xl relative overflow-hidden group">
           <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                <span className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-widest block">Total Baixado (CMV)</span>
             </div>
             <span className="text-2xl font-mono text-white tracking-tight">{formatCurrency(mockStockFlow.custoSaida)}</span>
           </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-xl relative overflow-hidden group">
           <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-mono font-medium text-amber-500 uppercase tracking-widest block text-shadow-sm">Necessidade Reposição</span>
             </div>
             <span className="text-2xl font-mono text-amber-500 tracking-tight drop-shadow-md">{formatCurrency(mockStockFlow.necessidadeReposicao)}</span>
           </CardContent>
        </Card>
         <Card className="bg-[#0a0a0a] border-neutral-800 shadow-xl relative overflow-hidden group ring-1 ring-white/5">
           <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
           <CardContent className="p-6 relative z-10">
             <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">Saldo Fluxo (Capital Físico)</span>
             <span className={cn("text-3xl font-mono tracking-tighter drop-shadow-lg", mockStockFlow.saldoFluxo < 0 ? "text-red-400" : "text-emerald-400")}>
               {formatCurrency(mockStockFlow.saldoFluxo)}
             </span>
             <span className="block mt-3 text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
               Diferença entre o capital injetado no estoque e o volume físico escoado.
             </span>
           </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
         <Card className="bg-[#0a0a0a] border-neutral-900">
            <CardHeader className="border-b border-neutral-900/50 pb-4">
              <CardTitle className="text-[11px] font-mono text-neutral-400 tracking-widest uppercase">Registro de Pagamento (Fornecedores)</CardTitle>
            </CardHeader>
            <div className="p-0">
               <ul className="divide-y divide-neutral-900/50">
                  {mockStockFlow.entries.map((item, i) => (
                    <li key={i} className="p-5 flex items-center justify-between hover:bg-[#121212] transition-colors group">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                           <div className="absolute inset-0 bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <Package className="w-4 h-4 text-emerald-500 relative z-10" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <span className="text-sm font-medium text-white tracking-wide">{item.description}</span>
                           <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">{format(new Date(item.date), "dd MMM", { locale: ptBR })}</span>
                         </div>
                       </div>
                       <span className="font-mono text-sm text-emerald-400 tabular-nums drop-shadow-sm group-hover:scale-105 transition-transform origin-right">+{formatCurrency(item.value)}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </Card>

         <Card className="bg-[#0a0a0a] border-neutral-900">
            <CardHeader className="border-b border-neutral-900/50 pb-4">
              <CardTitle className="text-[11px] font-mono text-neutral-400 tracking-widest uppercase">Baixa Diária Consolidada (CMV)</CardTitle>
            </CardHeader>
             <div className="p-0">
               <ul className="divide-y divide-neutral-900/50">
                  {mockStockFlow.exits.map((item, i) => (
                    <li key={i} onClick={() => setSelectedDay(item)} className="p-5 flex items-center justify-between cursor-pointer hover:bg-[#121212] transition-colors group">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-pink-500/5 border border-pink-500/10 flex items-center justify-center relative overflow-hidden">
                           <div className="absolute inset-0 bg-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <TrendingDown className="w-4 h-4 text-pink-500 relative z-10" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <span className="text-sm font-medium text-white group-hover:text-pink-400 transition-colors tracking-wide">Vendas do dia {format(new Date(item.date), "dd/MM", { locale: ptBR })}</span>
                           <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">CMV (Custo Mercadoria)</span>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <span className="font-mono text-[14px] text-neutral-300 tabular-nums">-{formatCurrency(item.value)}</span>
                         <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:bg-pink-500 group-hover:border-pink-500 transition-colors">
                           <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" />
                         </div>
                       </div>
                    </li>
                  ))}
               </ul>
            </div>
         </Card>
       </div>

       <Drawer isOpen={!!selectedDay} onClose={() => setSelectedDay(null)} title="Detalhamento da Baixa (CMV)">
         {selectedDay && (
           <div className="space-y-6 mt-4">
             <div className="bg-[#121212] border border-neutral-800 shadow-inner p-6 rounded-xl flex items-center justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                   <span className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-widest block mb-2">Referência Operacional</span>
                   <span className="text-xl font-medium text-white tracking-tight">{format(new Date(selectedDay.date), "dd 'de' MMMM", { locale: ptBR })}</span>
                </div>
                <div className="text-right relative z-10">
                   <span className="text-[10px] font-mono font-medium text-pink-500 uppercase tracking-widest block mb-2">CMV Total Exigido</span>
                   <span className="text-xl font-mono text-white tracking-tighter drop-shadow-md">{formatCurrency(selectedDay.value)}</span>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-widest">Produtos Baixados no Período</h3>
                
                <table className="w-full text-left font-sans text-sm border-collapse">
                   <thead>
                     <tr className="border-b border-neutral-800 text-neutral-500 text-[10px] font-mono uppercase tracking-widest bg-[#0a0a0a]">
                       <th className="py-3 px-4 font-medium rounded-tl-lg">SKU / Venda</th>
                       <th className="py-3 px-4 font-medium text-center">Qtd</th>
                       <th className="py-3 px-4 font-medium text-right">Custo Unit.</th>
                       <th className="py-3 px-4 font-medium text-right rounded-tr-lg">CMV Somado</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-neutral-900/50 bg-[#121212]">
                     {mockDayDetails.map((detail, idx) => (
                       <tr key={idx} className="text-neutral-300 hover:bg-[#1a1a1a] transition-colors">
                         <td className="py-4 px-4 font-mono text-[11px]">{detail.sku}</td>
                         <td className="py-4 px-4 text-center text-xs font-medium text-neutral-400">{detail.qty}x</td>
                         <td className="py-4 px-4 text-right font-mono text-xs text-neutral-500">{formatCurrency(detail.unitCost)}</td>
                         <td className="py-4 px-4 text-right font-mono text-[13px] text-white tracking-tight">{formatCurrency(detail.total)}</td>
                       </tr>
                     ))}
                   </tbody>
                   <tfoot>
                      <tr className="border-t border-neutral-800 bg-[#0a0a0a]">
                         <td colSpan={3} className="py-4 px-4 text-right text-[10px] font-mono uppercase text-neutral-500 tracking-widest">Soma Auditada:</td>
                         <td className="py-4 px-4 text-right font-mono text-sm tracking-tight text-pink-400 drop-shadow-sm">{formatCurrency(selectedDay.value)}</td>
                      </tr>
                   </tfoot>
                </table>
             </div>

             <div className="bg-pink-500/5 border border-pink-500/10 p-5 rounded-xl flex items-start gap-4 mt-6">
                <div className="text-[11px] font-mono uppercase tracking-widest text-pink-500/80 leading-relaxed font-medium">
                   Nota Técnica: O CMV é a soma dos custos individuais físicos. Representa o capital de fato consumido na operação para realizar as receitas do dia listadas.
                </div>
             </div>
           </div>
         )}
       </Drawer>
    </div>
  );
}
