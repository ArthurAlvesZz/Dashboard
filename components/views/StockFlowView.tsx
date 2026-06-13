"use client";

import { useMemo } from "react";
import { mockStockFlow } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/shared/DataTable";
import { formatDate, formatCurrency } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function StockFlowView() {
  const combinedData = useMemo(() => {
    const data: any[] = [];
    mockStockFlow.entries.forEach((e, i) => {
      data.push({ id: `ENT-${i+1}`, date: e.date, description: e.description, value: e.value, type: e.type });
    });
    mockStockFlow.exits.forEach((e, i) => {
      data.push({ id: `SAI-${i+1}`, date: e.date, description: 'Saída Diária (Vendas)', value: e.value, type: e.type });
    });
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const columns = [
    { key: "id", label: "Registro", sortable: true, render: (s: any) => <span className="font-mono text-xs">{s.id.toUpperCase()}</span> },
    { key: "date", label: "Data", sortable: true, render: (s: any) => formatDate(s.date) },
    { key: "description", label: "Descrição", sortable: true, render: (s: any) => <span className="font-medium">{s.description}</span> },
    { 
      key: "type", 
      label: "Operação", 
      sortable: true,
      render: (s: any) => (
        <Badge variant="outline" className={s.type === 'entrada' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}>
          {s.type === 'entrada' ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
          {s.type === 'entrada' ? 'Entrada / Compra' : 'Saída / Venda'}
        </Badge>
      )
    },
    { key: "value", label: "Valor Custo", sortable: true, render: (s: any) => (
      <span className={s.type === 'entrada' ? 'text-emerald-500 font-bold' : 'text-destructive font-bold'}>
        {s.type === 'entrada' ? '+' : '-'}{formatCurrency(s.value)}
      </span>
    )}
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Fluxo de Estoque Financeiro</h2>
        <p className="text-muted-foreground">Monitoramento das compras de estoque e cálculo de saídas por vendas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Compras do Mês</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{formatCurrency(mockStockFlow.comprasMes)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Custo Saídas (CMV)</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">-{formatCurrency(mockStockFlow.custoSaida)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Necessidade Reposição</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-amber-500">{formatCurrency(mockStockFlow.necessidadeReposicao)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Saldo do Fluxo</CardTitle></CardHeader>
          <CardContent>
             <div className={`text-2xl font-bold ${mockStockFlow.saldoFluxo >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                {mockStockFlow.saldoFluxo > 0 ? "+" : ""}{formatCurrency(mockStockFlow.saldoFluxo)}
             </div>
          </CardContent>
        </Card>
      </div>

      <DataTable 
        data={combinedData} 
        columns={columns} 
        searchKey="description" 
        searchPlaceholder="Buscar por descrição..." 
      />
    </div>
  );
}
