import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { mockDashboardData, mockChartData } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Box, Truck, CalendarClock, ArrowRightLeft, 
  Minus, Equal, Info, Activity, CheckCircle2, ShieldCheck,
  CreditCard, Package, Wallet, ChevronRight, DollarSign, MoreHorizontal
} from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';

export function DashboardView() {
  const [activeTab, setActiveTab] = useState<'agora' | 'lucro' | 'custos' | 'estoque' | 'entregas' | 'fechamento'>('agora');
  const [drillDownData, setDrillDownData] = useState<any | null>(null);

  const maxChartVal = Math.max(...mockChartData.map(d => d.faturamento));

  const TABS = [
    { id: 'agora', label: 'Agora' },
    { id: 'lucro', label: 'Lucro Real' },
    { id: 'custos', label: 'Custos' },
    { id: 'estoque', label: 'Estoque' },
    { id: 'entregas', label: 'Entregas' },
    { id: 'fechamento', label: 'Fechamento' },
  ] as const;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-20">
      
      {/* 1. CABEÇALHO PREMIUM */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 mt-2">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans flex items-center gap-3">
              Central Financeira Santa Bronx
            </h1>
            <span className="p-1 px-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 text-[10px] uppercase tracking-widest text-emerald-500 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Confiança: Alta
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Lucro, caixa, custos, estoque e entregas em tempo real.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
           <select className="bg-card border border-border text-foreground text-xs rounded-md px-3 py-2 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer shadow-sm">
              <option>Hoje</option>
              <option>Este Mês</option>
              <option>Mês Passado</option>
           </select>
           <select className="bg-card border border-border text-foreground text-xs rounded-md px-3 py-2 focus:outline-none focus:border-primary/50 transition-colors cursor-pointer shadow-sm">
              <option>Todas as Lojas</option>
              <option>Araguari</option>
              <option>Uberlândia</option>
           </select>
           <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium rounded-md px-4 py-2 transition-all shadow-sm flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Fechamento do Dia
           </button>
        </div>
      </header>

      {/* ABAS INTERNAS */}
      <div className="flex overflow-x-auto pb-1 -mx-4 px-4 sm:px-0 sm:mx-0 border-b border-border">
        <div className="flex gap-6">
          {TABS.map(tab => (
            <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                 activeTab === tab.id
                   ? 'text-primary'
                   : 'text-muted-foreground hover:text-foreground'
               }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full shadow-[0_-2px_10px_rgba(236,72,153,0.5)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'agora' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          
          {/* ROW 1: 4 MAIN KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <MetricCard 
              title="Faturamento do Mês" 
              value={formatCurrency(mockDashboardData.faturamentoMes)} 
              trend="+12.5%" 
              trendUp={true} 
              icon={DollarSign}
              subtext="vs mês anterior"
              color="blue"
              onClick={() => setDrillDownData({ title: 'Faturamento Mensal', value: mockDashboardData.faturamentoMes })}
            />
            <MetricCard 
              title="Receita Líquida" 
              value={formatCurrency(132474.70)} 
              trend="+8.2%" 
              trendUp={true} 
              icon={Wallet}
              subtext="vs mês anterior"
              color="emerald"
              onClick={() => setDrillDownData({ title: 'Receita Líquida', value: 132474.70 })}
            />
            <MetricCard 
              title="Saída de Produto (CMV)" 
              value={formatCurrency(mockDashboardData.custoProdutosVendidos)} 
              trend="-3.1%" 
              trendUp={false} 
              icon={Package}
              subtext="vs mês anterior"
              color="amber"
              onClick={() => setDrillDownData({ title: 'Custo de Mercadoria', value: mockDashboardData.custoProdutosVendidos })}
            />
            <MetricCard 
              title="Lucro até o Momento" 
              value={formatCurrency(mockDashboardData.lucro)} 
              trend="+24.7%" 
              trendUp={true} 
              icon={TrendingUp}
              subtext="vs mês anterior"
              color="pink"
              onClick={() => setDrillDownData({ title: 'Lucro Operacional', value: mockDashboardData.lucro })}
            />
          </div>

          {/* ROW 2: 8 cols (Lucro Real Agora) + 4 cols (Ação Agora) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
             <Card className="xl:col-span-8 shadow-sm group">
               <CardHeader className="p-6 pb-2">
                 <CardTitle className="text-base font-semibold tracking-tight">Lucro Real Agora</CardTitle>
                 <CardDescription className="text-xs">Composição detalhada da cadeia de valor do período</CardDescription>
               </CardHeader>
               <CardContent className="p-6 pt-4">
                 <div className="flex flex-col md:flex-row gap-4 h-full items-center">
                    {/* Waterfall visualization mock */}
                    <div className="flex-1 w-full bg-muted/40 rounded-xl p-5 border border-border flex flex-col justify-center space-y-4">
                      
                      <div className="flex items-center justify-between text-sm cursor-pointer hover:bg-accent/50 p-1.5 rounded transition-colors" onClick={() => setDrillDownData({ title: 'Faturamento Bruto', value: mockDashboardData.faturamentoMes })}>
                        <span className="text-muted-foreground">Faturamento Bruto</span>
                        <span className="font-mono text-foreground font-medium">{formatCurrency(mockDashboardData.faturamentoMes)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm cursor-pointer hover:bg-accent/50 p-1.5 rounded transition-colors" onClick={() => setDrillDownData({ title: 'Taxas e Estornos', value: 5120.30 })}>
                        <span className="text-muted-foreground flex items-center gap-2"><Minus className="w-3 h-3 text-destructive" /> Taxas de pagamento</span>
                        <span className="font-mono text-destructive">-{formatCurrency(5120.30)}</span>
                      </div>
                      
                      <div className="h-px w-full bg-border" />
                      
                      <div className="flex items-center justify-between text-sm cursor-pointer hover:bg-accent/50 p-1.5 rounded transition-colors" onClick={() => setDrillDownData({ title: 'Receita Líquida', value: 132474.70 })}>
                        <span className="text-foreground font-medium">Receita Líquida</span>
                        <span className="font-mono text-foreground font-medium">{formatCurrency(132474.70)}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm cursor-pointer hover:bg-accent/50 p-1.5 rounded transition-colors" onClick={() => setDrillDownData({ title: 'Custos Fixos', value: mockDashboardData.custosFixos })}>
                        <span className="text-muted-foreground flex items-center gap-2"><Minus className="w-3 h-3 text-destructive" /> Custos Fixos</span>
                        <span className="font-mono text-destructive">-{formatCurrency(mockDashboardData.custosFixos)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm cursor-pointer hover:bg-accent/50 p-1.5 rounded transition-colors" onClick={() => setDrillDownData({ title: 'Custos Variáveis', value: mockDashboardData.custosVariaveis })}>
                        <span className="text-muted-foreground flex items-center gap-2"><Minus className="w-3 h-3 text-destructive" /> Custos Variáveis</span>
                        <span className="font-mono text-destructive">-{formatCurrency(mockDashboardData.custosVariaveis)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm cursor-pointer hover:bg-accent/50 p-1.5 rounded transition-colors" onClick={() => setDrillDownData({ title: 'Custo com Entrega', value: mockDashboardData.custoEntrega })}>
                        <span className="text-muted-foreground flex items-center gap-2"><Minus className="w-3 h-3 text-destructive" /> Custo com Entrega</span>
                        <span className="font-mono text-destructive">-{formatCurrency(mockDashboardData.custoEntrega)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm cursor-pointer hover:bg-accent/50 p-1.5 rounded transition-colors" onClick={() => setDrillDownData({ title: 'CMV', value: mockDashboardData.custoProdutosVendidos })}>
                        <span className="text-muted-foreground flex items-center gap-2"><Minus className="w-3 h-3 text-destructive" /> CMV / Saída Produto</span>
                        <span className="font-mono text-destructive">-{formatCurrency(mockDashboardData.custoProdutosVendidos)}</span>
                      </div>

                      <div className="h-px w-full bg-border" />
                      
                    </div>

                    <div className="w-full md:w-64 shrink-0 bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-primary/10 transition-colors" onClick={() => setDrillDownData({ title: 'Lucro Operacional', value: mockDashboardData.lucro })}>
                       <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">Lucro Operacional</span>
                       <span className="text-4xl font-bold tracking-tight text-foreground mb-3">{formatCurrency(mockDashboardData.lucro).replace('R$ ', 'R$')}</span>
                       <div className="flex items-center gap-2">
                         <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Mg. 33.1%</span>
                         <span className="text-xs text-muted-foreground">Confiança Alta</span>
                       </div>
                    </div>
                 </div>
               </CardContent>
             </Card>

             <Card className="xl:col-span-4 shadow-sm flex flex-col">
               <CardHeader className="p-6 pb-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold tracking-tight">Ação Agora</CardTitle>
                      <CardDescription className="text-xs mt-0.5">Pendências com impacto financeiro</CardDescription>
                    </div>
                    <span className="bg-destructive/20 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
                  </div>
               </CardHeader>
               <CardContent className="p-0 flex-1 overflow-y-auto">
                 <div className="divide-y divide-border">
                    <ActionItem icon={Box} title="Produtos sem custo médio" desc="SKUs CON07, ADS03 exigem definição." impact="Risco na margem" cta="Mapear" severity="amber" onClick={() => setDrillDownData({ title: 'Produtos sem Custo Médio' })} />
                    <ActionItem icon={Truck} title="Entregas sem custo real" desc="5 guias sem valor de liquidação." impact="Prejuízo invisível" cta="Auditar" severity="red" onClick={() => setDrillDownData({ title: 'Entregas sem Custo Real' })} />
                    <ActionItem icon={CalendarClock} title="Contas a vencer" desc="R$ 22.277,36 vencendo em 7 dias." impact="-R$ 22.277" cta="Pagar" severity="amber" onClick={() => setDrillDownData({ title: 'Contas a Vencer', value: 22277.36 })} />
                    <ActionItem icon={ArrowRightLeft} title="Fluxo Estoque Negativo" desc="Loja Araguari: Reposição > Saídas" impact="-R$ 4.100" cta="Ver estoque" severity="red" onClick={() => setDrillDownData({ title: 'Fluxo de Estoque' })} />
                    <ActionItem icon={TrendingDown} title="Margem abaixo do mínimo" desc="3 pedidos entraram com Mg < 15%" impact="Alerta CMV" cta="Revisar" severity="amber" onClick={() => setDrillDownData({ title: 'Alertas de Margem' })} />
                 </div>
               </CardContent>
             </Card>
          </div>

          {/* ROW 3: 8 cols (Chart) + 4 cols (Confiança/Small KPIs) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
             <Card className="xl:col-span-8 shadow-sm">
               <CardHeader className="p-6 pb-2 flex flex-row items-center justify-between">
                 <div>
                   <CardTitle className="text-base font-semibold tracking-tight">Evolução Diária</CardTitle>
                   <CardDescription className="text-xs mt-0.5">Faturamento, CMV e Lucro Operacional</CardDescription>
                 </div>
                 <div className="flex items-center gap-4 text-xs text-muted-foreground hidden sm:flex">
                   <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary/70"></span> Fat. Bruto</div>
                   <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500/70"></span> CMV</div>
                   <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500/90"></span> Lucro</div>
                 </div>
               </CardHeader>
               <CardContent className="p-6 pt-4">
                  <div className="h-64 flex items-end gap-2 relative">
                     {/* Horizontal Grid */}
                     <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-t border-b border-border opacity-50">
                        <div className="border-b border-border border-dashed w-full h-[33%]"></div>
                        <div className="border-b border-border border-dashed w-full h-[33%]"></div>
                     </div>
                     
                     {/* Bars */}
                     {mockChartData.map((d, i) => {
                       const fatHeight = Math.max((d.faturamento / maxChartVal) * 100, 5);
                       const despHeight = Math.max((d.cmv / maxChartVal) * 100, 2);
                       const lucHeight = Math.max((d.lucro / maxChartVal) * 100, 2);
                       return (
                         <div key={i} className="flex-1 h-full flex items-end justify-center group/bar relative">
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover border border-border shadow-md text-foreground py-2 px-3 rounded-md opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none z-50 min-w-[160px] text-xs">
                               <strong className="font-semibold block mb-2">{d.name}</strong>
                               <div className="space-y-1 font-mono">
                                 <div className="flex justify-between"><span className="text-muted-foreground font-sans">Faturamento:</span> <span>{formatCurrency(d.faturamento)}</span></div>
                                 <div className="flex justify-between"><span className="text-muted-foreground font-sans">CMV:</span> <span>{formatCurrency(d.cmv)}</span></div>
                                 <div className="flex justify-between"><span className="text-muted-foreground font-sans">Lucro:</span> <span className="text-emerald-500">{formatCurrency(d.lucro)}</span></div>
                               </div>
                            </div>
                            
                            <div className="w-full max-w-[20px] relative flex flex-col justify-end h-full gap-0.5">
                               <div className="w-full bg-primary/70 hover:bg-primary rounded-sm transition-colors" style={{ height: `${fatHeight}%` }}></div>
                               <div className="w-full bg-amber-500/70 hover:bg-amber-500 rounded-sm transition-colors" style={{ height: `${despHeight}%` }}></div>
                               <div className="w-full bg-emerald-500/90 hover:bg-emerald-400 rounded-sm transition-colors" style={{ height: `${lucHeight}%` }}></div>
                            </div>
                         </div>
                       )
                     })}
                  </div>
                  <div className="flex justify-between mt-3 text-[10px] text-muted-foreground">
                     {mockChartData.map((d, i) => (
                       <span key={i} className="flex-1 text-center truncate">{d.name.split(' ')[0].slice(0,3)}</span>
                     ))}
                  </div>
               </CardContent>
             </Card>

             <Card className="xl:col-span-4 shadow-sm flex flex-col">
                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-base font-semibold tracking-tight">Estoque & Previsões</CardTitle>
                  <CardDescription className="text-xs mt-0.5">Visão auxiliar de caixa e projeções</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-4 space-y-4">
                  <div className="space-y-3">
                    <DetailedMetric title="Compra de Estoque" value="R$ 15.000,00" sub="Saída de caixa para reposição" progress={40} color="bg-blue-500" />
                    <DetailedMetric title="Previsão de Faturamento" value="R$ 145.000,00" sub="Projeção baseada na média diária" progress={85} color="bg-primary" />
                    <DetailedMetric title="Previsão de Lucro" value="R$ 48.000,00" sub="Margem projetada de 33%" progress={65} color="bg-emerald-500" />
                    <DetailedMetric title="Contas a Pagar" value="R$ 22.277,36" sub="Total de obrigações selecionadas" progress={30} color="bg-amber-500" />
                  </div>
                </CardContent>
             </Card>
          </div>

          {/* ROW 4: Table (8 cols) + Timeline (4 cols) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
             <Card className="xl:col-span-8 shadow-sm overflow-hidden">
               <CardHeader className="p-6 border-b border-border flex flex-row items-center justify-between">
                 <div>
                   <CardTitle className="text-base font-semibold tracking-tight">Lançamentos Críticos</CardTitle>
                   <CardDescription className="text-xs mt-0.5">Transações e alertas que exigem sua atenção</CardDescription>
                 </div>
                 <button className="text-xs text-primary hover:underline font-medium">Ver todos</button>
               </CardHeader>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead>
                     <tr className="border-b border-border bg-muted/40">
                       <th className="px-6 py-3 font-medium text-muted-foreground text-xs">Data / Origem</th>
                       <th className="px-6 py-3 font-medium text-muted-foreground text-xs">Descrição</th>
                       <th className="px-6 py-3 font-medium text-muted-foreground text-xs">Loja</th>
                       <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-right">Valor</th>
                       <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-center">Status</th>
                       <th className="px-6 py-3 font-medium text-muted-foreground text-xs text-right"><span className="sr-only">Ações</span></th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                     <TableRow date="Hoje, 14:20" origin="Fornecedor" desc="Compra de estoque (Skincare)" store="Matriz" val="R$ 15.000,00" stat="Pago" statColor="emerald" onClick={() => setDrillDownData({ title: 'Pagamento Fornecedor', value: 15000 })} />
                     <TableRow date="Hoje, 10:15" origin="Impostos" desc="DAS Competência Anterior" store="Global" val="R$ 3.600,00" stat="Em aberto" statColor="amber" onClick={() => setDrillDownData({ title: 'Pagamento DAS', value: 3600 })} />
                     <TableRow date="Ontem, 16:45" origin="Salários" desc="Folha de Pagamento - Equipe" store="Global" val="R$ 9.800,00" stat="Vence em 2d" statColor="red" onClick={() => setDrillDownData({ title: 'Folha Pagamento', value: 9800 })} />
                     <TableRow date="Ontem, 09:10" origin="Entrega" desc="Motoboy (#ORD-992)" store="Araguari" val="R$ ---" stat="Revisar" statColor="amber" onClick={() => setDrillDownData({ title: 'Revisão Frete' })} />
                     <TableRow date="10/06, 18:00" origin="Produto" desc="SKU Verde P RAYSSA" store="Uberlândia" val="R$ ---" stat="Sem Custo" statColor="red" onClick={() => setDrillDownData({ title: 'Cadastro de Produto' })} />
                   </tbody>
                 </table>
               </div>
             </Card>

             <Card className="xl:col-span-4 shadow-sm flex flex-col">
               <CardHeader className="p-6 pb-4 border-b border-border">
                 <CardTitle className="text-base font-semibold tracking-tight">Atividade Financeira</CardTitle>
                 <CardDescription className="text-xs mt-0.5">Últimas movimentações no caixa</CardDescription>
               </CardHeader>
               <CardContent className="p-6 flex-1 overflow-y-auto">
                 <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                   <TimelineItem icon={CreditCard} title="Cobrança efetivada" desc="R$ 1.499 no Gateway" time="2h atrás" color="bg-emerald-500/10 text-emerald-500" border="border-emerald-500/20" />
                   <TimelineItem icon={Package} title="Lançamento CMV" desc="50 unds. SKUs diversos" time="4h atrás" color="bg-blue-500/10 text-blue-500" border="border-blue-500/20" />
                   <TimelineItem icon={AlertTriangle} title="Logística" desc="Excesso em frete identificado" time="6h atrás" color="bg-amber-500/10 text-amber-500" border="border-amber-500/20" />
                   <TimelineItem icon={CheckCircle2} title="Fechamento Conferido" desc="Araguari - R$ 4.200 validados" time="Ontem" color="bg-emerald-500/10 text-emerald-500" border="border-emerald-500/20" />
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      )}

      {/* OTHER TABS PLACEHOLDERS */}
      {activeTab !== 'agora' && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-300">
          <Activity className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Visão Detalhada</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            O painel de <strong>{TABS.find(t => t.id === activeTab)?.label}</strong> permite aprofundamento específico nos dados e DRE da empresa.
          </p>
          <button 
            onClick={() => setActiveTab('agora')} 
            className="mt-6 text-sm font-medium text-primary hover:underline"
          >
            Retornar ao Dashboard Principal
          </button>
        </div>
      )}

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

           <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
             <span className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
               <Info className="w-4 h-4" />
               Ação Recomendada (Ops)
             </span>
             <p className="text-sm text-muted-foreground leading-relaxed mt-2">
               Analise a variação e busque otimizações. Os números refletem o ciclo atual validado contra o banco principal.
             </p>
           </div>
        </div>
      </Drawer>

    </div>
  );
}

// Subcomponents

function MetricCard({ title, value, trend, trendUp, icon: Icon, subtext, color, onClick }: any) {
  const iconColors = {
    blue: "text-blue-500 bg-blue-500/10",
    emerald: "text-emerald-500 bg-emerald-500/10",
    amber: "text-amber-500 bg-amber-500/10",
    pink: "text-primary bg-primary/10",
  };

  return (
    <div onClick={onClick}>
      <Card className="shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group hover:border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${iconColors[color as keyof typeof iconColors]}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold tracking-tight text-foreground font-mono">{value.replace('R$ ', 'R$')}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-semibold flex items-center bg-background px-1.5 py-0.5 rounded border border-border ${trendUp ? 'text-emerald-500' : 'text-destructive'}`}>
                {trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {trend}
              </span>
              <span className="text-xs text-muted-foreground truncate">{subtext}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActionItem({ icon: Icon, title, desc, impact, cta, severity, onClick }: any) {
  const severities = {
    red: "text-destructive bg-destructive/10 border-destructive/20",
    amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/30 cursor-pointer" onClick={onClick}>
      <div className="flex items-start gap-4">
        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${severities[severity as keyof typeof severities]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">{impact}</span>
        <button className="text-xs font-medium text-primary flex items-center group-hover:underline">
          {cta} <ChevronRight className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  );
}

function DetailedMetric({ title, value, sub, progress, color }: any) {
  return (
    <div>
      <div className="flex justify-between items-end mb-1.5">
        <div>
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{sub}</p>
        </div>
        <span className="text-sm font-mono font-medium">{value}</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function TableRow({ date, origin, desc, store, val, stat, statColor, onClick }: any) {
  const badgeColors = {
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    red: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <tr className="group hover:bg-muted/30 transition-colors cursor-pointer" onClick={onClick}>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{date}</span>
          <span className="text-[11px] uppercase tracking-wider font-mono text-muted-foreground mt-0.5">{origin}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-muted-foreground">{desc}</td>
      <td className="px-6 py-4 text-sm">{store}</td>
      <td className="px-6 py-4 text-right font-mono text-sm">{val}</td>
      <td className="px-6 py-4 text-center">
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] uppercase tracking-wider font-medium border ${badgeColors[statColor as keyof typeof badgeColors]}`}>
          {stat}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-transparent hover:border-border">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}

function TimelineItem({ icon: Icon, title, desc, time, color, border }: any) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full border shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${color} ${border} bg-background`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] px-4 py-3 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="font-semibold text-sm text-foreground">{title}</div>
          <time className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground shrink-0">{time}</time>
        </div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
