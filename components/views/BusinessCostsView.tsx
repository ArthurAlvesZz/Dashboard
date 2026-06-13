import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockBusinessCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Plus, Filter, Calendar as CalendarIcon, Repeat, MoreHorizontal, Check, Anchor, Activity, Tags } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Drawer } from '@/components/ui/Drawer';

export function BusinessCostsView() {
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [costToDelete, setCostToDelete] = useState<typeof mockBusinessCosts[0] | null>(null);

  // Deriving stats from mockData for visual effect instead of hardcoding
  const fixedCosts = mockBusinessCosts.filter(c => c.type === 'Custo Fixo').reduce((acc, c) => acc + c.value, 0);
  const variableCosts = mockBusinessCosts.filter(c => c.type === 'Custo Variável').reduce((acc, c) => acc + c.value, 0);

  const totalVencidos = 1200; // Mock stat secondary
  const totalPagos = fixedCosts + variableCosts - 4500; // Mock stat secondary

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Custos da Empresa</h1>
          <p className="text-sm font-medium text-muted-foreground mt-0.5">Gestão de contas a pagar, custos fixos e variáveis.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
           <button onClick={() => setIsCategoriesOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-muted text-foreground text-xs font-bold uppercase tracking-wider rounded-md hover:bg-muted/80 transition-colors border border-border shadow-sm">
            <Tags className="w-4 h-4" /> Categorias
          </button>
          <button onClick={() => setIsNewExpenseOpen(true)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-md hover:bg-primary/90 transition-transform active:scale-95 shadow-sm">
            <Plus className="w-4 h-4" /> Nova Conta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-sky-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardContent className="p-8 relative z-10 flex gap-6 items-center">
            <div className="w-14 h-14 bg-sky-500/10 text-sky-500 rounded-xl flex items-center justify-center border border-sky-500/20 shrink-0 shadow-sm">
              <Anchor className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-muted-foreground tracking-tight">Custos Fixos</h3>
              <div className="text-3xl font-bold text-foreground tracking-tight mt-1 flex items-baseline gap-1">
                 {formatCurrency(fixedCosts || 22000).replace('R$ ', 'R$')}
              </div>
              <p className="text-xs font-medium text-muted-foreground mt-2">Corresponde a 65% das despesas.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-amber-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <CardContent className="p-8 relative z-10 flex gap-6 items-center">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center border border-amber-500/20 shrink-0 shadow-sm">
              <Activity className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-muted-foreground tracking-tight">Custos Variáveis</h3>
              <div className="text-3xl font-bold text-foreground tracking-tight mt-1 flex items-baseline gap-1">
                 {formatCurrency(variableCosts || 12000).replace('R$ ', 'R$')}
              </div>
              <p className="text-xs font-medium text-muted-foreground mt-2">Corresponde a 35% das despesas.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
           <span className="text-muted-foreground">Posição:</span>
           <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 shadow-sm">R$ {formatCurrency(totalPagos).replace('R$ ', '')} Pagos</span>
           <span className="px-2 py-1 bg-muted border border-border text-foreground rounded shadow-sm">R$ 4.500 Aberto</span>
           <span className="px-2 py-1 bg-destructive/10 text-destructive rounded border border-destructive/20 shadow-sm">R$ {formatCurrency(totalVencidos).replace('R$ ', '')} Vencidos</span>
        </div>
        <div className="relative max-w-sm w-full flex items-center gap-2 group">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar fornecedor, fatura..." 
              className="w-full bg-card border border-border rounded-md pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-sm transition-all placeholder:text-muted-foreground/60"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border text-foreground text-xs font-bold tracking-wider uppercase rounded-md hover:bg-muted/80 transition-colors shrink-0 shadow-sm">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            Filtros
          </button>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden mt-4">
        <div className="overflow-x-auto relative z-10 custom-scrollbar">
          <table className="w-full text-left font-sans text-sm min-w-[900px]">
             {/* Vencimento, Pagamento, Categoria, Fornecedor, Loja, Valor, Situação */}
            <thead className="bg-muted/20 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Venc./Pag.</th>
                <th className="px-6 py-4 font-semibold">Fornecedor / Fatura</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">C. Custo</th>
                <th className="px-6 py-4 font-semibold text-right">Valor Líquido</th>
                <th className="px-6 py-4 font-semibold text-right">Situação</th>
                <th className="px-4 py-4 font-semibold text-right w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockBusinessCosts.map((cost) => {
                 let statusColor = "bg-sky-500/10 text-sky-500 border-sky-500/20";
                 let statusLabel = cost.status;

                 if (cost.status === 'pago') {
                   statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                   statusLabel = "Pago";
                 } else if (cost.status === 'vencendo') {
                   statusColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                   statusLabel = "A Vencer";
                 } else if (cost.status === 'pendente' || cost.status === 'em aberto') {
                   statusColor = "bg-muted text-muted-foreground border-border";
                   statusLabel = "Em Aberto";
                 } else {
                    statusColor = "bg-destructive/10 text-destructive border-destructive/20";
                    statusLabel = "Vencido";
                 }

                return (
                  <tr key={cost.id} className="hover:bg-muted/40 transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[11px] font-bold text-foreground">
                           V: {format(new Date(cost.date), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                           P: {cost.status === 'pago' ? format(new Date(cost.date), "dd/MM/yyyy", { locale: ptBR }) : '--/--/----'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-[13px] text-foreground tracking-tight">{cost.summary}</span>
                           {cost.recurrence && <div title="Recorrente"><Repeat className="w-3.5 h-3.5 text-sky-500" /></div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                         <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] uppercase font-bold tracking-wider rounded border border-border">
                            {cost.category}
                         </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                       <div className="flex flex-col gap-1 items-start">
                        <span className="text-[10px] uppercase font-bold text-foreground bg-muted/50 border border-border px-1.5 py-0.5 rounded shadow-sm">{cost.store}</span>
                        <span className="text-[10px] font-semibold text-muted-foreground">{cost.type === 'Custo Fixo' ? 'Fixo' : 'Variável'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <span className="font-mono text-[13px] font-bold text-foreground tracking-tight tabular-nums">{formatCurrency(cost.value)}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                       <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                        statusColor
                      )}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setCostToDelete(cost)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Opções">
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

      {/* DRAWERS */}
      <Drawer isOpen={isNewExpenseOpen} onClose={() => setIsNewExpenseOpen(false)} title="Nova Conta a Pagar">
         {/* Drawer content remains similar but restyled */}
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
