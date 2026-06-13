'use client';
import { useStore } from '@/contexts/StoreContext';
import { mockSales, mockBusinessCosts, mockDeliveryCosts, mockProducts, mockChartData, filterByStore, filterByDate } from '@/lib/mockData';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer } from '@/components/ui/Drawer';
import { ShoppingCart, TrendingUp, AlertCircle, TrendingDown, Package, Clock, Truck, ShieldAlert } from 'lucide-react';

export function DashboardView() {
  const { storeId, getDateRange } = useStore();
  const range = getDateRange();
  const [drillDownData, setDrillDownData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, [storeId, range]);

  // Filtrar dados por store e período
  const filteredSales = useMemo(() =>
    filterByDate(filterByStore(mockSales, storeId), range.from, range.to)
  , [storeId, range]);

  const filteredCosts = useMemo(() =>
    filterByStore(mockBusinessCosts, storeId)
  , [storeId]);

  const filteredDeliveryCosts = useMemo(() =>
    filterByStore(mockDeliveryCosts, storeId)
  , [storeId]);

  // Calcular métricas REAIS
  const faturamentoMes = filteredSales.reduce((a, s) => a + s.total, 0);
  const receitaLiquida = filteredSales.reduce((a, s) => a + s.netTotal, 0);
  const custoProdutos = filteredSales.reduce((a, s) => a + s.productCost, 0);
  const custosFixos = filteredCosts.filter(c => c.type === 'Fixo').reduce((a, c) => a + c.value, 0);
  const custosVariaveis = filteredCosts.filter(c => c.type === 'Variável').reduce((a, c) => a + c.value, 0);
  const custoEntrega = filteredDeliveryCosts.reduce((a, d) => a + d.realCost, 0);
  const lucro = receitaLiquida - custoProdutos - custosFixos - custosVariaveis - custoEntrega;
  const margemLucro = receitaLiquida > 0 ? (lucro / receitaLiquida) * 100 : 0;
  const ticketMedio = filteredSales.length > 0 ? receitaLiquida / filteredSales.length : 0;
  const clientesUnicos = new Set(filteredSales.map(s => s.customer)).size;
  const produtosSemCusto = mockProducts.filter(p => p.status === 'pendente').length;
  const entregasSemCusto = filteredDeliveryCosts.filter(d => d.status === 'pendente').length;
  const contasVencendo = filteredCosts.filter(c => c.status === 'vencendo' || c.status === 'atrasado').reduce((a, c) => a + c.value, 0);

  // Gráfico de barras reais
  const chartData = mockChartData;

  // Tabela de lançamentos recentes (últimas 10 vendas)
  const recentSales = filteredSales.slice(0, 10);

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
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setDrillDownData({ title: 'Faturamento Bruto', data: filteredSales })}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Bruto</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(faturamentoMes)}</div>
            <p className="text-xs text-muted-foreground mt-1 text-emerald-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> Baseado no período
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setDrillDownData({ title: 'Receita Líquida', data: filteredSales })}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Líquida (pós taxas)</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{formatCurrency(receitaLiquida)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ticket Médio: {formatCurrency(ticketMedio)}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setDrillDownData({ title: 'Custos Totais', data: filteredCosts })}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custos Totais</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{formatCurrency(custoProdutos + custosFixos + custosVariaveis + custoEntrega)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Fixo: {formatCurrency(custosFixos)} | Prod: {formatCurrency(custoProdutos)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground/80">Lucro Líquido</CardTitle>
            <AlertCircle className="h-4 w-4 text-primary-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(lucro)}</div>
            <p className="text-xs text-primary-foreground/80 mt-1">
              Margem de {margemLucro.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {(produtosSemCusto > 0 || entregasSemCusto > 0 || contasVencendo > 0) && (
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
          {contasVencendo > 0 && (
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-3 bg-destructive/20 rounded-full text-destructive">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-destructive">A Pagar (7d) / Atrasado</p>
                  <p className="text-xl font-bold text-destructive">{formatCurrency(contasVencendo)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-7">
        {/* Gráfico */}
        <Card className="md:col-span-4 lg:col-span-5">
          <CardHeader>
            <CardTitle className="text-lg">Faturamento vs Lucro (Últimos 7 dias)</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gradFat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#db2777" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#db2777" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#059669" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="faturamento" name="Faturamento" stroke="#db2777" fill="url(#gradFat)" strokeWidth={2} />
                <Area type="monotone" dataKey="lucro" name="Lucro" stroke="#059669" fill="url(#gradLucro)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lançamentos Recentes */}
        <Card className="md:col-span-3 lg:col-span-2 overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {recentSales.map(sale => (
                <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{sale.customer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(sale.status)}`}>
                        {getStatusLabel(sale.status)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{new Date(sale.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatCurrency(sale.total)}</p>
                    <p className="text-[10px] text-emerald-500">L: {formatCurrency(sale.profit)}</p>
                  </div>
                </div>
              ))}
              {recentSales.length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-8">
                  Nenhuma venda no período.
                </div>
              )}
            </div>
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
