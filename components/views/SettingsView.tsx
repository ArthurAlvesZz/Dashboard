"use client";

import { Settings as SettingsIcon, UserCircle, Users, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsView() {
  const sections = [
    { title: "Perfil e Conta", description: "Gerencie suas informações pessoais.", icon: UserCircle },
    { title: "Equipe", description: "Convide e remova colaboradores.", icon: Users },
    { title: "Permissões", description: "Controle de acesso por cargo.", icon: Shield },
    { title: "Notificações", description: "Alertas de estoque e relatórios.", icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie equipe e permissões da plataforma.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <r.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.description}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Acessar</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
