"use client";

import { Badge } from "@/components/ui/badge";
import { SALES, STORES } from "@/lib/mockData";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel, getPaymentLabel } from "@/lib/utils";

export function SalesView() {
  const columns = [
    { key: "id", label: "ID", sortable: true, render: (s: any) => <span className="font-mono text-xs font-semibold">{s.id.toUpperCase()}</span> },
    { key: "date", label: "Data", sortable: true, render: (s: any) => formatDate(s.date) },
    { key: "customer", label: "Cliente", sortable: true },
    { key: "storeId", label: "Loja", sortable: true, render: (s: any) => STORES.find(st => st.id === s.storeId)?.name || 'N/A' },
    { key: "paymentMethod", label: "Pagamento", sortable: true, render: (s: any) => getPaymentLabel(s.paymentMethod) },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (s: any) => (
        <Badge variant="outline" className={getStatusColor(s.status)}>
          {getStatusLabel(s.status)}
        </Badge>
      )
    },
    { key: "total", label: "Total", sortable: true, render: (s: any) => formatCurrency(s.total) }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Pedidos e Vendas</h2>
        <p className="text-muted-foreground">Acompanhe todos os pedidos realizados nas filiais.</p>
      </div>

      <DataTable 
        data={SALES} 
        columns={columns} 
        searchKey="customer" 
        searchPlaceholder="Buscar por cliente..." 
      />
    </div>
  );
}
