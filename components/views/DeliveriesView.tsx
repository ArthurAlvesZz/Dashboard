import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDeliveryCosts, mockDeliveries } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Truck, AlertCircle, Package } from 'lucide-react';

export function DeliveriesView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPIBox title="Entregas em Trânsito" value="12" />
        <KPIBox title="Entregas Atrasadas" value="0" />
        <KPIBox title="Entregas Pendentes" value="5" alert />
      </div>

      <Card>
        <CardHeader className="border-b border-neutral-800">
          <CardTitle>Gestão Logística de Entregas</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 font-medium">Pedido / Cliente</th>
                <th className="px-5 py-3 font-medium">Logística / Rastreio</th>
                <th className="px-5 py-3 font-medium">Prazo</th>
                <th className="px-5 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 text-neutral-300">
              {mockDeliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-neutral-900/50 transition-colors">
                  <td className="px-5 py-4">
                     <div className="flex flex-col">
                        <span className="font-mono text-sm text-white mb-0.5">{delivery.id}</span>
                        <span className="text-xs text-neutral-500">{delivery.customer}</span>
                      </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-300 mb-0.5">{delivery.carrier}</span>
                        <span className="font-mono text-xs text-sky-500 bg-sky-500/10 px-1 py-0.5 rounded self-start">{delivery.tracking}</span>
                      </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-neutral-400">
                    {delivery.deadline}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase border",
                        delivery.status === 'entregue' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        delivery.status === 'em_transito' ? "bg-sky-500/10 text-sky-500 border-sky-500/20" :
                        "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      )}>
                        {delivery.status.replace('_', ' ')}
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

function KPIBox({ title, value, alert }: any) {
  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardContent className="p-6">
        <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2 flex items-center justify-between">
          <span>{title}</span>
          {alert && <AlertCircle className="w-4 h-4 text-amber-500" />}
        </h3>
        <div className="text-3xl font-mono text-white tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}
