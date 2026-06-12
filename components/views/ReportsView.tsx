import { Card, CardContent } from '@/components/ui/Card';
import { DownloadCloud, PieChart, TrendingUp, TrendingDown } from 'lucide-react';

export function ReportsView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         
         <div className="col-span-1 md:col-span-2 lg:col-span-3">
             <h2 className="text-lg font-medium text-white tracking-tight mb-4">Exportações Prontas</h2>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ExportCard title="DRE Sintético (Simplificado)" desc="Formato XLSX para contabilidade." />
                <ExportCard title="Base de Produtos e Custos" desc="Com SKU, Custo Atual e Margens." />
                <ExportCard title="Auditoria de Fretes" desc="Diferença entre cobrado e pago." />
             </div>
         </div>

         <div className="lg:col-span-3 mt-4">
             <h2 className="text-lg font-medium text-white tracking-tight mb-4">Relatórios Visuais Rápidos</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardContent className="p-6 flex items-start gap-4">
                     <div className="p-3 bg-neutral-800 rounded-lg shrink-0"><PieChart className="w-5 h-5 text-neutral-400" /></div>
                     <div>
                       <h3 className="text-sm font-medium text-white">Custos por Categoria</h3>
                       <p className="text-xs text-neutral-500 mt-1 mb-4">Distribuição do orçamento de despesas fixas e variáveis.</p>
                       <button className="text-xs font-medium text-sky-400 hover:text-sky-300">Gerar Visão</button>
                     </div>
                  </CardContent>
                </Card>
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardContent className="p-6 flex items-start gap-4">
                     <div className="p-3 bg-neutral-800 rounded-lg shrink-0"><TrendingUp className="w-5 h-5 text-neutral-400" /></div>
                     <div>
                       <h3 className="text-sm font-medium text-white">Curva ABC de Margem</h3>
                       <p className="text-xs text-neutral-500 mt-1 mb-4">Produtos que mais deixam lucro líquido na operação.</p>
                       <button className="text-xs font-medium text-sky-400 hover:text-sky-300">Gerar Visão</button>
                     </div>
                  </CardContent>
                </Card>
             </div>
         </div>

      </div>
    </div>
  );
}

function ExportCard({ title, desc }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl flex flex-col group cursor-pointer hover:border-neutral-600 transition-colors">
       <span className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors mb-1">{title}</span>
       <span className="text-xs text-neutral-500 leading-relaxed mb-4">{desc}</span>
       <div className="mt-auto flex items-center text-xs font-medium text-neutral-400">
         <DownloadCloud className="w-4 h-4 mr-2" />
         Baixar XLSX
       </div>
    </div>
  )
}
