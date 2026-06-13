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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-widest">Custos Operacionais Pagos</h3>
            </div>
            <div className="text-4xl font-mono text-white tracking-tighter mt-4 flex items-baseline gap-2">
               <span className="text-xl text-neutral-500 font-sans tracking-normal">R$</span>
               {formatCurrency(paidStats || 12000).replace('R$ ', '')}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-amber-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
              <h3 className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-widest">Despesas em Aberto</h3>
            </div>
            <div className="text-4xl font-mono text-white tracking-tighter mt-4 flex items-baseline gap-2">
               <span className="text-xl text-neutral-500 font-sans tracking-normal">R$</span>
               {formatCurrency(openStats || 4500).replace('R$ ', '')}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-6">
        <div className="relative max-w-md w-full flex items-center gap-2 group">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-pink-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por descrição, classificação..." 
              className="w-full bg-[#0a0a0a] border border-neutral-900 rounded-lg pl-10 pr-4 py-2.5 text-sm text-neutral-200 focus:outline-none focus:border-pink-500/50 transition-all font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] placeholder:text-neutral-600"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border border-neutral-900 text-neutral-400 text-[11px] font-mono tracking-widest uppercase font-medium rounded-lg hover:text-white hover:border-neutral-700 transition-all shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Filtros
          </button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
           <button onClick={() => setIsCategoriesOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] border border-neutral-900 text-neutral-300 text-[11px] font-mono tracking-widest uppercase font-medium rounded-lg hover:bg-[#121212] transition-colors shadow-lg">
            Plano de Contas
          </button>
          <button onClick={() => setIsNewExpenseOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 py-2.5 bg-white text-black text-[11px] font-mono tracking-widest uppercase font-bold rounded-lg hover:bg-neutral-200 transition-transform active:scale-95 shadow-lg">
            <Plus className="w-4 h-4" />
            Nova Obrigação
          </button>
        </div>
      </div>

      <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl relative overflow-hidden mt-4">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-[#121212]/50 border-b border-neutral-900 text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-mono">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Vencimento</th>
                <th className="px-6 py-4 font-medium">Classificação Contábil</th>
                <th className="px-6 py-4 font-medium">Centro de Custo (Rateio)</th>
                <th className="px-6 py-4 font-medium text-right">Valor Líquido</th>
                <th className="px-6 py-4 font-medium text-right">Situação</th>
                <th className="px-5 py-4 font-medium text-right w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/50 text-neutral-300">
              {mockBusinessCosts.map((cost) => {
                 let statusColor = "bg-sky-500/10 text-sky-400 border-sky-500/20";
                 let statusLabel = cost.status;

                 if (cost.status === 'pago') {
                   statusColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
                   statusLabel = "Liquidado";
                 } else if (cost.status === 'vencendo') {
                   statusColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                   statusLabel = "Vencendo (7d)";
                 } else if (cost.status === 'pendente' || cost.status === 'em aberto') {
                   statusColor = "bg-[#121212] text-neutral-400 border-neutral-800";
                   statusLabel = "Em Aberto";
                 } else {
                    statusColor = "bg-red-500/10 text-red-500 border-red-500/20";
                    statusLabel = "Atrasado";
                 }

                return (
                  <tr key={cost.id} className="hover:bg-[#121212] transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-4 h-4 text-neutral-600" />
                        <span className="font-mono text-[12px] tracking-widest text-neutral-300 uppercase">{format(new Date(cost.date), "dd MMM, yyyy", { locale: ptBR })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[13px] text-white tracking-wide">{cost.summary}</span>
                          {cost.recurrence && <div title="Despesa Recorrente"><Repeat className="w-3.5 h-3.5 text-pink-500" /></div>}
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">{cost.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">{cost.type}</span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-600 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded inline-block w-max">{cost.store}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="font-mono text-[14px] text-white tracking-tight tabular-nums">{formatCurrency(cost.value)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded text-[9px] font-mono tracking-widest uppercase border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {cost.status !== 'pago' && (
                          <button className="text-[9px] uppercase tracking-widest font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5 active:scale-95">
                            <Check className="w-3 h-3" />
                            Baixar
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
