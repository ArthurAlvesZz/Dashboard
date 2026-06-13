import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDashboardData, mockChartData } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { 
  TrendingUp, TrendingDown, Box, Truck, CalendarClock, ArrowRightLeft, 
  DollarSign, Wallet, Package, ChevronRight, Activity, ShieldCheck
} from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

export function DashboardView() {
  const [drillDownData, setDrillDownData] = useState<any | null>(null);
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
          <p className="mt-1 text-sm text-muted-foreground">Lucro, caixa, custos, estoque e entregas da Santa Bronx.</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-semibold uppercase tracking-widest shadow-sm">
           <ShieldCheck className="w-3.5 h-3.5" /> Confiança Alta
        </div>
      </div>

      {/* ROW 1: 4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard 
          title="Faturamento do Mês" 
          value={formatCurrency(mockDashboardData.faturamentoMes)} 
          trend="+12.5%" 
          trendUp={true} 
          icon={DollarSign}
          subtext="vs mês anterior"
          chartColor="#db2777" /* pink-600 */
          onClick={() => setDrillDownData({ title: 'Faturamento Mensal', value: mockDashboardData.faturamentoMes })}
          delay="0ms"
        />
        <MetricCard 
          title="Receita Líquida" 
          value={formatCurrency(132474.70)} 
          trend="+8.2%" 
          trendUp={true} 
          icon={Wallet}
          subtext="vs mês anterior"
          chartColor="#059669" /* emerald-600 */
          onClick={() => setDrillDownData({ title: 'Receita Líquida', value: 132474.70 })}
          delay="80ms"
        />
        <MetricCard 
          title="Saída de Produto / CMV" 
          value={formatCurrency(mockDashboardData.custoProdutosVendidos)} 
          trend="-3.1%" 
          trendUp={false} 
          icon={Package}
          subtext="vs mês anterior"
          chartColor="#d97706" /* amber-600 */
          onClick={() => setDrillDownData({ title: 'Custo de Mercadoria', value: mockDashboardData.custoProdutosVendidos })}
          delay="160ms"
        />
        <MetricCard 
          title="Lucro Operacional" 
          value={formatCurrency(mockDashboardData.lucro)} 
          trend="+24.7%" 
          trendUp={true} 
          icon={TrendingUp}
          subtext="vs mês anterior"
          chartColor="#0284c7" /* sky-600 */
          onClick={() => setDrillDownData({ title: 'Lucro Operacional', value: mockDashboardData.lucro })}
          delay="240ms"
        />
      </div>

      {/* ROW 2: 8 cols (Evolução) + 4 cols (Ação Agora) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up" style={{ animationDelay: '320ms' }}>
         <Card className="xl:col-span-8 border-border">
           <CardHeader className="p-6 pb-2 border-b border-border/50">
             <div className="flex items-center justify-between">
               <div>
                 <CardTitle className="text-base font-semibold tracking-tight">Evolução Financeira</CardTitle>
                 <p className="text-xs text-muted-foreground mt-0.5">Faturamento, CMV e Lucro no período</p>
               </div>
               <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5 shadow-sm">
                  <button className="rounded-md px-3 py-1 text-xs font-medium bg-background text-foreground shadow-sm">Faturamento</button>
                  <button className="rounded-md px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">CMV</button>
                  <button className="rounded-md px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">Lucro</button>
               </div>
             </div>
           </CardHeader>
           <CardContent className="p-6">
              {isLoading ? (
                <div className="h-[280px] w-full flex items-end gap-2 animate-pulse">
                  <div className="w-full h-full bg-muted/40 rounded-lg"></div>
                </div>
              ) : (
                <div className="h-[280px] w-full relative flex items-end animate-in fade-in duration-500">
                   {/* Grid Lines */}
                 <div className="absolute inset-x-0 inset-y-4 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-border border-dashed w-full h-[33%] opacity-50"></div>
                    <div className="border-b border-border border-dashed w-full h-[33%] opacity-50"></div>
                    <div className="border-b border-border border-dashed w-full h-[33%] opacity-50"></div>
                 </div>
                 
                 {/* Chart Graph */}
                 <div className="absolute inset-x-0 bottom-4 top-4">
                   <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none" className="overflow-visible">
                     <defs>
                       <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#db2777" stopOpacity="0.2" />
                         <stop offset="100%" stopColor="#db2777" stopOpacity="0" />
                       </linearGradient>
                       <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                         <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                       </linearGradient>
                     </defs>
                     <path 
                       d="M0,280 C100,240 200,100 300,150 C400,200 500,80 600,120 C700,70 800,150 900,90 C950,50 1000,60 1000,60 L1000,300 L0,300 Z" 
                       fill="url(#grad1)" 
                     />
                     <path 
                       d="M0,280 C100,240 200,100 300,150 C400,200 500,80 600,120 C700,70 800,150 900,90 C950,50 1000,60 1000,60" 
                       fill="none" 
                       stroke="#db2777" 
                       strokeWidth="3" 
                       className="drop-shadow-sm"
                     />
                      <path 
                       d="M0,290 C150,290 250,260 350,280 C450,290 550,220 650,260 C750,270 850,200 1000,180 L1000,300 L0,300 Z" 
                       fill="url(#grad2)" 
                     />
                     <path 
                       d="M0,290 C150,290 250,260 350,280 C450,290 550,220 650,260 C750,270 850,200 1000,180" 
                       fill="none" 
                       stroke="#059669" 
                       strokeWidth="3" 
                       className="drop-shadow-sm"
                     />
                   </svg>
                 </div>
                 
                 <div className="absolute inset-x-0 -bottom-1 flex justify-between text-[11px] font-medium text-muted-foreground w-full">
                    <span>10/06</span><span>11/06</span><span>12/06</span><span>13/06</span><span>14/06</span><span>15/06</span><span>16/06</span>
                 </div>
              </div>
              )}
           </CardContent>
         </Card>

         <Card className="xl:col-span-4 flex flex-col border-border">
           <CardHeader className="p-6 pb-4 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold tracking-tight">Ação Agora</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Pendências com impacto financeiro</p>
                </div>
                <span className="bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
              </div>
           </CardHeader>
           <CardContent className="p-0 flex-1 overflow-y-auto">
             <div className="divide-y divide-border/50">
                <ActionItem icon={Box} title="Produtos sem custo médio" desc="SKUs CON07, ADS03 exigem definição." cta="Mapear" severity="amber" onClick={() => setDrillDownData({ title: 'Produtos sem Custo Médio' })} />
                <ActionItem icon={Truck} title="Entregas sem custo real" desc="5 guias sem valor de liquidação." cta="Auditar" severity="red" onClick={() => setDrillDownData({ title: 'Entregas sem Custo Real' })} />
                <ActionItem icon={CalendarClock} title="Contas a vencer" desc="R$ 22.277,36 vencendo em 7 dias." cta="Pagar" severity="amber" onClick={() => setDrillDownData({ title: 'Contas a Vencer', value: 22277.36 })} />
                <ActionItem icon={ArrowRightLeft} title="Fluxo de Estoque negativo" desc="Loja Araguari: Reposição > Saídas" cta="Ver" severity="red" onClick={() => setDrillDownData({ title: 'Fluxo de Estoque' })} />
                <ActionItem icon={TrendingDown} title="Margem em risco" desc="3 pedidos com Margem < 15%" cta="Revisar" severity="amber" onClick={() => setDrillDownData({ title: 'Alertas de Margem' })} />
             </div>
           </CardContent>
         </Card>
      </div>

      {/* ROW 3: Lucro Real Agora (8) + Metas e Saúde (4) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
         <Card className="xl:col-span-8 shadow-sm group border-border">
           <CardHeader className="p-6 pb-2 border-b border-border/50">
             <CardTitle className="text-base font-semibold tracking-tight">Lucro Real Agora</CardTitle>
             <p className="text-xs text-muted-foreground mt-0.5">Composição detalhada da cadeia de valor do período</p>
           </CardHeader>
           <CardContent className="p-6 pt-4">
             <div className="flex flex-col md:flex-row gap-4 h-full items-center">
                {/* Waterfall visualization mock */}
                <div className="flex-1 w-full bg-muted/20 rounded-xl p-5 border border-border/50 flex flex-col justify-center space-y-3 relative overflow-hidden">
                  
                  <div className="flex items-center justify-between text-sm p-1.5 rounded transition-colors group/item hover:bg-muted/50 cursor-pointer" onClick={() => setDrillDownData({ title: 'Faturamento Bruto', value: mockDashboardData.faturamentoMes })}>
                    <span className="text-muted-foreground flex items-center gap-2 group-hover/item:text-foreground transition-colors">Faturamento Bruto</span>
                    <span className="font-mono text-foreground font-medium">{formatCurrency(mockDashboardData.faturamentoMes)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-1.5 rounded transition-colors group/item hover:bg-muted/50 cursor-pointer" onClick={() => setDrillDownData({ title: 'Taxas e Estornos', value: 5120.30 })}>
                    <span className="text-muted-foreground flex items-center gap-2">Taxas de plataforma</span>
                    <span className="font-mono text-destructive">-{formatCurrency(5120.30)}</span>
                  </div>
                  
                  <div className="h-px w-full bg-border/50 my-1" />
                  
                  <div className="flex items-center justify-between text-sm p-1.5 rounded transition-colors group/item hover:bg-muted/50 cursor-pointer" onClick={() => setDrillDownData({ title: 'Receita Líquida', value: 132474.70 })}>
                    <span className="text-foreground font-medium flex items-center gap-2">Receita Líquida</span>
                    <span className="font-mono text-foreground font-semibold">{formatCurrency(132474.70)}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm p-1.5 rounded transition-colors group/item hover:bg-muted/50 cursor-pointer" onClick={() => setDrillDownData({ title: 'Custos Fixos', value: mockDashboardData.custosFixos })}>
                    <span className="text-muted-foreground flex items-center gap-2">Custos Fixos</span>
                    <span className="font-mono text-destructive">-{formatCurrency(mockDashboardData.custosFixos)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-1.5 rounded transition-colors group/item hover:bg-muted/50 cursor-pointer" onClick={() => setDrillDownData({ title: 'Custos Variáveis', value: mockDashboardData.custosVariaveis })}>
                    <span className="text-muted-foreground flex items-center gap-2">Custos Variáveis</span>
                    <span className="font-mono text-destructive">-{formatCurrency(mockDashboardData.custosVariaveis)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-1.5 rounded transition-colors group/item hover:bg-muted/50 cursor-pointer" onClick={() => setDrillDownData({ title: 'CMV', value: mockDashboardData.custoProdutosVendidos })}>
                    <span className="text-muted-foreground flex items-center gap-2">Saída de Produto (CMV)</span>
                    <span className="font-mono text-destructive">-{formatCurrency(mockDashboardData.custoProdutosVendidos)}</span>
                  </div>
                </div>

                <div className="w-full md:w-64 shrink-0 bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-primary/10 transition-colors shadow-sm" onClick={() => setDrillDownData({ title: 'Lucro Operacional', value: mockDashboardData.lucro })}>
                   <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Lucro Operacional</span>
                   <span className="text-4xl font-bold tracking-tight text-foreground mb-3">{formatCurrency(mockDashboardData.lucro).replace('R$ ', 'R$')}</span>
                   <div className="flex items-center gap-2">
                     <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Mg. 33.1%</span>
                   </div>
                </div>
             </div>
           </CardContent>
         </Card>

         <Card className="xl:col-span-4 flex flex-col border-border animate-slide-up" style={{ animationDelay: '480ms' }}>
            <CardHeader className="p-6 pb-2 border-b border-border/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">Metas e Saúde</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Andamento das projeções mensais</p>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-5 space-y-6 flex-1 overflow-y-auto">
              <DetailedMetric title="Meta de Faturamento" value="R$ 145.000,00" sub="75% atingido da meta (R$ 200k)" progress={75} color="bg-primary" />
              <DetailedMetric title="Teto de Despesas Fixas" value="R$ 12.350,00" sub="Consumido do orçamento restrito" progress={60} color="bg-amber-500" />
              <DetailedMetric title="Meta de Lucro Operacional" value="R$ 48.000,00" sub="Faltam R$ 12k para dobrar lucro" progress={80} color="bg-emerald-500" />
              <DetailedMetric title="Capacidade Produtiva" value="3.5k Envios" sub="Uso da operação atual" progress={45} color="bg-blue-500" />
            </CardContent>
         </Card>
      </div>

      {/* ROW 4: Table (8 cols) + Timeline (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-slide-up" style={{ animationDelay: '560ms' }}>
         <Card className="xl:col-span-8 overflow-hidden border-border">
           <CardHeader className="p-6 pb-4 border-b border-border/50 flex flex-row items-center justify-between">
             <div>
               <CardTitle className="text-base font-semibold tracking-tight">Lançamentos Recentes</CardTitle>
               <p className="text-xs text-muted-foreground mt-0.5">Movimentações e transações críticas</p>
             </div>
             <button className="text-xs text-primary font-medium hover:underline">Ver todos</button>
           </CardHeader>
           <div className="overflow-x-auto">
             {isLoading ? (
               <div className="p-6 space-y-4 animate-pulse">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className="h-10 bg-muted/40 rounded-lg w-full"></div>
                 ))}
               </div>
             ) : (
               <table className="w-full text-sm text-left animate-in fade-in duration-500">
                 <thead>
                   <tr className="border-b border-border bg-muted/20">
                     <th className="px-6 py-4 font-medium text-muted-foreground text-[11px] uppercase tracking-wider">Transação</th>
                     <th className="px-6 py-4 font-medium text-muted-foreground text-[11px] uppercase tracking-wider">Origem</th>
                     <th className="px-6 py-4 font-medium text-muted-foreground text-[11px] uppercase tracking-wider text-right">Valor</th>
                     <th className="px-6 py-4 font-medium text-muted-foreground text-[11px] uppercase tracking-wider text-center">Status</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border/50">
                   <TableRow title="Compra Skincare" desc="Pagamento Fornecedor" origin="Matriz" val="R$ 15.000,00" stat="Pago" statColor="emerald" onClick={() => setDrillDownData({ title: 'Pagamento Fornecedor', value: 15000 })} />
                   <TableRow title="DAS Competência" desc="Impostos" origin="Global" val="R$ 3.600,00" stat="Em aberto" statColor="amber" onClick={() => setDrillDownData({ title: 'Pagamento DAS', value: 3600 })} />
                   <TableRow title="Folha de Pagamento" desc="Salários Equipe" origin="Global" val="R$ 9.800,00" stat="Vence em 2d" statColor="red" onClick={() => setDrillDownData({ title: 'Folha Pagamento', value: 9800 })} />
                   <TableRow title="Motoboy #ORD-992" desc="Frete Logística" origin="Araguari" val="R$ ---" stat="Revisar" statColor="amber" onClick={() => setDrillDownData({ title: 'Revisão Frete' })} />
                   <TableRow title="Liquidação iFood" desc="Receita Vendas" origin="Uberlândia" val="+R$ 4.250,00" stat="Concluído" statColor="emerald" onClick={() => setDrillDownData({ title: 'Receita Integração', value: 4250 })} />
                 </tbody>
               </table>
             )}
           </div>
         </Card>

         <Card className="xl:col-span-4 flex flex-col border-border">
           <CardHeader className="p-6 pb-4 border-b border-border/50">
             <CardTitle className="text-base font-semibold tracking-tight">Log de Sistema</CardTitle>
             <p className="text-xs text-muted-foreground mt-0.5">Últimas atividades registradas</p>
           </CardHeader>
           <CardContent className="p-6 flex-1 overflow-y-auto">
             <div className="space-y-6">
               <TimelineItem icon={Wallet} title="Fechamento do Caixa" desc="R$ 12.450 em Uberlândia" time="Agora" color="#059669" />
               <TimelineItem icon={Package} title="Entrada de Estoque" desc="120 unidades de Vestuário" time="2h atrás" color="#0284c7" />
               <TimelineItem icon={Activity} title="Baixa Automática" desc="Conciliação de cartões OK" time="5h atrás" color="#db2777" />
               <TimelineItem icon={Truck} title="Rastreio Atualizado" desc="30 envios marcados entregues" time="Ontem" color="#d97706" />
             </div>
           </CardContent>
         </Card>
      </div>

      {/* DRAWER MOCK */}
      <Drawer isOpen={!!drillDownData} onClose={() => setDrillDownData(null)} title={drillDownData?.title || 'Detalhes da Métrica'}>
        <div className="mt-6 space-y-6">
           <div className="bg-muted/30 border border-border p-5 rounded-lg flex items-center justify-between">
             <span className="text-sm text-muted-foreground font-medium">Valor Auditado</span>
             <span className="text-3xl font-bold text-foreground font-mono tabular-nums">
               {drillDownData?.value ? formatCurrency(drillDownData.value) : 'R$ ---'}
             </span>
           </div>
           
           <div>
             <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 pb-2 border-b border-border">Composição do Valor</h3>
             <table className="w-full text-left text-sm">
               <thead className="bg-muted/50 text-muted-foreground text-xs">
                 <tr>
                   <th className="py-2 px-3 font-medium rounded-l-md">Referência</th>
                   <th className="py-2 px-3 font-medium">Loja</th>
                   <th className="py-2 px-3 font-medium text-right rounded-r-md">Impacto</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border">
                 <tr className="hover:bg-muted/30 transition-colors">
                   <td className="py-3 px-3">Lançamento Ref. XZ1</td>
                   <td className="py-3 px-3 text-muted-foreground">Araguari</td>
                   <td className="py-3 px-3 text-right font-mono text-muted-foreground">R$ 1.200,00</td>
                 </tr>
                 <tr className="hover:bg-muted/30 transition-colors">
                   <td className="py-3 px-3">Lançamento Ref. XZ2</td>
                   <td className="py-3 px-3 text-muted-foreground">Uberlândia</td>
                   <td className="py-3 px-3 text-right font-mono text-muted-foreground">R$ 800,00</td>
                 </tr>
                 <tr className="hover:bg-muted/30 transition-colors">
                   <td className="py-3 px-3">Ajuste Residual</td>
                   <td className="py-3 px-3 text-muted-foreground">Global</td>
                   <td className="py-3 px-3 text-right font-mono text-destructive">- R$ 150,00</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>
      </Drawer>

    </div>
  );
}

// Subcomponents

function MetricCard({ title, value, trend, trendUp, icon: Icon, subtext, chartColor, onClick, delay }: any) {
  return (
    <div onClick={onClick} className="h-full animate-slide-up" style={{ animationDelay: delay }}>
      <Card className="hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-primary/20 h-full flex flex-col relative overflow-hidden bg-card/60 backdrop-blur-sm">
        <CardContent className="p-5 pb-0 flex-1 flex flex-col">
          <div className="flex items-start justify-between">
            <div className="space-y-1 relative z-10 w-full pr-2">
              <p className="text-xs font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground font-mono truncate">{value.replace('R$ ', 'R$')}</p>
              <div className="flex items-center gap-1.5 pt-1">
                {trendUp ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : <TrendingDown className="w-3.5 h-3.5 text-destructive" />}
                <span className={`text-xs font-semibold ${trendUp ? 'text-emerald-500' : 'text-destructive'}`}>
                  {trend}
                </span>
                <span className="text-[11px] text-muted-foreground truncate">{subtext}</span>
              </div>
            </div>
            <div 
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 border border-border/50 relative z-10"
              style={{ backgroundColor: `${chartColor}15` }}
            >
              <Icon className="h-5 w-5" style={{ color: chartColor }} />
            </div>
          </div>
          
          <div className="h-10 w-full mt-auto relative z-0 opacity-50 group-hover:opacity-100 transition-opacity">
             <svg width="100%" height="100%" viewBox="0 0 200 40" preserveAspectRatio="none">
               <defs>
                 <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor={chartColor} stopOpacity="0.15" />
                   <stop offset="100%" stopColor={chartColor} stopOpacity="0" />
                 </linearGradient>
               </defs>
               <path 
                 d={trendUp 
                   ? "M0,35 Q50,15 100,25 T200,5 L200,40 L0,40 Z" 
                   : "M0,5 Q50,25 100,15 T200,35 L200,40 L0,40 Z"}
                 fill={`url(#grad-${title})`} 
               />
               <path 
                 d={trendUp 
                   ? "M0,35 Q50,15 100,25 T200,5" 
                   : "M0,5 Q50,25 100,15 T200,35"}
                 fill="none"
                 stroke={chartColor}
                 strokeWidth="2"
                 strokeLinecap="round"
                 strokeLinejoin="round"
               />
             </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailedMetric({ title, value, sub, progress, color }: any) {
  return (
    <div>
      <div className="flex justify-between items-end mb-1.5">
        <div className="space-y-0.5">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <p className="text-[11px] text-muted-foreground leading-snug">{sub}</p>
        </div>
        <span className="text-sm font-mono font-semibold">{value}</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/50 border border-border/50">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function ActionItem({ icon: Icon, title, desc, cta, severity, onClick }: any) {
  const severities = {
    red: "text-destructive",
    amber: "text-amber-500",
  };

  return (
    <div className="group flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/30 cursor-pointer" onClick={onClick}>
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/50 ${severities[severity as keyof typeof severities]}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
          <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
        </div>
      </div>
      <div>
        <button className="text-[11px] uppercase tracking-wider font-semibold text-primary flex items-center group-hover:underline">
          {cta} <ChevronRight className="w-3 h-3 ml-0.5" />
        </button>
      </div>
    </div>
  );
}

function TableRow({ title, desc, origin, val, stat, statColor, onClick }: any) {
  const badgeColors = {
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    red: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <tr className="group hover:bg-muted/30 transition-colors cursor-pointer" onClick={onClick}>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-[11px] text-muted-foreground mt-0.5">{desc}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-muted-foreground">{origin}</td>
      <td className="px-6 py-4 text-right font-mono text-sm">{val}</td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] uppercase tracking-wider font-medium border ${badgeColors[statColor as keyof typeof badgeColors]}`}>
          {stat}
        </span>
      </td>
    </tr>
  );
}

function TimelineItem({ icon: Icon, title, desc, time, color }: any) {
  return (
    <div className="relative flex items-center gap-4">
      <div 
        className="flex items-center justify-center w-8 h-8 rounded-full border border-border/50 bg-muted shrink-0 z-10"
        style={{ color: color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="font-semibold text-sm text-foreground">{title}</div>
          <time className="text-[10px] text-muted-foreground shrink-0">{time}</time>
        </div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
