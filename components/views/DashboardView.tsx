'use client';
import { useStore } from '@/contexts/StoreContext';
import { mockDashboardData, mockGoals, mockBusinessCosts, mockDeliveryCosts, mockProducts, mockChartData, filterByStore } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer } from '@/components/ui/Drawer';
import { ShoppingCart, TrendingUp, AlertCircle, TrendingDown, Package, Clock, Truck, ShieldAlert } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  valueColor?: string;
  onClick: () => void;
}

export function DashboardView() {
  const { selectedStore } = useStore();
  const [drillDownData, setDrillDownData] = useState<{ title: string; data: any } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, [selectedStore]);

  const filteredCosts = useMemo(() => filterByStore(mockBusinessCosts, selectedStore), [selectedStore]);
  const produtosSemCusto = mockProducts.filter(p => p.status === 'pendente').length;
  const entregasSemCusto = mockDeliveryCosts.filter(d => d.status === 'pendente').length;
  // E: Calcular dinamicamente a soma de mockBusinessCosts com status vencendo
  const contasVencendoLocal = filteredCosts.filter(c => c.status === 'vencendo' || c.status === 'atrasado').reduce((a, c) => a + c.value, 0);

  // Filter transactions for recent list
  const recentTransactions = [...filteredCosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setDrillDownData({ title: 'Faturamento Bruto', data: [] })}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Bruto</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockDashboardData.faturamentoMes)}</div>
            <p className="text-xs text-muted-foreground mt-1 text-emerald-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> Baseado no período
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setDrillDownData({ title: 'Receita Líquida', data: [] })}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Líquida (pós taxas)</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{formatCurrency(mockDashboardData.receitaLiquida)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ticket Médio: {formatCurrency(mockDashboardData.receitaLiquida / 50)}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setDrillDownData({ title: 'Custos Totais', data: filteredCosts })}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Totais</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatCurrency(mockDashboardData.custoProdutosVendidos + mockDashboardData.custosFixos + mockDashboardData.custosVariaveis + mockDashboardData.custoEntrega)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Fixo: {formatCurrency(mockDashboardData.custosFixos)} | Prod: {formatCurrency(mockDashboardData.custoProdutosVendidos)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Lucro Líquido</CardTitle>
            <AlertCircle className="h-4 w-4 text-primary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockDashboardData.lucro)}</div>
            <p className="text-xs text-primary-foreground/80 mt-1">
              Margem de {(mockDashboardData.lucro / mockDashboardData.receitaLiquida * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {(produtosSemCusto > 0 || entregasSemCusto > 0 || contasVencendoLocal > 0) && (
        <div className="grid gap-4 md:grid-cols-3">
          {produtosSemCusto > 0 && (
            <Card className="bg-amber-500/10 border-amber-500/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-amber-500/20 rounded-full text-amber-600">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-600">Produtos sem Custo</p>
                  <p className="text-xl font-bold text-amber-700">{produtosSemCusto} itens</p>
                </div>
              </CardContent>
            </Card>
          )}
          {entregasSemCusto > 0 && (
            <Card className="bg-sky-500/10 border-sky-500/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-sky-500/20 rounded-full text-sky-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-sky-600">Entregas sem Custo Real</p>
                  <p className="text-xl font-bold text-sky-700">{entregasSemCusto} fretes</p>
                </div>
              </CardContent>
            </Card>
          )}
          {contasVencendoLocal > 0 && (
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-destructive/20 rounded-full text-destructive">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-destructive">A Pagar (7d) / Atrasado</p>
                  <p className="text-xl font-bold text-destructive">{formatCurrency(contasVencendoLocal)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4 lg:col-span-5">
          <CardHeader>
            <CardTitle className="text-lg">Faturamento vs Lucro (Últimos 7 dias)</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="gradFat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#db2777" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: any) => formatCurrency(value as number)}
                />
                <Area type="monotone" dataKey="faturamento" stroke="#db2777" fill="url(#gradFat)" strokeWidth={2} />
                <Area type="monotone" dataKey="lucro" stroke="#059669" fill="url(#gradLucro)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 lg:col-span-2 overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Metas do Mês</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {mockGoals.map((g, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{g.name}</span>
                    <span className="text-muted-foreground">{g.name.includes('Envios') ? g.target : formatCurrency(g.target as number)}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${Math.min((Number(g.current) / Number(g.target)) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{g.name.includes('Envios') ? `${g.current} realizados` : `${formatCurrency(g.current as number)} alcançado`}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {/* Recentes */}
        <Card className="overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Atividades Recentes e Custos Pagos/Vencendo</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium">Resumo</th>
                  <th className="px-4 py-3 font-medium">Categoria</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-medium">{t.summary}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(t.status)}`}>
                        {getStatusLabel(t.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(t.value)}</td>
                  </tr>
                ))}
                {recentTransactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Nenhum custo registrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Drawer isOpen={!!drillDownData} onClose={() => setDrillDownData(null)} title={drillDownData?.title || 'Detalhes'}>
        <div className="text-sm text-muted-foreground">
           Aqui você veria o detalhamento completo dos dados selecionados para auditoria.
        </div>
      </Drawer>
    </div>
  );
}