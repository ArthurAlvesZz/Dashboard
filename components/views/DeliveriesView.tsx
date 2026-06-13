"use client";

import { Badge } from "@/components/ui/badge";
import { DELIVERIES } from "@/lib/mockData";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";

export function DeliveriesView() {
  const columns = [
    { key: "id", label: "ID Entrega", sortable: true, render: (d: any) => <span className="font-mono text-xs">{d.id.toUpperCase()}</span> },
    { key: "saleId", label: "Pedido", sortable: true, render: (d: any) => <span className="font-mono text-xs font-semibold text-primary">{d.saleId.toUpperCase()}</span> },
    { key: "carrier", label: "Transportadora", sortable: true },
    { key: "tracking", label: "Rastreio", sortable: true, render: (d: any) => <span className="font-mono text-xs">{d.tracking}</span> },
    { key: "estimatedDate", label: "Previsão", sortable: true, render: (d: any) => formatDate(d.estimatedDate) },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (d: any) => (
        <Badge variant="outline" className={getStatusColor(d.status)}>
          {getStatusLabel(d.status)}
        </Badge>
      )
    },
    { key: "cost", label: "Custo", sortable: true, render: (d: any) => formatCurrency(d.cost) }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Entregas</h2>
        <p className="text-muted-foreground">Gestão de logística e rastreio de envios.</p>
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
