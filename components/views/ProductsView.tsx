"use client";

import { PRODUCTS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatPercent, getStatusColor, getStatusLabel } from "@/lib/utils";

export function ProductsView() {
  const columns = [
    { key: "sku", label: "SKU", sortable: true, render: (p: any) => <span className="font-mono text-xs">{p.sku}</span> },
    { key: "name", label: "Nome Produto", sortable: true },
    { key: "variation", label: "Variação", sortable: true },
    { key: "stock", label: "Estoque", sortable: true, render: (p: any) => `${p.stock} un` },
    { key: "cost", label: "Custo Un.", sortable: true, render: (p: any) => formatCurrency(p.cost) },
    { key: "price", label: "Preço Venda", sortable: true, render: (p: any) => formatCurrency(p.price) },
    { 
      key: "margin", 
      label: "Margem", 
      render: (p: any) => {
        const marginPercent = ((p.price - p.cost) / p.price) * 100;
        return <span className={marginPercent > 40 ? "text-green-500" : "text-yellow-500"}>{formatPercent(marginPercent)}</span>;
      } 
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true,
      render: (p: any) => (
        <Badge variant="outline" className={getStatusColor(p.status)}>
          {getStatusLabel(p.status)}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Produtos e Custos</h2>
          <p className="text-muted-foreground">Catálogo de SKUs e custos por item.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </div>

      <DataTable 
        data={PRODUCTS} 
        columns={columns} 
        searchKey="name" 
        searchPlaceholder="Buscar por nome do produto..." 
      />
    </div>
  );
}
