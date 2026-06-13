"use client";

import { STOCK_FLOW } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/DataTable";
import { formatDate } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export function StockFlowView() {
  const columns = [
    { key: "id", label: "ID", sortable: true, render: (s: any) => <span className="font-mono text-xs">{s.id.toUpperCase()}</span> },
    { key: "date", label: "Data", sortable: true, render: (s: any) => formatDate(s.date) },
    { key: "sku", label: "SKU", sortable: true, render: (s: any) => <span className="font-mono text-xs font-semibold">{s.sku}</span> },
    { 
      key: "type", 
      label: "Tipo", 
      sortable: true,
      render: (s: any) => (
        <Badge variant="outline" className={s.type === 'in' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}>
          {s.type === 'in' ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
          {s.type === 'in' ? 'Entrada' : 'Saída'}
        </Badge>
      )
    },
    { key: "qty", label: "Quantidade", sortable: true, render: (s: any) => (
      <span className={s.type === 'in' ? 'text-green-500' : 'text-red-500'}>
        {s.type === 'in' ? '+' : '-'}{s.qty}
      </span>
    )},
    { key: "note", label: "Observação" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Fluxo de Estoque</h2>
        <p className="text-muted-foreground">Movimentações de entradas e saídas.</p>
      </div>

      <DataTable 
        data={STOCK_FLOW} 
        columns={columns} 
        searchKey="sku" 
        searchPlaceholder="Buscar por SKU..." 
      />
    </div>
  );
}
