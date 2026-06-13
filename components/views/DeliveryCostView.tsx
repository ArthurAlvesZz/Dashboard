import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDeliveryCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';

export function DeliveryCostView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card border border-border shadow-sm rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-3">
               <div className="w-1.5 h-1.5 rounded-full bg-primary" />
               <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Receita com Frete</span>
            </div>
            <span className="text-4xl font-mono text-foreground tracking-tight drop-shadow-sm font-bold">R$ 4.500</span>
          </div>
          <div className="bg-card border border-border shadow-sm rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-destructive/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-3">
               <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
               <span className="text-[10px] font-semibold text-destructive/80 uppercase tracking-wider block">Pagamento a Terceiros</span>
            </div>
            <span className="text-4xl font-mono text-destructive tracking-tight drop-shadow-sm font-bold">R$ 5.200</span>
          </div>
           <div className="bg-destructive/5 border border-destructive/20 shadow-sm rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-destructive/10 to-transparent pointer-events-none animate-pulse" />
            <div className="flex items-center gap-2 mb-3 relative z-10">
               <div className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_hsl(var(--destructive)/0.6)] animate-pulse" />
               <span className="text-[10px] font-semibold text-destructive uppercase tracking-wider block">Custo Absorvido (Prejuízo)</span>
            </div>
             <span className="text-4xl font-mono text-destructive tracking-tight relative z-10 drop-shadow-sm font-bold">R$ 700</span>
          </div>
       </div>

      <Card className="bg-card border-border shadow-sm relative overflow-hidden mt-6">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <CardHeader className="border-b border-border pb-4 relative z-10">
          <CardTitle className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">Detalhamento Analítico (Auditoria)</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-muted/30 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Nota da Ordem</th>
                <th className="px-6 py-4">Logística / Parceiro</th>
                <th className="px-6 py-4 text-right">Faturamento (Frete)</th>
                <th className="px-6 py-4 text-right">Liquidação Real</th>
                <th className="px-6 py-4 text-right">Spread Absoluto</th>
                <th className="px-6 py-4 text-right">Auditoria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {mockDeliveryCosts.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-mono text-foreground font-semibold text-[12px]">{item.order}</td>
                  <td className="px-6 py-4">
                     <span className="block text-foreground font-medium text-[13px] tracking-tight">{item.method}</span>
                     <span className="block text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-1">{item.store}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-[14px] font-semibold">{formatCurrency(item.charged)}</td>
                  <td className="px-6 py-4 text-right">
                     {item.realCost === 0 && item.method !== 'Retirada' ? (
                       <button className="text-[10px] uppercase tracking-wider font-bold text-primary hover:text-primary/80 transition-colors">Definir Custo</button>
                     ) : (
                       <span className="font-mono text-[14px] text-foreground font-semibold tabular-nums">{formatCurrency(item.realCost)}</span>
                     )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "font-mono text-[14px] tabular-nums font-bold",
                      item.diff < 0 ? "text-destructive" : item.diff > 0 ? "text-emerald-500" : "text-muted-foreground"
                    )}>
                      {item.diff === 0 ? '--' : formatCurrency(item.diff)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase border",
                        item.status === 'ok' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        item.status === 'alerta' ? "bg-destructive/10 text-destructive border-destructive/20 shadow-sm" :
                        "bg-muted/50 text-muted-foreground border-border"
                      )}>
                        {item.status === 'ok' ? 'Regular' : item.status === 'alerta' ? 'Prejuízo' : 'Revisar'}
                      </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
