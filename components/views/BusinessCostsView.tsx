import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockBusinessCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Plus, Filter, Calendar as CalendarIcon, Repeat, MoreHorizontal, Check } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Drawer } from '@/components/ui/Drawer';

export function BusinessCostsView() {
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [costToDelete, setCostToDelete] = useState<typeof mockBusinessCosts[0] | null>(null);

  // Deriving stats from mockData for visual effect instead of hardcoding
  const paidStats = mockBusinessCosts.filter(c => c.status === 'pago').reduce((acc, c) => acc + c.value, 0);
  const openStats = mockBusinessCosts.filter(c => c.status !== 'pago').reduce((acc, c) => acc + c.value, 0);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2">Custos Operacionais Pagos</h3>
            <div className="text-3xl font-mono text-emerald-500 tracking-tight">{formatCurrency(paidStats || 12000)}</div>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2">Custos Operacionais em Aberto</h3>
            <div className="text-3xl font-mono text-amber-500 tracking-tight">{formatCurrency(openStats || 4500)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
        <div className="relative max-w-md w-full flex items-center gap-2">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Buscar por descrição, categoria..." 
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-700 transition-colors placeholder:text-neutral-600"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
           <button onClick={() => setIsCategoriesOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-700 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Categorias
          </button>
          <button onClick={() => setIsNewExpenseOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Despesa
          </button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-medium whitespace-nowrap">Vencimento</th>
                <th className="px-5 py-4 font-medium">Descrição / Categoria</th>
                <th className="px-5 py-4 font-medium">Tipo / Loja</th>
                <th className="px-5 py-4 font-medium text-right">Valor</th>
                <th className="px-5 py-4 font-medium text-right">Status</th>
                <th className="px-5 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {mockBusinessCosts.map((cost) => {
                 let statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                 let statusLabel = cost.status;

                 if (cost.status === 'pago') {
                   statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                   statusLabel = "Pago";
                 } else if (cost.status === 'vencendo') {
                   statusColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                   statusLabel = "Vencendo (Próx 7d)";
                 } else if (cost.status === 'pendente' || cost.status === 'em aberto') {
                   statusColor = "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
                   statusLabel = "Em Aberto";
                 } else {
                    statusColor = "bg-red-500/10 text-red-500 border-red-500/20";
                    statusLabel = "Atrasado";
                 }

                return (
                  <tr key={cost.id} className="hover:bg-neutral-900/50 transition-colors group">
                    <td className="px-5 py-3 whitespace-nowrap text-neutral-300">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-3.5 h-3.5 text-neutral-500" />
                        {format(new Date(cost.date), "dd MMM, yyyy", { locale: ptBR })}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{cost.summary}</span>
                          {cost.recurrence && <div title="Despesa Recorrente"><Repeat className="w-3 h-3 text-sky-400" /></div>}
                        </div>
                        <span className="text-[11px] text-neutral-500 mt-0.5">{cost.category}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs">
                       <div className="flex flex-col">
                        <span className="text-neutral-400">{cost.type}</span>
                        <span className="text-neutral-600 mt-0.5">{cost.store}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                       <span className="font-mono text-sm text-white tracking-tight">{formatCurrency(cost.value)}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                       <span className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {cost.status !== 'pago' && (
                          <button className="text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5">
                            <Check className="w-3 h-3" />
                            Pago
                          </button>
                        )}
                        <button onClick={() => setCostToDelete(cost)} className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors" title="Excluir">
                           <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer isOpen={isNewExpenseOpen} onClose={() => setIsNewExpenseOpen(false)} title="Nova Despesa">
         <div className="space-y-4">
           <div>
             <label className="text-xs text-neutral-500 mb-1 block">Descrição</label>
             <input type="text" placeholder="Ex: Aluguel Loja XYZ" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-700" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="text-xs text-neutral-500 mb-1 block">Valor (R$)</label>
               <input type="number" placeholder="0.00" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-neutral-700" />
             </div>
             <div>
               <label className="text-xs text-neutral-500 mb-1 block">Vencimento</label>
               <input type="date" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-700" />
             </div>
           </div>
           <div>
             <label className="text-xs text-neutral-500 mb-1 block">Categoria</label>
             <select className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-700">
               <option>Infraestrutura</option>
               <option>Insumos</option>
               <option>Marketing</option>
             </select>
           </div>
           <div>
             <label className="text-xs text-neutral-500 mb-1 block">Tipo de Custo (Rateio)</label>
             <select className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-700">
               <option>Custo Fixo Mensal</option>
               <option>Custo Variável (Rateio por Faturamento)</option>
             </select>
           </div>
           <div>
             <label className="text-xs text-neutral-500 block mb-2 mt-4">Recorrência Mensal</label>
             <label className="flex items-center gap-2 cursor-pointer bg-neutral-900 border border-neutral-800 p-3 rounded-lg">
               <input type="checkbox" className="custom-checkbox w-4 h-4 rounded border-neutral-700 bg-neutral-950 checked:bg-emerald-500 checked:border-emerald-500" />
               <span className="text-sm text-white">Essa despesa se repete todo mês</span>
             </label>
           </div>
           <div className="pt-4 mt-4 border-t border-neutral-800 flex gap-3">
             <button onClick={() => setIsNewExpenseOpen(false)} className="px-4 py-2 bg-neutral-900 text-neutral-300 font-medium text-sm rounded-lg hover:bg-neutral-800 transition-colors w-full">Cancelar</button>
             <button className="px-4 py-2 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-colors w-full">Salvar Despesa</button>
           </div>
         </div>
      </Drawer>

      <Drawer isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} title="Categorias de Custo">
         <div className="space-y-4 flex flex-col h-full">
           <div className="flex gap-2">
             <input type="text" placeholder="Nome da Categoria..." className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-700" />
             <button className="px-3 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 flex items-center gap-1"><Plus className="w-4 h-4"/> Nova</button>
           </div>
           <div className="flex-1 overflow-y-auto space-y-2 mt-4">
             {['Infraestrutura', 'Insumos', 'Marketing', 'Manutenção', 'Equipe e RH', 'Sistemas'].map((cat, i) => (
               <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-neutral-800 bg-neutral-900/50">
                 <span className="text-sm text-white">{cat}</span>
                 <button className="text-xs font-medium text-red-500 hover:text-red-400">Remover</button>
               </div>
             ))}
           </div>
         </div>
      </Drawer>

      <Drawer isOpen={!!costToDelete} onClose={() => setCostToDelete(null)} title="Excluir Despesa">
         {costToDelete && (
           <div className="space-y-6">
             <p className="text-neutral-300 text-sm">Você está prestes a excluir: <strong className="text-white">{costToDelete.summary}</strong> no valor de <strong className="text-white">{formatCurrency(costToDelete.value)}</strong>.</p>
             
             {costToDelete.recurrence && (
               <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg space-y-3">
                 <h4 className="text-sm font-medium text-amber-500 flex items-center gap-2">
                   <Repeat className="w-4 h-4" /> Despesa Recorrente
                 </h4>
                 <div className="flex flex-col gap-2">
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-300">
                     <input type="radio" name="delete_scope" defaultChecked className="text-emerald-500 focus:ring-emerald-500 bg-neutral-900 border-neutral-700" />
                     Apagar apenas esta cobrança ({format(new Date(costToDelete.date), "dd/MM", { locale: ptBR })})
                   </label>
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-300">
                     <input type="radio" name="delete_scope" className="text-emerald-500 focus:ring-emerald-500 bg-neutral-900 border-neutral-700" />
                     Apagar esta e as cobranças futuras
                   </label>
                 </div>
               </div>
             )}

             <div className="flex gap-3">
               <button onClick={() => setCostToDelete(null)} className="flex-1 px-4 py-2.5 bg-neutral-900 text-white font-medium text-sm rounded-lg hover:bg-neutral-800 transition-colors">Cancelar</button>
               <button className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-lg transition-colors">Sim, Excluir</button>
             </div>
           </div>
         )}
      </Drawer>

    </div>
  );
}
