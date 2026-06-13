"use client";

import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ImportCostsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Importar Custos</h2>
        <p className="text-muted-foreground">Faça o upload de planilhas para atualizar custos em lote.</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
        <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-semibold">Arraste e solte seus arquivos</h3>
        <p className="mb-6 text-sm text-muted-foreground max-w-sm">
          Suporta arquivos .csv, .xlsx. O sistema unificará SKUs compatíveis.
        </p>
        <Button variant="secondary">Selecionar Arquivo</Button>
      </div>
    </div>
  );
}
