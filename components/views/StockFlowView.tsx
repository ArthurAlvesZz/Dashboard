import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockStockFlow } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function StockFlowView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
           <CardContent className="p-5">
             <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">Total Compras (Entrada)</span>
             <span className="text-2xl font-mono text-white tracking-tight">{formatCurrency(mockStockFlow.comprasMes)}</span>
           </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-800">
           <CardContent className="p-5">
             <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">Custo Saída (CMV)</span>
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
             <span className="text-xs text-neutral-500 uppercase tracking-widest block mb-2">Saldo Fluxo (Caixa)</span>
             <span className={cn("text-2xl font-mono tracking-tight", mockStockFlow.saldoFluxo < 0 ? "text-red-400" : "text-emerald-400")}>
               {formatCurrency(mockStockFlow.saldoFluxo)}
             </span>
             <span className="block mt-1 text-[10px] text-neutral-500">Capital imobilizado vs girado</span>
           </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader className="border-b border-neutral-800">
              <CardTitle>Entradas de Compras (Lotes)</CardTitle>
            </CardHeader>
            <div className="p-0">
               <ul className="divide-y divide-neutral-800">
                  {mockStockFlow.entries.map((item, i) => (
                    <li key={i} className="p-4 flex items-center justify-between">
                       <div className="flex flex-col">
                         <span className="text-sm font-medium text-white">{item.description}</span>
                         <span className="text-xs text-neutral-500 mt-1">{format(new Date(item.date), "dd MMM", { locale: ptBR })}</span>
                       </div>
                       <span className="font-mono text-sm text-emerald-400">+{formatCurrency(item.value)}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </Card>

         <Card>
            <CardHeader className="border-b border-neutral-800">
              <CardTitle>Saída Diária Consolidada (Custo CMV)</CardTitle>
            </CardHeader>
             <div className="p-0">
               <ul className="divide-y divide-neutral-800">
                  {mockStockFlow.exits.map((item, i) => (
                    <li key={i} className="p-4 flex items-center justify-between">
                       <div className="flex flex-col">
                         <span className="text-sm font-medium text-white">Saídas do dia</span>
                         <span className="text-xs text-neutral-500 mt-1">{format(new Date(item.date), "dd MMM", { locale: ptBR })}</span>
                       </div>
                       <span className="font-mono text-sm text-red-400">-{formatCurrency(item.value)}</span>
                    </li>
                  ))}
               </ul>
            </div>
         </Card>
       </div>
    </div>
  );
}
