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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPIBox title="Entregas Mês Atual" value={mockDeliveryCosts.length.toString()} />
        <KPIBox title="Entregas Sem Custo Real" value={missingCost.toString()} alert={missingCost > 0} />
        <KPIBox title="Custo Médio Absorvido" value={formatCurrency(avgAbsorbed)} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
        <div className="relative max-w-md w-full flex items-center gap-2">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Buscar pedido, método..." 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 transition-colors placeholder:text-neutral-600"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
        <div className="flex gap-2">
           <select className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium rounded-lg px-3 py-2 focus:outline-none">
              <option>Todas as Lojas</option>
              <option>Araguari</option>
              <option>Uberlândia</option>
           </select>
           <select className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium rounded-lg px-3 py-2 focus:outline-none">
              <option>Status: Todos</option>
              <option>Sem custo preenchido</option>
              <option>Prejuízo</option>
              <option>Sobra</option>
           </select>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-neutral-800 flex flex-row items-center justify-between">
          <CardTitle>Auditoria de Fretes</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 font-medium">Pedido / Data</th>
                <th className="px-5 py-3 font-medium">Método / Loja</th>
                <th className="px-5 py-3 font-medium text-right">Cobrado (Cliente)</th>
                <th className="px-5 py-3 font-medium text-right">Custo Real</th>
                <th className="px-5 py-3 font-medium text-right">Diferença</th>
                <th className="px-5 py-3 font-medium text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
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
                  <tr key={doc.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="px-5 py-4">
                       <div className="flex flex-col">
                          <span className="font-mono text-sm text-white mb-0.5">{doc.order}</span>
                          <span className="text-xs text-neutral-500">12/06/2026</span>
                        </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                          <span className="text-sm text-neutral-300 mb-0.5">{doc.method}</span>
                          <span className="text-xs text-neutral-500">{doc.store}</span>
                        </div>
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-sm">
                      {formatCurrency(doc.charged)}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-sm">
                       {doc.status === 'pendente' ? (
                         <span className="text-amber-500 flex items-center justify-end gap-1"><AlertCircle className="w-3 h-3"/> Pendente</span>
                       ) : (
                         <span className="text-white">{formatCurrency(doc.realCost)}</span>
                       )}
                    </td>
                    <td className="px-5 py-4 text-right">
                       {doc.status === 'pendente' ? '--' : (
                          <div className={cn("flex items-center justify-end gap-1.5 font-mono text-sm", diffColor)}>
                             {doc.diff < 0 ? 'Absorvido:' : doc.diff > 0 ? 'Sobra:' : ''}
                             {formatCurrency(Math.abs(doc.diff))}
                             {DiffIcon && <DiffIcon className="w-3 h-3" />}
                          </div>
                       )}
                    </td>
                    <td className="px-5 py-4 text-right">
                       <button onClick={() => setSelectedCost(doc)} className="text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1.5">
                          <Edit2 className="w-3 h-3" />
                          {doc.status === 'pendente' ? 'Preencher' : 'Ajustar'}
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
    <Card className={`bg-neutral-900 ${alert ? "border-amber-500/30" : "border-neutral-800"}`}>
      <CardContent className="p-6">
        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2 flex items-center justify-between">
          <span className={alert ? "text-amber-500" : ""}>{title}</span>
          {alert && <AlertCircle className="w-4 h-4 text-amber-500" />}
        </h3>
        <div className={`text-3xl font-mono tracking-tight ${alert ? "text-amber-500" : "text-white"}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
