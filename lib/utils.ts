import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-zinc-500/10 text-zinc-400',
  closed: 'bg-blue-500/10 text-blue-400',
  paid: 'bg-green-500/10 text-green-400',
  separated: 'bg-purple-500/10 text-purple-400',
  shipped: 'bg-yellow-500/10 text-yellow-400',
  delivered: 'bg-emerald-500/10 text-emerald-400',
  canceled: 'bg-red-500/10 text-red-400',
  returned: 'bg-orange-500/10 text-orange-400',
  open: 'bg-yellow-500/10 text-yellow-400',
  overdue: 'bg-red-500/10 text-red-400',
  pending: 'bg-yellow-500/10 text-yellow-400',
  received: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-red-500/10 text-red-400',
  aguardando: 'bg-zinc-500/10 text-zinc-400',
  pronto: 'bg-blue-500/10 text-blue-400',
  etiqueta: 'bg-purple-500/10 text-purple-400',
  postado: 'bg-yellow-500/10 text-yellow-400',
  transito: 'bg-blue-500/10 text-blue-400',
  falhou: 'bg-red-500/10 text-red-400',
  active: 'bg-green-500/10 text-green-400',
  inactive: 'bg-zinc-500/10 text-zinc-400',
  pending_cost: 'bg-yellow-500/10 text-yellow-400',
};

const STATUS_LABELS: Record<string, string> = {
  draft: 'Rascunho', closed: 'Fechado', paid: 'Pago', separated: 'Separado',
  shipped: 'Enviado', delivered: 'Entregue', canceled: 'Cancelado', returned: 'Devolvido',
  open: 'Em aberto', overdue: 'Vencido', pending: 'Pendente', received: 'Recebido',
  cancelled: 'Cancelado', aguardando: 'Aguardando', pronto: 'Pronto', etiqueta: 'Etiqueta',
  postado: 'Postado', transito: 'Em Trânsito', falhou: 'Falhou',
  active: 'Ativo', inactive: 'Inativo', pending_cost: 'Custo Pendente',
};

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status] || 'bg-zinc-500/10 text-zinc-400';
}

export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] || status;
}

export function getPaymentLabel(method: string): string {
  const labels: Record<string, string> = { pix: 'Pix', card: 'Cartão', cash: 'Dinheiro', other: 'Outro' };
  return labels[method] || method;
}

export function getMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    correios: 'Correios', transportadora: 'Transportadora', motoboy: 'Motoboy',
    rota_interna: 'Rota Interna', retirada: 'Retirada',
  };
  return labels[method] || method;
}
