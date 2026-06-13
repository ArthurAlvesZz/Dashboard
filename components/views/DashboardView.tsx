import { Activity, DollarSign, Package, TrendingUp, Users, ShoppingCart, Truck, RefreshCcw, FileText, Settings, AlertCircle, BarChart3, Database } from "lucide-react";

export function DashboardView() {
  const metrics = [
    { label: "Receita Total", value: "R$ 45.231,89", icon: DollarSign, trend: "+12.5%" },
    { label: "Vendas", value: "342", icon: ShoppingCart, trend: "+8.2%" },
    { label: "Ticket Médio", value: "R$ 132,25", icon: Activity, trend: "+2.1%" },
    { label: "Custo Produtos", value: "R$ 15.340,00", icon: Package, trend: "-4.5%" },
    { label: "Lucro Bruto", value: "R$ 29.891,89", icon: TrendingUp, trend: "+15.3%" },
    { label: "Custos Fixos", value: "R$ 7.700,00", icon: Database, trend: "0%" },
    { label: "Custos Variáveis", value: "R$ 1.120,00", icon: RefreshCcw, trend: "+1.2%" },
    { label: "Lucro Líquido", value: "R$ 21.071,89", icon: BarChart3, trend: "+18.4%" },
    { label: "Custo Frete", value: "R$ 1.240,50", icon: Truck, trend: "-2.1%" },
    { label: "Novos Clientes", value: "89", icon: Users, trend: "+5.4%" },
    { label: "Devoluções", value: "12", icon: AlertCircle, trend: "-1.0%" },
    { label: "Itens em Estoque", value: "1.204", icon: Package, trend: "+12%" },
    { label: "Relatórios Gerados", value: "45", icon: FileText, trend: "+10%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Financeiro</h2>
        <p className="text-muted-foreground">Visão geral das métricas da Santa Bronx Ops.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          const isPositive = metric.trend.startsWith("+");
          const isNeutral = metric.trend === "0%";
          return (
            <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-row items-center justify-between space-y-0 break-words pb-2">
                <h3 className="text-sm font-medium tracking-tight text-muted-foreground">{metric.label}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${isPositive ? 'text-green-500' : isNeutral ? 'text-muted-foreground' : 'text-red-500'}`}>
                  {metric.trend} em relação ao mês anterior
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
