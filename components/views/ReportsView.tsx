"use client";

import { BarChart3 } from "lucide-react";

export function ReportsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Relatórios</h2>
        <p className="text-muted-foreground">Exportação e gráficos analíticos.</p>
      </div>

      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-border bg-card">
        <BarChart3 className="mb-4 h-8 w-8 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Geração de DRE e exportação (Em breve)</p>
      </div>
    </div>
  );
}
