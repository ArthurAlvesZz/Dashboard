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
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border shadow-sm relative overflow-hidden group">
           <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">Total Compras (Entrada)</span>
             </div>
             <span className="text-2xl font-bold font-mono text-foreground tracking-tight">{formatCurrency(mockStockFlow.comprasMes)}</span>
           </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-sm relative overflow-hidden group">
           <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block">Total Baixado (CMV)</span>
             </div>
             <span className="text-2xl font-bold font-mono text-foreground tracking-tight">{formatCurrency(mockStockFlow.custoSaida)}</span>
           </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-sm relative overflow-hidden group">
           <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           <CardContent className="p-6">
             <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] uppercase font-semibold text-amber-500 tracking-wider block text-shadow-sm">Necessidade Reposição</span>
             </div>
             <span className="text-2xl font-bold font-mono text-amber-500 tracking-tight drop-shadow-sm">{formatCurrency(mockStockFlow.necessidadeReposicao)}</span>
           </CardContent>
        </Card>
         <Card className="bg-muted/10 border-border shadow-sm relative overflow-hidden group">
           <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
           <CardContent className="p-6 relative z-10">
             <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block mb-2">Saldo Fluxo (Capital Físico)</span>
             <span className={cn("text-3xl font-bold font-mono tracking-tight", mockStockFlow.saldoFluxo < 0 ? "text-destructive" : "text-emerald-500")}>
               {formatCurrency(mockStockFlow.saldoFluxo)}
             </span>
             <span className="block mt-3 text-[10px] text-muted-foreground font-semibold uppercase tracking-wider leading-relaxed">
               Diferença entre o capital injetado no estoque e o volume físico escoado.
             </span>
           </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
         <Card className="bg-card border-border shadow-sm">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">Registro de Pagamento (Fornecedores)</CardTitle>
            </CardHeader>
            <div className="p-0">
               <ul className="divide-y divide-border/50">
                  {mockStockFlow.entries.map((item, i) => (
                    <li key={i} className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center relative overflow-hidden">
                           <div className="absolute inset-0 bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <Package className="w-4 h-4 text-emerald-500 relative z-10" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <span className="text-sm font-semibold text-foreground tracking-tight">{item.description}</span>
                           <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{format(new Date(item.date), "dd MMM", { locale: ptBR })}</span>
                         </div>
                       </div>
                       <span className="font-mono font-bold text-sm text-emerald-500 tabular-nums drop-shadow-sm group-hover:scale-105 transition-transform origin-right">+{formatCurrency(item.value)}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </Card>

         <Card className="bg-card border-border shadow-sm">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">Baixa Diária Consolidada (CMV)</CardTitle>
            </CardHeader>
             <div className="p-0">
               <ul className="divide-y divide-border/50">
                  {mockStockFlow.exits.map((item, i) => (
                    <li key={i} onClick={() => setSelectedDay(item)} className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors group">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center relative overflow-hidden">
                           <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <TrendingDown className="w-4 h-4 text-primary relative z-10" />
                         </div>
                         <div className="flex flex-col gap-1">
                           <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">Vendas do dia {format(new Date(item.date), "dd/MM", { locale: ptBR })}</span>
                           <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">CMV (Custo Mercadoria)</span>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <span className="font-mono font-bold text-[14px] text-foreground tabular-nums">-{formatCurrency(item.value)}</span>
                         <div className="w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                           <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
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
             <div className="bg-muted/30 border border-border shadow-sm p-6 rounded-xl flex items-center justify-between relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                   <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-2">Referência Operacional</span>
                   <span className="text-xl font-bold text-foreground tracking-tight">{format(new Date(selectedDay.date), "dd 'de' MMMM", { locale: ptBR })}</span>
                </div>
                <div className="text-right relative z-10">
                   <span className="text-[10px] font-semibold text-primary uppercase tracking-wider block mb-2">CMV Total Exigido</span>
                   <span className="text-xl font-mono font-bold text-foreground tracking-tight drop-shadow-sm">{formatCurrency(selectedDay.value)}</span>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Produtos Baixados no Período</h3>
                
                <table className="w-full text-left font-sans text-sm border-collapse">
                   <thead>
                     <tr className="border-b border-border text-muted-foreground text-[10px] uppercase font-semibold tracking-wider bg-muted/20">
                       <th className="py-3 px-4 rounded-tl-lg">SKU / Venda</th>
                       <th className="py-3 px-4 text-center">Qtd</th>
                       <th className="py-3 px-4 text-right">Custo Unit.</th>
                       <th className="py-3 px-4 text-right rounded-tr-lg">CMV Somado</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/50 bg-card">
                     {mockDayDetails.map((detail, idx) => (
                       <tr key={idx} className="text-foreground hover:bg-muted/10 transition-colors">
                         <td className="py-4 px-4 font-mono font-semibold text-[11px]">{detail.sku}</td>
                         <td className="py-4 px-4 text-center text-xs font-semibold text-muted-foreground">{detail.qty}x</td>
                         <td className="py-4 px-4 text-right font-mono font-semibold text-xs text-muted-foreground">{formatCurrency(detail.unitCost)}</td>
                         <td className="py-4 px-4 text-right font-mono font-bold text-[13px] text-foreground tracking-tight">{formatCurrency(detail.total)}</td>
                       </tr>
                     ))}
                   </tbody>
                   <tfoot>
                      <tr className="border-t border-border bg-muted/20">
                         <td colSpan={3} className="py-4 px-4 text-right text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Soma Auditada:</td>
                         <td className="py-4 px-4 text-right font-mono text-sm font-bold tracking-tight text-primary drop-shadow-sm">{formatCurrency(selectedDay.value)}</td>
                      </tr>
                   </tfoot>
                </table>
             </div>

             <div className="bg-primary/5 border border-primary/10 p-5 rounded-xl flex items-start gap-4 mt-6">
                <div className="text-[11px] uppercase tracking-wider text-primary/80 leading-relaxed font-bold">
                   Nota Técnica: O CMV é a soma dos custos individuais físicos. Representa o capital de fato consumido na operação para realizar as receitas do dia listadas.
                </div>
             </div>
           </div>
         )}
       </Drawer>
    </div>
  );
}
