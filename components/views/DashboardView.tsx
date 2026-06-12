import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDashboardData, mockChartData } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Box, Truck, CalendarClock, ArrowRightLeft, ArrowRight, Minus, Equal } from 'lucide-react';

export function DashboardView() {
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
        <h2 className="text-xl font-display font-medium text-white mb-4 tracking-tight">Composição do Lucro (Mês Atual)</h2>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
              
              <ProfitNode 
                label="Receita Líquida" 
                value={mockDashboardData.receitaLiquida} 
                sub="Após taxas/estornos"
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
                label="Custo Produto (CMV)" 
                value={mockDashboardData.custoProdutosVendidos} 
                sub={`${mockDashboardData.saidaProduto} unidades`}
                highlight="text-red-400"
              />
              <Operator icon={Equal} />
              
              <div className="flex-[1.5] p-6 lg:p-8 bg-neutral-950 flex flex-col justify-center items-center lg:items-start relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-sm font-medium text-emerald-500 mb-1 relative z-10">LUCRO REALIZADO</span>
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
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Histórico de Faturamento e Lucro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${value / 1000}k`} />
                  <Tooltip cursor={{fill: '#262626'}} contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} itemStyle={{ color: '#e5e5e5' }} />
                  <Bar dataKey="faturamento" fill="#d4d4d4" radius={[4, 4, 0, 0]} name="Faturamento" />
                  <Bar dataKey="lucro" fill="#10b981" radius={[4, 4, 0, 0]} name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-sm font-medium tracking-tight text-neutral-400 px-1">Previsões do Mês</h3>
          <KPI title="Previsão Faturamento" value={formatCurrency(mockDashboardData.previsaoFaturamento)} origin="Cálculo linear diário" />
          <KPI title="Previsão Custos" value={formatCurrency(92000)} origin="Histórico + recorrentes" />
          <KPI title="Previsão Lucro" value={formatCurrency(93000)} positive highlight origin="Faturamento - Custos" />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, action, color }: any) {
  const colorMap: any = {
    amber: "border-amber-500/20 bg-amber-500/5 text-amber-500 hover:bg-amber-500/10",
    red: "border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10",
  };
  
  return (
    <div className={`border rounded-xl p-4 flex flex-col cursor-pointer transition-colors ${colorMap[color]}`}>
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

function ProfitNode({ label, value, sub, highlight }: any) {
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

function Operator({ icon: Icon }: any) {
  return (
    <div className="hidden lg:flex items-center justify-center -mx-3 z-10 w-6 h-6 bg-neutral-900 border border-neutral-800 rounded-full self-center">
      <Icon className="w-3 h-3 text-neutral-500" />
    </div>
  );
}

function MiniCost({ label, value }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-neutral-400">{label}</span>
      <span className="font-mono text-white text-xs">{formatCurrency(value)}</span>
    </div>
  );
}

function KPI({ title, value, positive, highlight, origin }: any) {
  return (
    <Card className={`relative overflow-hidden ${highlight ? "border-emerald-500/30 bg-emerald-500/5" : ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-semibold font-mono tracking-tight ${highlight ? "text-emerald-400" : "text-white"}`}>{value}</div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
          <span className="font-mono tracking-tighter truncate max-w-[120px]">{origin}</span>
          {positive && <TrendingUp className="w-3 h-3 text-emerald-500" />}
        </div>
      </CardContent>
    </Card>
  );
}
