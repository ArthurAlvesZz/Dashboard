import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockBusinessCosts } from '@/lib/mockData';
import { formatCurrency, cn } from '@/lib/utils';
import { Search, Plus, Filter, Calendar as CalendarIcon, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function BusinessCostsView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2">Custos Fixos (Mês Atual)</h3>
            <div className="text-3xl font-mono text-white tracking-tight">R$ 12.000,00</div>
          </CardContent>
        </Card>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2">Custos Variáveis (Mês Atual)</h3>
            <div className="text-3xl font-mono text-white tracking-tight">R$ 4.500,00</div>
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
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-700 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
            Categorias
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
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
                 let statusColor = "bg-neutral-500/10 text-neutral-500 border-neutral-500/20";
                 let statusLabel = cost.status;

                 if (cost.status === 'pago') {
                   statusColor = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                   statusLabel = "Pago";
                 } else if (cost.status === 'vencendo') {
                   statusColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                   statusLabel = "Vencendo (Próx 7d)";
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
                      {cost.status !== 'pago' && (
                        <button className="text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded transition-colors">
                          Marcar Pago
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
