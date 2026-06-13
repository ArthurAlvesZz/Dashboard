"use client";

import { Settings as SettingsIcon } from "lucide-react";

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie equipe e permissões.</p>
      </div>

      <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-border bg-card">
        <SettingsIcon className="mb-4 h-8 w-8 text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Painel administrativo (Em breve)</p>
      </div>
    </div>
  );
}
