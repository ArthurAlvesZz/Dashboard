import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { DownloadCloud, PieChart, TrendingUp, BarChart2, PackageX, Truck, FileSpreadsheet, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ReportsView() {
  const [activeTab, setActiveTab] = useState<'export'|'visual'>('export');

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      
      {/* Premium Segmented Control */}
       <div className="p-1.5 bg-card border border-border rounded-xl inline-flex flex-wrap gap-1 shadow-sm overflow-x-auto w-full sm:w-auto">
          <SegmentedTab icon={FileSpreadsheet} label="Centro de Exportação" active={activeTab === 'export'} onClick={() => setActiveTab('export')} />
          <SegmentedTab icon={Eye} label="Visões Executivas (Gráficos)" active={activeTab === 'visual'} onClick={() => setActiveTab('visual')} />
       </div>

      <div className="mt-8">
         {activeTab === 'export' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mb-4 px-1">Bibliotecas de Extração de Dados</h2>
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
         )}

         {activeTab === 'visual' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mb-4 px-1">Painéis Visuais de Decisão</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card border-border shadow-sm hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 bg-primary/5 w-32 h-32 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                  <CardContent className="p-8 flex items-start gap-5 relative z-10">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl shrink-0 group-hover:bg-primary/10 transition-colors shadow-sm">
                         <PieChart className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                      <h3 className="text-base font-bold text-foreground tracking-tight mb-1 group-hover:text-primary transition-colors">Densidade de Custos (CMV)</h3>
                      <p className="text-xs text-muted-foreground mb-5 leading-relaxed font-medium pr-4">Análise visual de concentração. Entenda quais produtos embalados estão consumindo o maior percentual da margem.</p>
                      <button className="text-[10px] uppercase font-bold tracking-wider text-primary group-hover:opacity-80 transition-opacity flex items-center gap-2">Explorar Gráfico &rarr;</button>
                      </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-border shadow-sm hover:border-emerald-500/30 transition-all cursor-pointer group relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 bg-emerald-500/5 w-32 h-32 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none"></div>
                  <CardContent className="p-8 flex items-start gap-5 relative z-10">
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl shrink-0 group-hover:bg-emerald-500/10 transition-colors shadow-sm">
                         <TrendingUp className="w-6 h-6 text-emerald-500 transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                      <h3 className="text-base font-bold text-foreground tracking-tight mb-1 group-hover:text-emerald-500 transition-colors">Curva de Lucratividade (80/20)</h3>
                      <p className="text-xs text-muted-foreground mb-5 leading-relaxed font-medium pr-4">Onde está o dinheiro de verdade. Análise dos SKUs que trazem a maior margem de contribuição (Regra de Pareto).</p>
                      <button className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 group-hover:opacity-80 transition-opacity flex items-center gap-2">Explorar Gráfico &rarr;</button>
                      </div>
                  </CardContent>
                </Card>
              </div>
            </div>
         )}
      </div>

    </div>
  );
}

function SegmentedTab({ icon: Icon, label, active, onClick }: { icon: React.ElementType, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn(
       "flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all relative overflow-hidden group whitespace-nowrap",
       active 
         ? "bg-muted text-foreground shadow-sm border border-border" 
         : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
    )}>
       {active && <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />}
       <Icon className={cn("w-3.5 h-3.5 shrink-0 transition-colors relative z-10", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
       <span className="relative z-10">{label}</span>
       {active && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-t-sm shadow-[0_0_8px_hsl(var(--primary)/0.8)]" />}
    </button>
  );
}

function ExportCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-card border border-border p-6 rounded-xl flex flex-col group cursor-pointer hover:border-primary/40 hover:bg-muted/30 transition-all active:scale-[0.98] shadow-sm relative overflow-hidden">
       <div className="absolute -right-4 -bottom-4 bg-primary/5 w-24 h-24 rounded-full blur-xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
       <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-2 block relative z-10">{title}</span>
       <span className="text-[11px] font-medium text-muted-foreground leading-relaxed mb-6 block relative z-10 pr-2">{desc}</span>
       <div className="mt-auto flex items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors relative z-10">
         <DownloadCloud className="w-3.5 h-3.5 mr-2" />
         Exportar XLS
       </div>
    </div>
  )
}
