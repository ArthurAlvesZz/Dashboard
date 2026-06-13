"use client";

import { BUSINESS_COSTS, STORES } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/DataTable";
import { formatCurrency } from "@/lib/utils";

export function BusinessCostsView() {
  const columns = [
    { key: "month", label: "Mês Ref.", sortable: true },
    { key: "description", label: "Descrição", sortable: true },
    { key: "storeId", label: "Loja", sortable: true, render: (c: any) => STORES.find(s => s.id === c.storeId)?.name || 'N/A' },
    { 
      key: "type", 
      label: "Tipo", 
      sortable: true,
      render: (c: any) => (
        <Badge variant={c.type === 'fixed' ? 'outline' : 'secondary'} className={c.type === 'variable' ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : ''}>
          {c.type === 'fixed' ? 'Fixo' : 'Variável'}
        </Badge>
      )
    },
    { key: "amount", label: "Valor", sortable: true, render: (c: any) => formatCurrency(c.amount) }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Custos do Negócio</h2>
        <p className="text-muted-foreground">Acompanhamento e registro de despesas fixas e variáveis.</p>
      </div>

      <DataTable 
        data={BUSINESS_COSTS} 
        columns={columns} 
        searchKey="description" 
        searchPlaceholder="Buscar por descrição..." 
      />
    </div>
  );
}
