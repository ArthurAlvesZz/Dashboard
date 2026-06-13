"use client";

import { Download, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReportsView() {
  const reports = [
    { title: "DRE Mensal Completo", description: "Demonstrativo de resultado do exercício acumulado mensal." },
    { title: "Fluxo de Caixa", description: "Entradas e saídas agrupadas por conta e dia." },
    { title: "Vendas por Canal", description: "Desempenho de vendas por loja física e online." },
    { title: "Curva ABC de Estoque", description: "Classificação de produtos por volume financeiro e quantidade." },
    { title: "Comissões de Vendas", description: "Cálculo de comissão para colaboradores baseado na meta." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Relatórios</h2>
        <p className="text-muted-foreground">Exportação e gráficos analíticos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((r, i) => (
          <div key={i} className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm">
            <div>
              <FileBarChart className="mb-4 h-6 w-6 text-primary" />
              <h3 className="font-medium">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
            </div>
            <Button variant="outline" className="mt-6 w-full">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
