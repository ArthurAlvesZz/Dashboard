"use client";

import { DELIVERIES } from "@/lib/mockData";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate } from "@/lib/utils";

export function DeliveryCostView() {
  const columns = [
    { key: "id", label: "ID", render: (d: any) => <span className="font-mono text-xs">{d.id.toUpperCase()}</span> },
    { key: "estimatedDate", label: "Data Ref.", sortable: true, render: (d: any) => formatDate(d.estimatedDate) },
    { key: "carrier", label: "Transportadora", sortable: true },
    { key: "tracking", label: "Rastreio", render: (d: any) => <span className="font-mono text-xs">{d.tracking}</span> },
    { key: "cost", label: "Custo Faturado", sortable: true, render: (d: any) => formatCurrency(d.cost) },
    { key: "divergentCost", label: "Custo Divergente", sortable: true, render: (d: any) => <span className="text-muted-foreground">-</span> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Auditoria de Fretes</h2>
        <p className="text-muted-foreground">Revisão de custos de entrega e transportadoras.</p>
      </div>

      <DataTable 
        data={DELIVERIES} 
        columns={columns} 
        searchKey="tracking" 
        searchPlaceholder="Buscar por rastreio..." 
      />
    </div>
  );
}
