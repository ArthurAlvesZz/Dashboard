import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDeliveryCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';

export function DeliveryCostView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <span className="text-xs text-neutral-500 uppercase block mb-1">Total Recebido (Frete)</span>
            <span className="text-2xl font-mono text-white tracking-tight">R$ 4.500,00</span>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <span className="text-xs text-neutral-500 uppercase block mb-1">Custo Real (Pago a Transportadora)</span>
            <span className="text-2xl font-mono text-red-400 tracking-tight">R$ 5.200,00</span>
          </div>
           <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
            <span className="text-xs text-amber-500 uppercase block mb-1">Custo Absorvido pela Empresa</span>
             <span className="text-2xl font-mono text-amber-500 tracking-tight">R$ 700,00</span>
          </div>
       </div>

      <Card>
        <CardHeader className="border-b border-neutral-800">
          <CardTitle>Auditoria de Custo com Entrega</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4 font-medium">Pedido</th>
                <th className="px-5 py-4 font-medium">Método / Loja</th>
                <th className="px-5 py-4 font-medium text-right">Cobrado do Cliente</th>
                <th className="px-5 py-4 font-medium text-right">Custo Real Embutido</th>
                <th className="px-5 py-4 font-medium text-right">Diferença</th>
                <th className="px-5 py-4 font-medium text-right">Status Auditoria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {mockDeliveryCosts.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="px-5 py-3 font-mono text-white text-xs">{item.order}</td>
                  <td className="px-5 py-3">
                     <span className="block text-white font-medium">{item.method}</span>
                     <span className="block text-[11px] text-neutral-500 mt-0.5">{item.store}</span>
                  </td>
                  <td className="px-5 py-3 text-right font-mono tracking-tight">{formatCurrency(item.charged)}</td>
                  <td className="px-5 py-3 text-right">
                     {item.realCost === 0 && item.method !== 'Retirada' ? (
                       <button className="text-xs text-sky-400 underline underline-offset-2">Preencher Custo Real</button>
                     ) : (
                       <span className="font-mono tracking-tight text-neutral-300">{formatCurrency(item.realCost)}</span>
                     )}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className={cn(
                      "font-mono tracking-tight text-sm",
                      item.diff < 0 ? "text-red-400" : item.diff > 0 ? "text-emerald-400" : "text-neutral-500"
                    )}>
                      {item.diff === 0 ? '--' : formatCurrency(item.diff)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                     <span className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide border uppercase",
                        item.status === 'ok' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        item.status === 'alerta' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                        "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      )}>
                        {item.status}
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
