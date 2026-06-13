import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    ok: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    pendente: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    pago: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    vencendo: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "em aberto": "bg-muted text-muted-foreground border-border",
    atrasado: "bg-destructive/10 text-destructive border-destructive/20",
    entregue: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    em_transito: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    processando: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    preparando: "bg-muted text-muted-foreground border-border",
    cancelado: "bg-destructive/10 text-destructive border-destructive/20",
    draft: "bg-muted text-muted-foreground border-border",
    closed: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    separado: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    enviado: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    inactive: "bg-muted text-muted-foreground border-border",
  };
  return colors[status] || "bg-muted text-muted-foreground border-border";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    ok: "Regular", pendente: "Pendente", pago: "Liquidado",
    vencendo: "Vencendo (7d)", "em aberto": "Em Aberto", atrasado: "Atrasado",
    entregue: "Entregue", em_transito: "Em Trânsito", processando: "Processando",
    preparando: "Preparando", cancelado: "Cancelado", draft: "Rascunho",
    closed: "Fechado", separado: "Separado", enviado: "Enviado",
    active: "Ativo", inactive: "Inativo",
  };
  return labels[status] || status;
}

export function getPaymentLabel(method: string): string {
  const labels: Record<string, string> = {
    pix: "Pix", card: "Cartão", cash: "Dinheiro",
    "Cartão 3x": "Cartão 3x", "Cartão": "Cartão",
  };
  return labels[method] || method;
}

export function getMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    correios: "Correios", transportadora: "Transportadora",
    motoboy: "Motoboy", rota_interna: "Rota Interna", retirada: "Retirada",
    "Motoboy Lógico": "Motoboy Lógico", "Correios SEDEX": "Correios SEDEX",
    "Motoboy Terceiro": "Motoboy Terceiro",
  };
  return labels[method] || method;
}
