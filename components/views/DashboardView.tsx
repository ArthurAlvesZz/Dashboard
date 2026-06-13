import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDashboardData, mockChartData } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { 
  TrendingUp, TrendingDown, Box, Truck, CalendarClock, ArrowRightLeft, 
  DollarSign, Wallet, Package, ChevronRight, Activity, ShieldCheck, AlertCircle
} from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DrillDownData {
  title: string;
  value?: number;
}

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: any;
  subtext: string;
  chartColor: string;
  onClick: () => void;
  delay: string;
}

interface DetailedMetricProps {
  title: string;
  value: string;
  sub: string;
  progress: number;
  color: string;
}

interface ActionItemProps {
  icon: any;
  title: string;
  desc: string;
  cta: string;
  severity: "red" | "amber";
  onClick: () => void;
}

interface TableRowProps {
  title: string;
  desc: string;
  origin: string;
  val: string;
  stat: string;
  statColor: "emerald" | "amber" | "red";
  onClick: () => void;
}

interface TimelineItemProps {
  icon: any;
  title: string;
  desc: string;
  time: string;
  color: string;
}

const evolutionData = [
  { name: '10/06', Receita: 12000, CMV: 4000, Lucro: 6000 },
  { name: '11/06', Receita: 15000, CMV: 5000, Lucro: 8000 },
  { name: '12/06', Receita: 8000, CMV: 3000, Lucro: 4000 },
  { name: '13/06', Receita: 19000, CMV: 6000, Lucro: 10000 },
  { name: '14/06', Receita: 14000, CMV: 4500, Lucro: 7500 },
  { name: '15/06', Receita: 22000, CMV: 7000, Lucro: 12000 },
  { name: '16/06', Receita: 25000, CMV: 8000, Lucro: 14000 },
];

