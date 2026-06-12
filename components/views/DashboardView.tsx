import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDashboardData, mockChartData } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { TrendingUp, AlertTriangle, Box, Truck, CalendarClock, ArrowRightLeft, ArrowRight, Minus, Equal, Info, LucideIcon } from 'lucide-react';

export function DashboardView() {
  const maxChartVal = Math.max(...mockChartData.map(d => d.faturamento));

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      {/* ACTION CENTER */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium tracking-widest text-emerald-500 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Central de Ação
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard 
            icon={Box} 
            title="Custos Pendentes" 
            desc="2 produtos sem custo." 
            action="Definir custos"
            color="amber"
          />
          <ActionCard 
            icon={Truck} 
            title="Entregas s/ Custo" 
            desc="5 entregas sem valor." 
            action="Revisar fretes"
            color="red"
          />
          <ActionCard 
            icon={CalendarClock} 
            title="Vencimentos" 
            desc="3 contas nos próx 7 dias." 
            action="Ver despesas"
            color="amber"
          />
          <ActionCard 
            icon={ArrowRightLeft} 
            title="Alerta de Estoque" 
            desc="Fluxo negativo em Udi." 
            action="Analisar fluxo"
            color="red"
          />
        </div>
      </section>

      {/* PROFIT COMPOSITION */}
      <section>
        <h2 className="text-xl font-display font-medium text-white mb-4 tracking-tight">Composição do Lucro (Até Hoje)</h2>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
              
              <ProfitNode 
                label="Receita Líquida" 
                value={mockDashboardData.receitaLiquida} 
                sub="Faturamento - Taxas/Estornos"
                highlight="text-emerald-400"
              />
              <Operator icon={Minus} />
              
              <div className="flex-1 min-w-[200px] flex flex-col p-4 bg-neutral-900/50">
                <span className="text-xs font-medium text-neutral-500 mb-2 uppercase tracking-wider">Custos Operacionais</span>
                <div className="space-y-3">
                  <MiniCost label="Fixos (Aluguel, etc)" value={mockDashboardData.custosFixos} />
                  <MiniCost label="Variáveis (Mkt, etc)" value={mockDashboardData.custosVariaveis} />
                  <MiniCost label="Custo c/ Entrega" value={mockDashboardData.custoEntrega} />
                </div>
              </div>
              <Operator icon={Minus} />
              
              <ProfitNode 
                label="Custo Mercadoria (CMV)" 
                value={mockDashboardData.custoProdutosVendidos} 
                sub={`${mockDashboardData.saidaProduto} unid. vendidas`}
                highlight="text-red-400"
              />
              <Operator icon={Equal} />
              
              <div className="flex-[1.5] p-6 lg:p-8 bg-neutral-950 flex flex-col justify-center items-center lg:items-start relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-2 mb-1 relative z-10">
                  <span className="text-sm font-medium text-emerald-500">LUCRO REALIZADO</span>
                  <div className="group/tt relative">
                    <Info className="w-3.5 h-3.5 text-neutral-500 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-neutral-800 text-neutral-200 text-[10px] rounded opacity-0 group-hover/tt:opacity-100 pointer-events-none transition-opacity text-center z-50">
                      Este é o lucro real calculado pelas vendas efetuadas até o momento.
                    </div>
                  </div>
                </div>
                <span className="text-4xl font-display font-medium text-white tracking-tighter relative z-10">
                  {formatCurrency(mockDashboardData.lucro)}
                </span>
                <span className="text-xs text-neutral-500 mt-2 relative z-10 font-mono tracking-tight">Margem: 50.9%</span>
              </div>
              
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CHARTS & PREDICTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Evolução Diária</CardTitle>
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-400">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-neutral-200"></span> Faturamento</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Lucro</div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 flex items-end gap-2 sm:gap-4 mt-6 h-48">
               {mockChartData.map((d, i) => {
                 const fatHeight = Math.max((d.faturamento / maxChartVal) * 100, 4);
                 const lucHeight = Math.max((d.lucro / maxChartVal) * 100, 2);
                 return (
                   <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                     {/* Tooltip on hover */}
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-neutral-800 border border-neutral-700 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {d.name}<br/>
                        <span className="text-neutral-400">Fat:</span> {formatCurrency(d.faturamento)}<br/>
                        <span className="text-emerald-400">Luc:</span> {formatCurrency(d.lucro)}
                     </div>
                     <div className="w-full relative flex justify-center items-end h-full">
                       {/* Faturamento Bar */}
                       <div className="w-[80%] max-w-[40px] bg-neutral-200 rounded-t-sm absolute bottom-0 transition-all duration-500" style={{ height: `${fatHeight}%` }}></div>
                       {/* Lucro Bar */}
                       <div className="w-[80%] max-w-[40px] bg-emerald-500 rounded-t-sm absolute bottom-0 transition-all duration-700 delay-100 z-10" style={{ height: `${lucHeight}%` }}></div>
                     </div>
                     <span className="text-[10px] font-mono text-neutral-500">{d.name.split(' ')[0]}</span>
                   </div>
                 );
               })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1">
            <h3 className="text-sm font-medium tracking-tight text-neutral-400 px-1">Projeção Até Fim do Mês</h3>
            <div className="group relative">
               <Info className="w-3.5 h-3.5 text-neutral-500 cursor-help" />
               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2 bg-neutral-800 text-neutral-200 text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-center z-50">
                 A projeção estima como o mês irá fechar se a média diária atual se mantiver.
               </div>
            </div>
          </div>
          <KPI title="Projeção Faturamento" value={formatCurrency(mockDashboardData.previsaoFaturamento)} origin="Cálculo linear diário" />
          <KPI title="Projeção Custos Totais" value={formatCurrency(92000)} origin="Histórico + recorrentes" />
          <KPI title="Projeção Lucro Final" value={formatCurrency(93000)} positive highlight origin="Faturamento - Custos Projetados" />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, action, color }: { icon: LucideIcon, title: string, desc: string, action: string, color: 'amber' | 'red' }) {
  const colorMap = {
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/40",
    red: "border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 hover:border-red-500/40",
  };
  
  return (
    <div className={`border rounded-xl p-4 flex flex-col cursor-pointer transition-all active:scale-[0.98] ${colorMap[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5" />
        <span className="font-medium text-sm text-white">{title}</span>
      </div>
      <p className="text-xs text-neutral-400 mb-4">{desc}</p>
      <div className="mt-auto flex items-center text-xs font-medium uppercase tracking-wider group">
        {action}
        <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}

function ProfitNode({ label, value, sub, highlight }: { label: string, value: number, sub: string, highlight?: string }) {
  return (
    <div className="flex-1 p-6 flex flex-col justify-center">
      <span className="text-xs font-medium text-neutral-400 mb-1">{label}</span>
      <span className={`text-2xl font-mono tracking-tight ${highlight || 'text-white'}`}>
        {formatCurrency(value)}
      </span>
      <span className="text-xs text-neutral-600 mt-2">{sub}</span>
    </div>
  );
}

function Operator({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="hidden lg:flex items-center justify-center -mx-3 z-10 w-6 h-6 bg-neutral-900 border border-neutral-800 rounded-full self-center">
      <Icon className="w-3 h-3 text-neutral-500" />
    </div>
  );
}

function MiniCost({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-neutral-400">{label}</span>
      <span className="font-mono text-white text-xs">{formatCurrency(value)}</span>
    </div>
  );
}

function KPI({ title, value, positive, highlight, origin }: { title: string, value: string, positive?: boolean, highlight?: boolean, origin: string }) {
  return (
    <Card className={`relative overflow-hidden ${highlight ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "border-neutral-800/60 transition-colors hover:border-neutral-700"}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-sm">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-semibold font-mono tracking-tight ${highlight ? "text-emerald-400" : "text-white"}`}>{value}</div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="font-mono tracking-tighter">{origin}</span>
          {positive && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
        </div>
      </CardContent>
    </Card>
  );
}
