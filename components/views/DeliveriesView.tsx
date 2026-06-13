import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDeliveryCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Filter, AlertCircle, Edit2, TrendingDown, TrendingUp, Package, Truck, Clock, CheckCircle2 } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

export function DeliveriesView() {
  const [selectedCost, setSelectedCost] = useState<typeof mockDeliveryCosts[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'operacao' | 'auditoria'>('operacao');

  // Deriving values from mock
  const missingCost = mockDeliveryCosts.filter(c => c.status === 'pendente').length;
  const avgAbsorbed = 12.50; // Mock derived value

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-foreground">Logística e Fretes</h1>
           <p className="text-sm font-medium text-muted-foreground mt-0.5">Operação de envios e auditoria financeira por pedido.</p>
        </div>
      </div>

      {/* TABS HEADER */}
      <div className="flex items-center gap-2 p-1 bg-muted/30 border border-border rounded-lg w-max shadow-sm">
         <button 
           onClick={() => setActiveTab('operacao')}
           className={cn("px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all", activeTab === 'operacao' ? "bg-card border border-border shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
         >
           Operação Logística
         </button>
         <button 
           onClick={() => setActiveTab('auditoria')}
           className={cn("px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-2", activeTab === 'auditoria' ? "bg-card border border-border shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground")}
         >
           Auditoria de Custos
           {missingCost > 0 && <span className="flex items-center justify-center bg-destructive text-destructive-foreground w-4 h-4 rounded-full text-[9px] font-bold">{missingCost}</span>}
         </button>
      </div>

      {activeTab === 'operacao' && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <OpKPIBox title="Volumes em Trânsito" value="18" icon={Truck} color="text-sky-500" bgColor="bg-sky-500/10" colorBorder="border-sky-500/20" />
            <OpKPIBox title="Entregues Hoje" value="45" icon={CheckCircle2} color="text-emerald-500" bgColor="bg-emerald-500/10" colorBorder="border-emerald-500/20" />
            <OpKPIBox title="Atrasos Identificados" value="3" icon={AlertCircle} color="text-amber-500" bgColor="bg-amber-500/10" colorBorder="border-amber-500/20" />
            <OpKPIBox title="Prazo Médio Real" value="1.8d" icon={Clock} color="text-foreground" bgColor="bg-muted" colorBorder="border-border" />
          </div>

          <Card className="bg-card border-border shadow-sm relative overflow-hidden mt-2">
            <div className="overflow-x-auto relative z-10 custom-scrollbar">
              <table className="w-full text-left font-sans text-sm min-w-[900px]">
                <thead className="bg-muted/20 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-4 whitespace-nowrap">Rastreio / Pedido</th>
                    <th className="px-6 py-4">Transportador</th>
                    <th className="px-6 py-4">Destino / Cliente</th>
                    <th className="px-6 py-4 text-center">Prazo Previsto</th>
                    <th className="px-6 py-4 text-right">Status Atual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-foreground">
                  {['TRK-88219-SP', 'IFD-99827-MG', 'MOTO-229-LOCAL', 'TRK-98122-RJ'].map((code, idx) => (
                    <tr key={idx} className="hover:bg-muted/40 transition-colors group">
                      <td className="px-6 py-3">
                         <div className="flex flex-col gap-1">
                            <span className="font-mono text-[13px] font-bold text-foreground">{code}</span>
                            <span className="text-[10px] font-semibold text-muted-foreground">Pedido #00{idx+1}92</span>
                          </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-[13px] text-foreground">{idx % 2 === 0 ? 'Correios' : idx === 1 ? 'iFood' : 'Frota/Motoboy'}</span>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground bg-muted border border-border px-1.5 py-0.5 rounded-md w-max">{idx % 2 === 0 ? 'PAC' : 'Express'}</span>
                          </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-[13px] text-foreground">Cliente Final {idx}</span>
                            <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[150px]">Rua das Flores, 123...</span>
                          </div>
                      </td>
                      <td className="px-6 py-3 text-center">
                         <span className="font-mono text-[12px] font-semibold text-muted-foreground">15 Jun</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                         <span className={cn(
                           "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                           idx === 2 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : 
                           idx === 3 ? "bg-destructive/10 text-destructive border-destructive/20" : 
                           "bg-sky-500/10 text-sky-500 border-sky-500/20"
                         )}>
                           {idx === 2 ? 'Saiu p/ Entrega' : idx === 3 ? 'Atrasado' : 'Em Trânsito'}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'auditoria' && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-500 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPIBox title="Entregas Fechadas (Mês)" value={mockDeliveryCosts.length.toString()} />
            <KPIBox title="Auditoria Pendente (Preencher Custo)" value={missingCost.toString()} alert={missingCost > 0} />
            <KPIBox title="Déficit Médio Absorvido (Subcusteio)" value={formatCurrency(avgAbsorbed)} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
            {/* Same filters but modernized */}
            <div className="relative max-w-sm w-full flex items-center gap-2 group">
              <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <input 
                  type="text" 
                  placeholder="Buscar por ID do pedido..." 
                  className="w-full bg-card border border-border rounded-md pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-all shadow-sm placeholder:text-muted-foreground/60"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border text-foreground text-xs font-bold tracking-wider uppercase rounded-md hover:bg-muted/80 transition-colors shrink-0 shadow-sm">
                <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                Filtros
              </button>
            </div>
            <div className="flex gap-2 shrink-0">
               <select className="bg-card border border-border text-foreground text-xs font-bold tracking-wider uppercase rounded-md px-3 py-2 shadow-sm focus:outline-none">
                  <option>Origem: Todas</option>
                  <option>Araguari</option>
                  <option>Uberlândia</option>
               </select>
               <select className="bg-card border border-border text-foreground text-xs font-bold tracking-wider uppercase rounded-md px-3 py-2 shadow-sm focus:outline-none">
                  <option>Status: Todos</option>
                  <option>Pendentes</option>
                  <option>Prejuízo</option>
                  <option>Superávit</option>
               </select>
            </div>
          </div>

          <Card className="bg-card border-border shadow-sm relative overflow-hidden mt-2">
            <div className="overflow-x-auto relative z-10 custom-scrollbar">
              <table className="w-full text-left font-sans text-sm min-w-[800px]">
                <thead className="bg-muted/20 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-4 whitespace-nowrap">Nota da Ordem</th>
                    <th className="px-6 py-4">Modalidade e Origem</th>
                    <th className="px-6 py-4 text-right">Frete Faturado (Cliente)</th>
                    <th className="px-6 py-4 text-right">Custo Liquidação (Transporte)</th>
                    <th className="px-6 py-4 text-right">Saldo do Frete</th>
                    <th className="px-5 py-4 text-right w-20"></th>
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
                      <tr key={doc.id} className={cn("transition-colors group", doc.status === 'pendente' ? "bg-amber-500/5 hover:bg-amber-500/10" : "hover:bg-muted/40")}>
                        <td className="px-6 py-3">
                           <div className="flex flex-col gap-1">
                              <span className="font-mono text-[13px] font-bold tracking-tight text-foreground">{doc.order}</span>
                              <span className="text-[10px] uppercase font-bold text-muted-foreground">12 JUN</span>
                            </div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex flex-col gap-1 items-start">
                              <span className="text-[13px] font-bold text-foreground">{doc.method}</span>
                              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-card border border-border px-1.5 py-0.5 rounded shadow-sm">{doc.store}</span>
                            </div>
                        </td>
                        <td className="px-6 py-3 text-right font-mono text-[13px] font-bold tabular-nums text-foreground">
                          {formatCurrency(doc.charged)}
                        </td>
                        <td className="px-6 py-3 text-right font-mono text-[13px]">
                           {doc.status === 'pendente' ? (
                             <span className="text-amber-500 flex items-center justify-end gap-1.5 text-[10px] uppercase font-bold tracking-wider rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 w-max ml-auto">
                               <AlertCircle className="w-3.5 h-3.5"/> Custo Faltante
                             </span>
                           ) : (
                             <span className="text-foreground tabular-nums font-bold">{formatCurrency(doc.realCost)}</span>
                           )}
                        </td>
                        <td className="px-6 py-3 text-right">
                           {doc.status === 'pendente' ? (
                              <span className="text-muted-foreground font-mono text-sm font-bold">--</span>
                           ) : (
                              <div className={cn("flex flex-col items-end gap-0.5", diffColor)}>
                                 <div className="flex items-center gap-1 font-mono text-[13px] font-bold tabular-nums">
                                   {formatCurrency(Math.abs(doc.diff))}
                                   {DiffIcon && <DiffIcon className="w-3.5 h-3.5" />}
                                 </div>
                                 <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">{doc.diff < 0 ? 'Absorvido/Prejuízo' : doc.diff > 0 ? 'Superávit' : ''}</span>
                              </div>
                           )}
                        </td>
                        <td className="px-5 py-3 text-right">
                           <button onClick={() => setSelectedCost(doc)} className={cn(
                             "text-[10px] uppercase tracking-wider font-bold px-3 py-2 rounded-md transition-all inline-flex items-center gap-2 active:scale-95 shadow-sm border opacity-0 group-hover:opacity-100",
                             doc.status === 'pendente' ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground hover:bg-muted border-border"
                           )}>
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
        </div>
      )}

      <Drawer isOpen={!!selectedCost} onClose={() => setSelectedCost(null)} title="Auditoria de Margem Logística">
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

function OpKPIBox({ title, value, icon: Icon, color, bgColor, colorBorder }: any) {
   return (
    <Card className="bg-card border-border shadow-sm group hover:border-border/80 transition-colors">
      <CardContent className="p-6 flex items-center gap-4">
         <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm shrink-0", bgColor, colorBorder, color)}>
            <Icon className="w-6 h-6" />
         </div>
         <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{title}</span>
            <span className="font-mono text-2xl font-bold tracking-tight text-foreground">{value}</span>
         </div>
      </CardContent>
    </Card>
   )
}