export function DashboardView() {
  const [drillDownData, setDrillDownData] = useState<DrillDownData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-20">
      
      {/* HEADER */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Central Financeira</h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitoramento financeiro e operacional consolidado.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-bold uppercase tracking-wider shadow-sm">
           <ShieldCheck className="w-4 h-4" /> DRE Verificado
        </div>
      </div>

      {/* ROW 1: 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard 
          title="Receita Bruta" 
          value={formatCurrency(mockDashboardData.faturamentoMes)} 
          trend="+12.5%" 
          trendUp={true} 
          icon={DollarSign}
          subtext="vs mês anterior"
          chartColor="#0284c7"
          onClick={() => setDrillDownData({ title: 'Receita Bruta Mensal', value: mockDashboardData.faturamentoMes })}
          delay="0ms"
        />
        <MetricCard 
          title="Receita Líquida" 
          value={formatCurrency(132474.70)} 
          trend="+8.2%" 
          trendUp={true} 
          icon={Wallet}
          subtext="Após taxas e estornos"
          chartColor="#059669"
          onClick={() => setDrillDownData({ title: 'Receita Líquida', value: 132474.70 })}
          delay="80ms"
        />
        <MetricCard 
          title="Consumo de Produto (CMV)" 
          value={formatCurrency(mockDashboardData.custoProdutosVendidos)} 
          trend="-3.1%" 
          trendUp={false} 
          icon={Package}
          subtext="Mg. de Contrib: 52%"
          chartColor="#d97706"
          onClick={() => setDrillDownData({ title: 'Custo de Mercadoria Vendida', value: mockDashboardData.custoProdutosVendidos })}
          delay="160ms"
        />
        <MetricCard 
          title="Lucro Operacional" 
          value={formatCurrency(mockDashboardData.lucro)} 
          trend="+24.7%" 
          trendUp={true} 
          icon={TrendingUp}
          subtext="Mg. Líquida: 33.1%"
          chartColor="#db2777"
          onClick={() => setDrillDownData({ title: 'Lucro Operacional (EBITDA)', value: mockDashboardData.lucro })}
          delay="240ms"
        />
      </div>

      {/* ROW 2: Evolução (8) + Sangria/Ação (4) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up" style={{ animationDelay: '320ms' }}>
         <Card className="xl:col-span-8 shadow-sm">
           <CardHeader className="p-6 pb-4 border-b border-border/50 bg-muted/10">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <div>
                 <CardTitle className="text-base font-semibold tracking-tight">Evolução Diária</CardTitle>
                 <p className="text-sm text-muted-foreground mt-0.5">Receita Bruta vs Lucro gerado no período</p>
               </div>
               <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-sky-600"></div> Receita</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-pink-600"></div> Lucro</div>
               </div>
             </div>
           </CardHeader>
           <CardContent className="p-6 pb-2">
              {isLoading ? (
                <div className="h-[280px] w-full bg-muted/40 rounded-lg animate-pulse border border-border"></div>
              ) : (
                <div className="h-[280px] w-full animate-in fade-in duration-500">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={evolutionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={{ stroke: 'hsl(var(--border))' }} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                        dy={10} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontFamily: 'monospace' }} 
                        tickFormatter={(value) => `R$${value/1000}k`}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontWeight: 600, fontFamily: 'monospace' }}
                        formatter={(value: number) => [formatCurrency(value), '']}
                        labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '8px', fontWeight: 500 }}
                        cursor={{ fill: 'hsl(var(--accent))' }}
                      />
                      <Bar dataKey="Receita" fill="#0284c7" radius={[4, 4, 0, 0]} maxBarSize={30} />
                      <Bar dataKey="Lucro" fill="#db2777" radius={[4, 4, 0, 0]} maxBarSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
           </CardContent>
         </Card>

         <Card className="xl:col-span-4 flex flex-col shadow-sm">
           <CardHeader className="p-6 pb-4 border-b border-border/50 bg-amber-500/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
                    Onde estamos perdendo
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">Alertas e sangrias ativas</p>
                </div>
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
           </CardHeader>
           <CardContent className="p-0 flex-1 overflow-y-auto">
             <div className="divide-y divide-border/50">
                <ActionItem icon={Truck} title="Fretes sem Subsídio" desc="R$ 1.250,00 de prejuízo direto no iFood." cta="Auditar" severity="red" onClick={() => setDrillDownData({ title: 'Prejuízo Frete iFood' })} />
                <ActionItem icon={TrendingDown} title="Margem comprometida" desc="3 pedidos com Margem Líquida negativa." cta="Revisar" severity="amber" onClick={() => setDrillDownData({ title: 'Alertas de Margem' })} />
                <ActionItem icon={Box} title="Estoque de cauda longa" desc="R$ 4.500 parados há > 60 dias." cta="Promover" severity="amber" onClick={() => setDrillDownData({ title: 'Estoque Parado' })} />
                <ActionItem icon={CalendarClock} title="Folha Salarial" desc="R$ 22.277,36 vence quinta-feira." cta="Projetar" severity="amber" onClick={() => setDrillDownData({ title: 'Projeção de Fluxo de Caixa' })} />
             </div>
           </CardContent>
         </Card>
      </div>

      {/* ROW 3: Waterfall do Lucro */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
         <Card className="shadow-sm border-border overflow-hidden bg-card">
           <CardHeader className="p-6 pb-4 border-b border-border/50 bg-muted/10">
             <CardTitle className="text-base font-semibold tracking-tight">De onde vem o nosso Lucro?</CardTitle>
             <p className="text-sm text-muted-foreground mt-0.5">Deduções detalhadas da Receita Bruta até o EBITDA.</p>
           </CardHeader>
           <CardContent className="p-0">
             <div className="overflow-x-auto w-full custom-scrollbar">
                <div className="min-w-[800px] flex h-[280px] items-end justify-between px-8 pb-8 pt-12 gap-2 relative">
                   <WaterfallBar label="Receita Bruta" value={mockDashboardData.faturamentoMes} type="start" />
                   <WaterfallBar label="Taxas Plat." value={-12400} type="negative" />
                   <WaterfallBar label="Estornos" value={-3200} type="negative" />
                   
                   <div className="w-px h-full bg-border border-dashed mx-2 relative group flex items-end justify-center pointer-events-none"></div>

                   <WaterfallBar label="Receita Liq." value={132474.70} type="subtotal" />
                   <WaterfallBar label="CMV" value={-mockDashboardData.custoProdutosVendidos} type="negative" />
                   <WaterfallBar label="Entrega" value={-15000} type="negative" />

                   <div className="w-px h-full bg-border border-dashed mx-2 relative group flex items-end justify-center pointer-events-none"></div>

                   <WaterfallBar label="Custos Fixos" value={-mockDashboardData.custosFixos} type="negative" />
                   <WaterfallBar label="Variáveis" value={-mockDashboardData.custosVariaveis} type="negative" />
                   <WaterfallBar label="Lucro Líq." value={mockDashboardData.lucro} type="end" />
                </div>
             </div>
           </CardContent>
         </Card>
      </div>

      {/* ROW 4: Relatórios & Logs */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up" style={{ animationDelay: '480ms' }}>
         <Card className="xl:col-span-8 overflow-hidden border-border shadow-sm">
           <CardHeader className="p-6 pb-4 border-b border-border/50 flex flex-row items-center justify-between bg-muted/10">
             <div>
               <CardTitle className="text-base font-semibold tracking-tight">Auditoria: Lançamentos Críticos</CardTitle>
               <p className="text-sm text-muted-foreground mt-0.5">Transações de alto valor que impactam as margens</p>
             </div>
             <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">DRE Interativo</button>
           </CardHeader>
           <div className="overflow-x-auto">
             {isLoading ? (
               <div className="p-6 space-y-4 animate-pulse">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className="h-12 bg-muted/40 rounded-lg w-full"></div>
                 ))}
               </div>
             ) : (
               <table className="w-full text-sm text-left animate-in fade-in duration-500">
                 <thead>
                   <tr className="border-b border-border bg-muted/5">
                     <th className="px-6 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Transação / Referência</th>
                     <th className="px-6 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Centro de Custo</th>
                     <th className="px-6 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-right">Valor Aud.</th>
                     <th className="px-6 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-center">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50">
                   <TableRow title="Compra Skincare" desc="NF: 000.124.551 - Fornecedor A" origin="Araguari" val="R$ 15.000,00" stat="Liquidado" statColor="emerald" onClick={() => setDrillDownData({ title: 'Pagamento Fornecedor', value: 15000 })} />
                   <TableRow title="DAS Competência 05" desc="Ref: Tributos Fixos" origin="Global" val="R$ 3.600,00" stat="Em aberto" statColor="amber" onClick={() => setDrillDownData({ title: 'Pagamento DAS', value: 3600 })} />
                   <TableRow title="Folha Base (CLT + Extras)" desc="34 funcionários alocados" origin="Ambas Lojas" val="R$ 22.277,36" stat="Vence dia 05" statColor="red" onClick={() => setDrillDownData({ title: 'Folha Pagamento', value: 22277.36 })} />
                   <TableRow title="Liquidação Semanal iFood" desc="Lote #IFD-8821" origin="Uberlândia" val="+R$ 12.450,00" stat="Liquidado" statColor="emerald" onClick={() => setDrillDownData({ title: 'Receita Integração', value: 12450 })} />
                 </tbody>
               </table>
             )}
           </div>
         </Card>

         <Card className="xl:col-span-4 flex flex-col border-border shadow-sm">
            <CardHeader className="p-6 pb-4 border-b border-border/50 flex flex-row items-center justify-between bg-muted/10">
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">Metas de Saúde Mensal</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">Budget vs Realizado</p>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-5 space-y-7 flex-1 overflow-y-auto">
              <DetailedMetric title="Teto de Despesas Fixas" value="R$ 12.350,00" sub="Limite 15k - Seguro e saudável" progress={82} color="bg-emerald-500" />
              <DetailedMetric title="Meta de Lucro (EBITDA)" value="R$ 48.000,00" sub="Falta 20% para bater o alvo" progress={80} color="bg-sky-500" />
              <DetailedMetric title="Capacidade Produtiva" value="3.500 Envios" sub="Perigo: ociosos aos finais de semana" progress={45} color="bg-amber-500" />
            </CardContent>
         </Card>
      </div>

      {/* DRAWER MOCK */}
      <Drawer isOpen={!!drillDownData} onClose={() => setDrillDownData(null)} title={drillDownData?.title || 'Relatório de Auditoria'}>
        <div className="mt-6 space-y-6">
           <div className="bg-muted/10 border border-border p-6 rounded-xl flex flex-col items-center justify-center text-center">
             <span className="text-sm text-muted-foreground font-medium mb-1">Impacto Financeiro Auditado</span>
             <span className="text-4xl font-bold text-foreground font-mono tabular-nums tracking-tight">
               {drillDownData?.value ? formatCurrency(drillDownData.value) : 'R$ ---'}
             </span>
             <div className="mt-4 flex gap-2">
                <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 text-xs font-bold rounded-full">Revisado</span>
                <span className="bg-muted text-muted-foreground px-3 py-1 text-xs font-bold rounded-full">Competência Atual</span>
             </div>
           </div>
           
           <div>
             <h3 className="text-sm font-semibold text-foreground mb-4">Composição Pormenorizada</h3>
             <div className="border border-border rounded-lg overflow-hidden">
               <table className="w-full text-left text-sm">
                 <thead className="bg-muted text-muted-foreground font-medium text-xs">
                   <tr>
                     <th className="py-3 px-4">Lançamento / Histórico</th>
                     <th className="py-3 px-4">Centro</th>
                     <th className="py-3 px-4 text-right">Valor Consolidado</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                   <tr className="hover:bg-muted/30 transition-colors bg-card">
                     <td className="py-4 px-4 font-medium text-foreground">Registro Automatizado XZ1<br/><span className="text-xs text-muted-foreground font-normal">Integração API Safepay</span></td>
                     <td className="py-4 px-4 text-muted-foreground">Araguari</td>
                     <td className="py-4 px-4 text-right font-mono font-bold text-foreground overflow-ellipsis">R$ 1.200,00</td>
                   </tr>
                   <tr className="hover:bg-muted/30 transition-colors bg-card">
                     <td className="py-4 px-4 font-medium text-foreground">Ajuste Manual Arthur<br/><span className="text-xs text-muted-foreground font-normal">Reconciliação contábil do mês</span></td>
                     <td className="py-4 px-4 text-muted-foreground">Global</td>
                     <td className="py-4 px-4 text-right font-mono font-bold text-destructive">- R$ 150,00</td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      </Drawer>

    </div>
  );
}

