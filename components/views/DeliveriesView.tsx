import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDeliveryCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Filter, AlertCircle, Edit2, TrendingDown, TrendingUp } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

export function DeliveriesView() {
  const [selectedCost, setSelectedCost] = useState<typeof mockDeliveryCosts[0] | null>(null);

  // Deriving values from mock
  const missingCost = mockDeliveryCosts.filter(c => c.status === 'pendente').length;
  const avgAbsorbed = 12.50; // Mock derived value

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIBox title="Entregas Fechadas (Mês)" value={mockDeliveryCosts.length.toString()} />
        <KPIBox title="Auditoria Pendente (Sem Custo Real)" value={missingCost.toString()} alert={missingCost > 0} />
        <KPIBox title="Prejuízo Médio / Absorção Absoluta" value={formatCurrency(avgAbsorbed)} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
        <div className="relative max-w-md w-full flex items-center gap-2 group">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-pink-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por ID do pedido, método ou cliente..." 
              className="w-full bg-[#0a0a0a] border border-neutral-900 rounded-lg pl-10 pr-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-pink-500/50 transition-all font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] placeholder:text-neutral-600"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-neutral-900 text-neutral-400 text-[11px] font-mono tracking-widest uppercase font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-all shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Filtros
          </button>
        </div>
        <div className="flex gap-2 shrink-0">
           <select className="bg-[#0a0a0a] border border-neutral-900 text-neutral-300 text-[11px] uppercase tracking-widest font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500/50 transition-colors cursor-pointer">
              <option>Cadeia Global</option>
              <option>Origem: Araguari</option>
              <option>Origem: Uberlândia</option>
           </select>
           <select className="bg-[#0a0a0a] border border-neutral-900 text-neutral-300 text-[11px] uppercase tracking-widest font-mono rounded-lg px-4 py-2.5 focus:outline-none focus:border-pink-500/50 transition-colors cursor-pointer">
              <option>Matriz Inteira</option>
              <option>Auditoria: Aberto</option>
              <option>Filtro: Prejuízo</option>
              <option>Filtro: Positivo</option>
           </select>
        </div>
      </div>

      <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl relative overflow-hidden mt-2">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-[#121212]/50 border-b border-neutral-900 text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-mono">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Nota da Ordem</th>
                <th className="px-6 py-4 font-medium">Classificação Logística</th>
                <th className="px-6 py-4 font-medium text-right">Faturamento (Cliente)</th>
                <th className="px-6 py-4 font-medium text-right">Liquidação (Terceiro)</th>
                <th className="px-6 py-4 font-medium text-right">Eficiência</th>
                <th className="px-5 py-4 font-medium text-right w-24">Painel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/50 text-neutral-300">
              {mockDeliveryCosts.map((doc) => {
                 let diffColor = "text-neutral-500";
                 let DiffIcon = null;
                 if (doc.diff < 0) {
                   diffColor = "text-red-400";
                   DiffIcon = TrendingDown;
                 } else if (doc.diff > 0) {
                   diffColor = "text-emerald-400";
                   DiffIcon = TrendingUp;
                 }

                return (
                  <tr key={doc.id} className="hover:bg-[#121212] transition-colors group">
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                          <span className="font-mono text-sm text-white tracking-widest">{doc.order}</span>
                          <span className="text-[10px] uppercase tracking-widest font-mono text-neutral-500">12 JUN 2026</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-white">{doc.method}</span>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded w-max">{doc.store}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[14px]">
                      {formatCurrency(doc.charged)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[14px]">
                       {doc.status === 'pendente' ? (
                         <span className="text-amber-500 flex items-center justify-end gap-1.5 text-[11px] uppercase tracking-widest"><AlertCircle className="w-3.5 h-3.5"/> Preenchimento</span>
                       ) : (
                         <span className="text-white tabular-nums drop-shadow-sm">{formatCurrency(doc.realCost)}</span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       {doc.status === 'pendente' ? (
                          <span className="text-neutral-600 font-mono text-sm">--</span>
                       ) : (
                          <div className={cn("flex flex-col items-end gap-0.5", diffColor)}>
                             <div className="flex items-center gap-1.5 font-mono text-[14px]">
                               {formatCurrency(Math.abs(doc.diff))}
                               {DiffIcon && <DiffIcon className="w-3.5 h-3.5" />}
                             </div>
                             <span className="text-[9px] uppercase tracking-widest opacity-80">{doc.diff < 0 ? 'Absorvido' : doc.diff > 0 ? 'Superávit' : ''}</span>
                          </div>
                       )}
                    </td>
                    <td className="px-5 py-4 text-right">
                       <button onClick={() => setSelectedCost(doc)} className="text-[10px] uppercase tracking-widest font-mono font-medium text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 px-3 py-2 rounded transition-colors inline-flex items-center gap-2 active:scale-95 shadow-sm border border-pink-500/20 opacity-0 group-hover:opacity-100">
                          <Edit2 className="w-3 h-3" />
                          {doc.status === 'pendente' ? 'Definir' : 'Revisar'}
                       </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer isOpen={!!selectedCost} onClose={() => setSelectedCost(null)} title="Preencher Custo Real">
         {selectedCost && (
           <div className="space-y-6">
             <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
               <div>
                  <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Pedido</span>
                  <span className="font-mono text-lg text-white">{selectedCost.order}</span>
               </div>
               <div className="text-right">
                  <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">Cobrado do Cliente</span>
                  <span className="font-mono text-lg text-emerald-400">{formatCurrency(selectedCost.charged)}</span>
               </div>
             </div>

             <div className="space-y-4">
                <div>
                  <label className="text-xs text-neutral-500 mb-1 block">Custo Real (R$)</label>
                  <input type="number" defaultValue={selectedCost.realCost === 0 ? '' : selectedCost.realCost} placeholder="Ex: 25.00" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-3 font-mono text-white text-lg focus:outline-none focus:border-neutral-700" />
                </div>
                
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg flex items-start gap-3">
                   <AlertCircle className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
                   <div className="text-xs text-neutral-400 leading-relaxed">
                      Ao preencher o custo real, o sistema recalculará automaticamente a lucratividade líquida deste pedido no histórico financeiro.
                   </div>
                </div>

                <div className="pt-4 flex gap-3">
                   <button onClick={() => setSelectedCost(null)} className="flex-1 px-4 py-3 bg-neutral-900 text-neutral-300 font-medium text-sm rounded-lg hover:bg-neutral-800 transition-colors">Cancelar</button>
                   <button className="flex-1 px-4 py-3 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-colors">Salvar Custo</button>
                </div>
             </div>
           </div>
         )}
      </Drawer>
    </div>
  );
}

function KPIBox({ title, value, alert }: { title: string, value: string, alert?: boolean }) {
  return (
    <Card className={`relative overflow-hidden group shadow-xl ${alert ? "bg-[#1a0f0f] border-red-500/30" : "bg-[#0a0a0a] border-neutral-900"}`}>
      {alert && <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none animate-pulse" />}
      {!alert && <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />}
      <CardContent className="p-8 relative z-10">
        <h3 className="text-[10px] font-mono font-medium uppercase tracking-widest mb-3 flex items-center gap-2">
          {alert && <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />}
          {!alert && <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />}
          <span className={alert ? "text-red-400" : "text-neutral-500"}>{title}</span>
        </h3>
        <div className={`text-4xl font-mono tracking-tighter ${alert ? "text-red-500 drop-shadow-md" : "text-white"}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
