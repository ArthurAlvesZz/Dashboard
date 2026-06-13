"use client";

import { Truck } from "lucide-react";

export function DeliveryCostView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Auditoria de Fretes</h2>
        <p className="text-muted-foreground">Revisão de custos de entrega e transportadoras.</p>
      </div>

      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-border bg-card">
        <Truck className="mb-4 h-8 w-8 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Módulo de reconciliação de faturas (Em breve)</p>
      </div>
    </div>
  );
}