// Subcomponents

function MetricCard({ title, value, trend, trendUp, icon: Icon, subtext, chartColor, onClick, delay }: MetricCardProps) {
  return (
    <div onClick={onClick} className="h-full animate-slide-up cursor-pointer" style={{ animationDelay: delay }}>
      <Card className="hover:shadow-md transition-all duration-300 group hover:border-primary/50 h-full flex flex-col shadow-sm border-border bg-card">
        <CardContent className="p-6 flex-1 flex gap-4 items-center">
          <div 
             className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 shadow-sm border border-border"
             style={{ backgroundColor: `${chartColor}15`, color: chartColor }}
          >
             <Icon className="h-7 w-7" />
          </div>
          <div className="flex-1 space-y-1 overflow-hidden">
             <p className="text-sm font-semibold text-muted-foreground truncate">{title}</p>
             <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-foreground font-mono">{value.replace('R$ ', 'R$')}</h3>
             </div>
             <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-max ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                  {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {trend}
                </span>
                <span className="text-xs font-medium text-muted-foreground truncate">{subtext}</span>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActionItem({ icon: Icon, title, desc, cta, severity, onClick }: ActionItemProps) {
  const severities = {
    red: "text-destructive",
    amber: "text-amber-500",
  };

  return (
    <div className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/30 cursor-pointer bg-card" onClick={onClick}>
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted border border-border shadow-sm ${severities[severity]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-foreground leading-snug">{title}</p>
          <p className="text-[13px] text-muted-foreground leading-snug">{desc}</p>
        </div>
      </div>
      <div>
        <button className="text-xs uppercase tracking-wider font-bold text-primary flex items-center group-hover:underline px-3 py-1.5 rounded-md hover:bg-primary/10 transition-colors">
          {cta} <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}

function WaterfallBar({ label, value, type }: { label: string, value: number, type: 'start' | 'negative' | 'subtotal' | 'end' }) {
  const isPositive = value >= 0;
  
  // Logical mock representation
  const maxVal = 200000;
  const absValue = Math.abs(value);
  const heightPercent = Math.max(10, Math.min(100, (absValue / maxVal) * 100));
  
  let color = 'bg-sky-500';
  if (type === 'end') color = 'bg-emerald-500';
  if (type === 'negative') color = 'bg-destructive opacity-80';
  if (type === 'subtotal') color = 'bg-sky-600';

  return (
    <div className="flex-1 flex flex-col items-center justify-end group min-w-[70px] relative">
       {/* Toque hover tooltips */}
       <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background font-mono text-[11px] font-bold px-3 py-1.5 rounded-md shadow-lg pointer-events-none z-20 whitespace-nowrap">
         {isPositive ? '+' : '-'}{formatCurrency(absValue)}
       </div>

       <div 
         className={`w-full max-w-[48px] rounded-t-md transition-all duration-500 ${color} shadow-sm group-hover:brightness-110 relative z-10 flex flex-col justify-start pt-2`} 
         style={{ height: `${heightPercent}%` }} 
       >
         {/* Line indicating absolute position (mock visual) */}
         {(type === 'negative' || type === 'subtotal') && (
            <div className="absolute -left-20 right-full border-t border-border border-dashed h-px top-0 pointer-events-none opacity-50 z-0"></div>
         )}
       </div>
       <span className="text-[11px] font-semibold text-muted-foreground mt-4 text-center block leading-tight px-1 h-8">
         {label}
       </span>
    </div>
  )
}

function DetailedMetric({ title, value, sub, progress, color }: DetailedMetricProps) {
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground font-medium">{sub}</p>
        </div>
        <span className="text-base font-mono font-bold">{value}</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted border border-border shadow-inner">
        <div className={`absolute top-0 bottom-0 left-0 transition-all duration-1000 ease-out ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function TableRow({ title, desc, origin, val, stat, statColor, onClick }: TableRowProps) {
  const badgeColors = {
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    red: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <tr className="group hover:bg-muted/40 transition-colors cursor-pointer bg-card" onClick={onClick}>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground mb-1">{title}</span>
          <span className="text-[11px] font-medium text-muted-foreground">{desc}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-muted-foreground">{origin}</td>
      <td className="px-6 py-4 text-right font-mono font-bold text-sm tracking-tight">{val}</td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold border ${badgeColors[statColor]}`}>
          {stat}
        </span>
      </td>
    </tr>
  );
}

function TimelineItem({ icon: Icon, title, desc, time, color }: TimelineItemProps) {
  return (
    <div className="relative flex items-center gap-4">
      <div 
        className="flex items-center justify-center w-8 h-8 rounded-full border border-border bg-muted shrink-0 z-10 shadow-sm"
        style={{ color: color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="font-semibold text-sm text-foreground">{title}</div>
          <time className="text-[11px] font-semibold text-muted-foreground shrink-0">{time}</time>
        </div>
        <div className="text-[13px] font-medium text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
