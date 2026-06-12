import { Card, CardContent } from '@/components/ui/Card';
import { DownloadCloud, PieChart, TrendingUp, BarChart2, PackageX, Truck } from 'lucide-react';

export function ReportsView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div>
          <h2 className="text-lg font-medium text-white tracking-tight mb-4">Relatórios de Exportação (XLSX / CSV)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ExportCard 
               title="Lucro Líquido por Período" 
               desc="Detalhamento diário ou mensal de faturamento, custos abatidos e lucro real." 
            />
            <ExportCard 
               title="Despesas por Categoria" 
               desc="Histórico de custos operacionais divididos por infraestrutura, marketing, insumos, etc." 
            />
            <ExportCard 
               title="Auditoria de Entregas por Método" 
               desc="Comparativo de frete cobrado do cliente vs pago a transportadoras." 
            />
            <ExportCard 
               title="Alerta: Produtos Sem Custo" 
               desc="Lista de SKUs com custo zerado no sistema aguardando preenchimento." 
            />
            <ExportCard 
               title="Saída de Produto Diária (CMV)" 
               desc="Relação de itens faturados, ticket e custo de reposição calculado dia a dia." 
            />
          </div>
      </div>

      <div className="pt-4">
          <h2 className="text-lg font-medium text-white tracking-tight mb-4">Visões Gráficas Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
              <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-neutral-800 rounded-lg shrink-0 group-hover:bg-neutral-700 transition-colors">
                     <PieChart className="w-5 h-5 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                  <h3 className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Distribuição de CMV (Categorias)</h3>
                  <p className="text-xs text-neutral-500 mt-1 mb-4">Gráfico mostrando onde está concentrado o maior peso de custo dos produtos enviados.</p>
                  <button className="text-xs font-medium text-emerald-500 hover:text-emerald-400">Ver Gráfico</button>
                  </div>
              </CardContent>
            </Card>
            
            <Card className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer group">
              <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 bg-neutral-800 rounded-lg shrink-0 group-hover:bg-neutral-700 transition-colors">
                     <TrendingUp className="w-5 h-5 text-neutral-400 group-hover:text-sky-400 transition-colors" />
                  </div>
                  <div>
                  <h3 className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">Curva de Lucratividade</h3>
                  <p className="text-xs text-neutral-500 mt-1 mb-4">Análise dos SKUs que trazem a maior margem de contribuição (Regra 80/20).</p>
                  <button className="text-xs font-medium text-sky-500 hover:text-sky-400">Ver Gráfico</button>
                  </div>
              </CardContent>
            </Card>
          </div>
      </div>

    </div>
  );
}

function ExportCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex flex-col group cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all active:scale-[0.98]">
       <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors mb-1">{title}</span>
       <span className="text-xs text-neutral-500 leading-relaxed mb-4">{desc}</span>
       <div className="mt-auto flex items-center text-[11px] font-medium text-neutral-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
         <DownloadCloud className="w-4 h-4 mr-2" />
         Exportar XLSX
       </div>
    </div>
  )
}
