"use client";

import { Activity } from "lucide-react";

export function StockFlowView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Fluxo de Estoque</h2>
        <p className="text-muted-foreground">Movimentações de entradas e saídas.</p>
      </div>

      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-border bg-card">
        <Activity className="mb-4 h-8 w-8 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Gráfico de movimentações de estoque (Em breve)</p>
      </div>
    </div>
  );
}
