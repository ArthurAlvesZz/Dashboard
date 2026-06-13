import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDeliveryCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';

export function DeliveryCostView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] border border-neutral-900 shadow-xl rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-3">
               <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
               <span className="text-[10px] font-mono font-medium text-neutral-500 uppercase tracking-widest block">Receita com Frete</span>
            </div>
            <span className="text-4xl font-mono text-white tracking-tighter drop-shadow-md">R$ 4.500</span>
          </div>
          <div className="bg-[#0a0a0a] border border-neutral-900 shadow-xl rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-3">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
               <span className="text-[10px] font-mono font-medium text-red-500/80 uppercase tracking-widest block">Pagamento a Terceiros</span>
            </div>
            <span className="text-4xl font-mono text-red-400 tracking-tighter drop-shadow-md">R$ 5.200</span>
          </div>
           <div className="bg-[#1a0f0f] border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.05)] rounded-xl p-8 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-red-500/10 to-transparent pointer-events-none animate-pulse" />
            <div className="flex items-center gap-2 mb-3 relative z-10">
               <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
               <span className="text-[10px] font-mono font-medium text-red-400 uppercase tracking-widest block">Custo Absorvido (Prejuízo)</span>
            </div>
             <span className="text-4xl font-mono text-red-500 tracking-tighter relative z-10 drop-shadow-md">R$ 700</span>
          </div>
       </div>

      <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl relative overflow-hidden mt-6">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <CardHeader className="border-b border-neutral-900/50 pb-4 relative z-10">
          <CardTitle className="text-[11px] font-mono text-neutral-400 tracking-widest uppercase">Detalhamento Analítico (Auditoria)</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-[#121212]/50 border-b border-neutral-900 text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-mono">
              <tr>
                <th className="px-6 py-4 font-medium whitespace-nowrap">Nota da Ordem</th>
                <th className="px-6 py-4 font-medium">Logística / Parceiro</th>
                <th className="px-6 py-4 font-medium text-right">Faturamento (Frete)</th>
                <th className="px-6 py-4 font-medium text-right">Liquidação Real</th>
                <th className="px-6 py-4 font-medium text-right">Spread Absoluto</th>
                <th className="px-6 py-4 font-medium text-right">Auditoria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900/50 text-neutral-300">
              {mockDeliveryCosts.map((item) => (
                <tr key={item.id} className="hover:bg-[#121212] transition-colors group">
                  <td className="px-6 py-4 font-mono text-white text-[12px]">{item.order}</td>
                  <td className="px-6 py-4">
                     <span className="block text-white font-medium text-[13px] tracking-wide">{item.method}</span>
                     <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 mt-1">{item.store}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-[14px]">{formatCurrency(item.charged)}</td>
                  <td className="px-6 py-4 text-right">
                     {item.realCost === 0 && item.method !== 'Retirada' ? (
                       <button className="text-[10px] uppercase tracking-widest font-mono text-pink-500 hover:text-pink-400 transition-colors">Definir Custo</button>
                     ) : (
                       <span className="font-mono text-[14px] text-neutral-300 tabular-nums">{formatCurrency(item.realCost)}</span>
                     )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={cn(
                      "font-mono text-[14px] tabular-nums",
                      item.diff < 0 ? "text-red-400" : item.diff > 0 ? "text-emerald-400" : "text-neutral-500"
                    )}>
                      {item.diff === 0 ? '--' : formatCurrency(item.diff)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded text-[9px] font-mono tracking-widest uppercase border",
                        item.status === 'ok' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        item.status === 'alerta' ? "bg-red-500/10 text-red-500 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]" :
                        "bg-[#121212] text-neutral-400 border-neutral-800"
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
