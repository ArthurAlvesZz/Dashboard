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
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIBox title="Entregas Fechadas (Mês)" value={mockDeliveryCosts.length.toString()} />
        <KPIBox title="Auditoria Pendente (Sem Custo Real)" value={missingCost.toString()} alert={missingCost > 0} />
        <KPIBox title="Prejuízo Médio / Absorção Absoluta" value={formatCurrency(avgAbsorbed)} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
        <div className="relative max-w-md w-full flex items-center gap-2 group">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar por ID do pedido, método ou cliente..." 
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all shadow-sm placeholder:text-muted-foreground"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border text-muted-foreground text-[11px] uppercase tracking-wider font-semibold rounded-lg hover:text-foreground hover:bg-accent hover:border-border transition-all shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Filtros
          </button>
        </div>
        <div className="flex gap-2 shrink-0">
           <select className="bg-card border border-border text-foreground text-[11px] uppercase tracking-wider font-semibold rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer shadow-sm">
              <option>Cadeia Global</option>
              <option>Origem: Araguari</option>
              <option>Origem: Uberlândia</option>
           </select>
           <select className="bg-card border border-border text-foreground text-[11px] uppercase tracking-wider font-semibold rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer shadow-sm">
              <option>Matriz Inteira</option>
              <option>Auditoria: Aberto</option>
              <option>Filtro: Prejuízo</option>
              <option>Filtro: Positivo</option>
           </select>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden mt-2">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Nota da Ordem</th>
                <th className="px-6 py-4">Classificação Logística</th>
                <th className="px-6 py-4 text-right">Faturamento (Cliente)</th>
                <th className="px-6 py-4 text-right">Liquidação (Terceiro)</th>
                <th className="px-6 py-4 text-right">Eficiência</th>
                <th className="px-5 py-4 text-right w-24">Painel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockDeliveryCosts.map((doc) => {
                 let diffColor = "text-muted-foreground";
                 let DiffIcon = null;
                 if (doc.diff < 0) {
                   diffColor = "text-destructive";
                   DiffIcon = TrendingDown;
                 } else if (doc.diff > 0) {
                   diffColor = "text-emerald-500";
                   DiffIcon = TrendingUp;
                 }

                return (
                  <tr key={doc.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                          <span className="font-mono text-sm font-semibold tracking-tight">{doc.order}</span>
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground">12 JUN 2026</span>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium">{doc.method}</span>
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground bg-muted border border-border px-1.5 py-0.5 rounded-md w-max">{doc.store}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[14px] font-semibold tabular-nums text-foreground">
                      {formatCurrency(doc.charged)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-[14px]">
                       {doc.status === 'pendente' ? (
                         <span className="text-amber-500 flex items-center justify-end gap-1.5 text-[10px] uppercase font-bold tracking-wider"><AlertCircle className="w-3.5 h-3.5"/> Preenchimento</span>
                       ) : (
                         <span className="text-foreground tabular-nums font-semibold">{formatCurrency(doc.realCost)}</span>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right">
                       {doc.status === 'pendente' ? (
                          <span className="text-muted-foreground font-mono text-sm">--</span>
                       ) : (
                          <div className={cn("flex flex-col items-end gap-0.5", diffColor)}>
                             <div className="flex items-center gap-1.5 font-mono text-[14px] font-bold tabular-nums">
                               {formatCurrency(Math.abs(doc.diff))}
                               {DiffIcon && <DiffIcon className="w-3.5 h-3.5" />}
                             </div>
                             <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">{doc.diff < 0 ? 'Absorvido' : doc.diff > 0 ? 'Superávit' : ''}</span>
                          </div>
                       )}
                    </td>
                    <td className="px-5 py-4 text-right">
                       <button onClick={() => setSelectedCost(doc)} className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-md transition-colors inline-flex items-center gap-2 active:scale-95 shadow-sm border border-primary/20 opacity-0 group-hover:opacity-100">
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
             <div className="flex items-center justify-between border-b border-border pb-4">
               <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">Pedido</span>
                  <span className="font-mono text-lg font-bold text-foreground">{selectedCost.order}</span>
               </div>
               <div className="text-right">
                  <span className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-1">Cobrado do Cliente</span>
                  <span className="font-mono text-lg font-bold text-emerald-500">{formatCurrency(selectedCost.charged)}</span>
               </div>
             </div>

             <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Custo Real (R$)</label>
                  <input type="number" defaultValue={selectedCost.realCost === 0 ? '' : selectedCost.realCost} placeholder="Ex: 25.00" className="w-full bg-card border border-border rounded-lg px-3 py-3 font-mono text-foreground font-semibold text-lg focus:outline-none focus:border-primary shadow-sm transition-colors" />
                </div>
                
                <div className="bg-muted/30 border border-border p-4 rounded-lg flex items-start gap-3">
                   <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                   <div className="text-sm text-muted-foreground leading-relaxed">
                      Ao preencher o custo real, o sistema recalculará automaticamente a lucratividade líquida deste pedido no histórico financeiro.
                   </div>
                </div>

                <div className="pt-4 flex gap-3">
                   <button onClick={() => setSelectedCost(null)} className="flex-1 px-4 py-3 bg-muted text-muted-foreground font-semibold text-sm rounded-lg hover:bg-accent hover:text-foreground transition-colors shadow-sm border border-border">Cancelar</button>
                   <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95">Salvar Custo</button>
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
    <Card className={cn("relative overflow-hidden group shadow-sm transition-colors", alert ? "bg-destructive/5 border-destructive/20" : "bg-card border-border")}>
      {alert && <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-destructive/10 to-transparent pointer-events-none animate-pulse" />}
      {!alert && <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />}
      <CardContent className="p-8 relative z-10">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
          {alert && <div className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.6)] animate-pulse" />}
          {!alert && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
          <span className={alert ? "text-destructive" : "text-muted-foreground"}>{title}</span>
        </h3>
        <div className={cn("text-4xl font-mono tracking-tight font-bold", alert ? "text-destructive drop-shadow-sm" : "text-foreground")}>{value}</div>
      </CardContent>
    </Card>
  );
}
