import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockDashboardData, mockChartData } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Top Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI 
          title="Faturamento do Dia" 
          value={formatCurrency(mockDashboardData.faturamentoDia)} 
          trend="+12% em rel. a ontem" 
          positive 
        />
        <KPI 
          title="Faturamento do Mês" 
          value={formatCurrency(mockDashboardData.faturamentoMes)} 
          trend="Projeção: R$ 185k" 
          positive 
        />
        <KPI 
          title="Receita Líquida" 
          value={formatCurrency(mockDashboardData.receitaLiquida)} 
          trend="Após estornos" 
        />
        <KPI 
          title="Lucro até o Momento" 
          value={formatCurrency(mockDashboardData.previsaoLucro)} 
          trend="Margem: 22.8%" 
          positive 
          highlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolução de Faturamento e Lucro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#525252" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#525252" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `R$ ${value / 1000}k`}
                  />
                  <Tooltip 
                    cursor={{fill: '#262626'}}
                    contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                    itemStyle={{ color: '#e5e5e5' }}
                  />
                  <Bar dataKey="faturamento" fill="#ffffff" radius={[4, 4, 0, 0]} name="Faturamento" />
                  <Bar dataKey="lucro" fill="#10b981" radius={[4, 4, 0, 0]} name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Operational Costs Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium tracking-tight text-neutral-400 px-1">Composição de Custos</h3>
          
          <CostCard title="Custos Fixos" value={formatCurrency(mockDashboardData.custosFixos)} />
          <CostCard title="Custos Variáveis" value={formatCurrency(mockDashboardData.custosVariaveis)} />
          <CostCard title="Custo com Entrega" value={formatCurrency(mockDashboardData.custoEntrega)} warn />
          <CostCard title="Custo Produtos Vendidos (CMV)" value={formatCurrency(mockDashboardData.custoProdutosVendidos)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPI title="Previsão de Faturamento" value={formatCurrency(mockDashboardData.previsaoFaturamento)} />
        <KPI title="Previsão de Lucro" value={formatCurrency(mockDashboardData.previsaoFaturamento * 0.22)} />
        <KPI title="Saída de Produto" value={`${mockDashboardData.saidaProduto} un.`} />
        <KPI title="Compra de Estoque" value={formatCurrency(mockDashboardData.compraEstoque)} />
        <KPI title="Fluxo de Estoque" value={mockDashboardData.fluxoEstoqueStatus} positive />
      </div>
    </div>
  );
}

function KPI({ title, value, trend, positive, highlight }: any) {
  return (
    <Card className={highlight ? "border-neutral-700 bg-neutral-900/80 shadow-[0_0_15px_rgba(255,255,255,0.03)]" : ""}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold font-mono tracking-tight mt-1">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 mt-2 text-xs font-medium">
            {positive === true && <TrendingUp className="w-3 h-3 text-emerald-500" />}
            {positive === false && <TrendingDown className="w-3 h-3 text-red-500" />}
            <span className={positive === true ? "text-emerald-500" : positive === false ? "text-red-500" : "text-neutral-500"}>
              {trend}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CostCard({ title, value, warn }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-neutral-700 transition-colors">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors">{title}</span>
        <span className="text-lg font-semibold font-mono tracking-tight text-white mt-1">{value}</span>
      </div>
      {warn ? (
        <AlertCircle className="w-5 h-5 text-amber-500" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-neutral-600" />
      )}
    </div>
  );
}
