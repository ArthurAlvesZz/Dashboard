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
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Custos Operacionais Pagos</h3>
            </div>
            <div className="text-3xl font-bold text-foreground tracking-tight mt-4 flex items-baseline gap-1.5">
               <span className="text-lg text-muted-foreground font-normal">R$</span>
               {formatCurrency(paidStats || 12000).replace('R$ ', '')}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-sm relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-amber-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardContent className="p-8 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Despesas em Aberto</h3>
            </div>
            <div className="text-3xl font-bold text-foreground tracking-tight mt-4 flex items-baseline gap-1.5">
               <span className="text-lg text-muted-foreground font-normal">R$</span>
               {formatCurrency(openStats || 4500).replace('R$ ', '')}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-6">
        <div className="relative max-w-md w-full flex items-center gap-2 group">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por descrição, classificação..." 
              className="w-full bg-card border border-border shadow-sm rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border text-foreground text-xs font-medium rounded-lg hover:bg-accent transition-all shrink-0 shadow-sm">
            <Filter className="w-4 h-4 text-muted-foreground" />
            Filtros
          </button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
           <button onClick={() => setIsCategoriesOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2.5 bg-muted text-foreground text-xs font-semibold rounded-lg hover:bg-accent transition-colors">
            Plano de Contas
          </button>
          <button onClick={() => setIsNewExpenseOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-transform active:scale-95 shadow-sm">
            <Plus className="w-4 h-4" />
            Nova Obrigação
          </button>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden mt-4">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm min-w-[800px]">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Vencimento</th>
                <th className="px-6 py-4 font-medium">Classificação Contábil</th>
                <th className="px-6 py-4 font-medium">Centro de Custo (Rateio)</th>
                <th className="px-6 py-4 font-medium text-right">Valor Líquido</th>
                <th className="px-6 py-4 font-medium text-right">Situação</th>
                <th className="px-5 py-4 font-medium text-right w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockBusinessCosts.map((cost) => {
                 let statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                 let statusLabel = cost.status;

                 if (cost.status === 'pago') {
                   statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                   statusLabel = "Liquidado";
                 } else if (cost.status === 'vencendo') {
                   statusColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                   statusLabel = "Vencendo (7d)";
                 } else if (cost.status === 'pendente' || cost.status === 'em aberto') {
                   statusColor = "bg-muted text-muted-foreground border-border";
                   statusLabel = "Em Aberto";
                 } else {
                    statusColor = "bg-destructive/10 text-destructive border-destructive/20";
                    statusLabel = "Atrasado";
                 }

                return (
                  <tr key={cost.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono text-xs tracking-wide text-foreground uppercase">{format(new Date(cost.date), "dd MMM, yyyy", { locale: ptBR })}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-foreground tracking-tight">{cost.summary}</span>
                          {cost.recurrence && <div title="Despesa Recorrente"><Repeat className="w-3.5 h-3.5 text-primary" /></div>}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{cost.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1.5 items-start">
                        <span className="text-[11px] font-medium text-muted-foreground">{cost.type}</span>
                        <span className="text-[10px] uppercase font-semibold text-muted-foreground bg-muted border border-border px-1.5 py-0.5 rounded">{cost.store}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className="font-mono text-sm font-semibold text-foreground tracking-tight tabular-nums">{formatCurrency(cost.value)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {cost.status !== 'pago' && (
                          <button className="text-[10px] uppercase font-semibold tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 active:scale-95 shadow-sm">
                            <Check className="w-3.5 h-3.5" />
                            Baixar
                          </button>
                        )}
                        <button onClick={() => setCostToDelete(cost)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors" title="Excluir">
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
             <label className="text-sm text-foreground mb-1 block">Descrição</label>
             <input type="text" placeholder="Ex: Aluguel Loja XYZ" className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm" />
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="text-sm text-foreground mb-1 block">Valor (R$)</label>
               <input type="number" placeholder="0.00" className="w-full bg-card border border-border rounded-lg px-3 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm" />
             </div>
             <div>
               <label className="text-sm text-foreground mb-1 block">Vencimento</label>
               <input type="date" className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm" />
             </div>
           </div>
           <div>
             <label className="text-sm text-foreground mb-1 block">Categoria</label>
             <select className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm">
               <option>Infraestrutura</option>
               <option>Insumos</option>
               <option>Marketing</option>
             </select>
           </div>
           <div>
             <label className="text-sm text-foreground mb-1 block">Tipo de Custo (Rateio)</label>
             <select className="w-full bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm">
               <option>Custo Fixo Mensal</option>
               <option>Custo Variável (Rateio por Faturamento)</option>
             </select>
           </div>
           <div>
             <label className="text-sm text-foreground block mb-2 mt-4">Recorrência Mensal</label>
             <label className="flex items-center gap-3 cursor-pointer bg-muted/20 border border-border p-3 rounded-xl shadow-sm">
               <input type="checkbox" className="custom-checkbox w-5 h-5 rounded border-muted bg-card checked:bg-primary checked:border-primary transition-colors" />
               <span className="text-sm font-medium text-foreground">Essa despesa se repete todo mês</span>
             </label>
           </div>
           <div className="pt-4 mt-4 border-t border-border flex gap-3">
             <button onClick={() => setIsNewExpenseOpen(false)} className="px-4 py-2.5 bg-muted text-foreground font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-accent hover:text-foreground transition-colors w-full">Cancelar</button>
             <button className="px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors w-full shadow-sm">Salvar Despesa</button>
           </div>
         </div>
      </Drawer>

      <Drawer isOpen={isCategoriesOpen} onClose={() => setIsCategoriesOpen(false)} title="Categorias de Custo">
         <div className="space-y-4 flex flex-col h-full">
           <div className="flex gap-2">
             <input type="text" placeholder="Nome da Categoria..." className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm" />
             <button className="px-3 py-2.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-primary/90 flex items-center gap-1 shadow-sm transition-colors"><Plus className="w-4 h-4"/> Nova</button>
           </div>
           <div className="flex-1 overflow-y-auto space-y-2 mt-4">
             {['Infraestrutura', 'Insumos', 'Marketing', 'Manutenção', 'Equipe e RH', 'Sistemas'].map((cat, i) => (
               <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border bg-card shadow-sm">
                 <span className="text-sm font-medium text-foreground">{cat}</span>
                 <button className="text-xs font-semibold text-destructive hover:text-destructive/80 transition-colors">Remover</button>
               </div>
             ))}
           </div>
         </div>
      </Drawer>

      <Drawer isOpen={!!costToDelete} onClose={() => setCostToDelete(null)} title="Excluir Despesa">
         {costToDelete && (
           <div className="space-y-6">
             <p className="text-muted-foreground text-sm leading-relaxed">Você está prestes a excluir: <strong className="text-foreground">{costToDelete.summary}</strong> no valor de <strong className="text-foreground">{formatCurrency(costToDelete.value)}</strong>.</p>
             
             {costToDelete.recurrence && (
               <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl space-y-3">
                 <h4 className="text-sm font-semibold text-amber-500 flex items-center gap-2">
                   <Repeat className="w-4 h-4" /> Despesa Recorrente
                 </h4>
                 <div className="flex flex-col gap-3">
                   <label className="flex items-center gap-2.5 cursor-pointer text-sm text-foreground font-medium">
                     <input type="radio" name="delete_scope" defaultChecked className="text-primary focus:ring-primary/20 bg-background border-border w-4 h-4" />
                     Apagar apenas esta cobrança ({format(new Date(costToDelete.date), "dd/MM", { locale: ptBR })})
                   </label>
                   <label className="flex items-center gap-2.5 cursor-pointer text-sm text-foreground font-medium">
                     <input type="radio" name="delete_scope" className="text-primary focus:ring-primary/20 bg-background border-border w-4 h-4" />
                     Apagar esta e as cobranças futuras
                   </label>
                 </div>
               </div>
             )}

             <div className="flex gap-3 pt-2">
               <button onClick={() => setCostToDelete(null)} className="flex-1 px-4 py-2.5 bg-muted text-foreground font-semibold text-xs tracking-wider uppercase rounded-lg hover:bg-accent transition-colors">Cancelar</button>
               <button className="flex-1 px-4 py-2.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors shadow-sm">Sim, Excluir</button>
             </div>
           </div>
         )}
      </Drawer>

    </div>
  );
}
