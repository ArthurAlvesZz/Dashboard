import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { DownloadCloud, PieChart, TrendingUp, BarChart2, PackageX, Truck, FileSpreadsheet, Eye, FileText, ChevronRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ReportsView() {
  const [activeTab, setActiveTab] = useState<'export'|'visual'>('export');
  const today = format(new Date(), "dd MMM yyyy, HH:mm", { locale: ptBR });

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-foreground">Central de Relatórios</h1>
           <p className="text-sm font-medium text-muted-foreground mt-0.5">Visões analíticas e extratores de dados oficiais da Santa Bronx.</p>
        </div>
      </div>

      {/* Premium Segmented Control */}
       <div className="p-1.5 bg-card border border-border rounded-xl inline-flex flex-wrap gap-1 shadow-sm overflow-x-auto w-full sm:w-auto">
          <SegmentedTab icon={FileSpreadsheet} label="Centro de Exportação" active={activeTab === 'export'} onClick={() => setActiveTab('export')} />
          <SegmentedTab icon={Eye} label="Painéis Gráficos e BI" active={activeTab === 'visual'} onClick={() => setActiveTab('visual')} />
       </div>

      <div className="mt-6">
         {activeTab === 'export' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground mb-4 px-1 border-b border-border/50 pb-2">Documentos Recomendados e Frequentes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ExportCard 
                   title="Fechamento de Lucro (Líquido)" 
                   desc="Faturamento contábil deduzido de todos os CMV, impostos e fretes do período selecionado." 
                   period="Mensal"
                   lastGenerated={today}
                   preview="ID | Cliente | Venda | Custo | Lucro R$"
                />
                <ExportCard 
                   title="DRE Simplificado Operacional" 
                   desc="Resumo de Receita Bruta, Receita Líquida, Custos Fixos e Variáveis." 
                   period="Anual"
                   lastGenerated={today}
                   preview="Mês | Receita R$ | Custos R$ | Saldo Líq."
                />
              </div>

              <h2 className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground mb-4 mt-8 px-1 border-b border-border/50 pb-2">Biblioteca de Rotinas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ExportCard 
                   title="Inventário de Preços e CMV" 
                   desc="Relação completa de todos os SKUs com custo associado." 
                   period="Sob demanda"
                   preview="SKU | Nome | Tipo | Custo | Pix | Cartão"
                />
                <ExportCard 
                   title="Auditoria Logística" 
                   desc="Comparativo de cobranças de frete repassadas via transportador." 
                   period="Semanal"
                   preview="Ordem | Frete Cobrado | Custo Base | Diff"
                />
                <ExportCard 
                   title="Despesas Abertas e Pagas" 
                   desc="Log da empresa com contas passadas e previsões futuras." 
                   period="Mensal"
                   preview="Data | Fatura | Categoria | Status | Valor"
                />
              </div>
            </div>
         )}

         {activeTab === 'visual' && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-500">
              <h2 className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground mb-4 px-1 border-b border-border/50 pb-2">Painéis Visuais de Decisão</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                
                <Card className="bg-card border-border shadow-sm group relative overflow-hidden flex flex-col h-full">
                  <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none transition-opacity" />
                  <CardContent className="p-0 flex flex-col h-full relative z-10">
                     <div className="p-6 pb-4 border-b border-border/50 flex gap-4 items-start">
                        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shrink-0">
                           <PieChart className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-foreground tracking-tight">Densidade de Custos (Produto vs Loja)</h3>
                           <p className="text-[11px] font-medium text-muted-foreground mt-1">Análise visual de concentração. Entenda quais categorias consumem margem.</p>
                        </div>
                     </div>
                     <div className="flex-1 p-6 flex flex-col justify-center items-center opacity-60 min-h-[160px] bg-muted/10 border-b border-border/50">
                        {/* Simulating a chart layout placeholder */}
                        <div className="w-32 h-32 rounded-full border-[12px] border-primary/20 border-t-primary/80 border-r-sky-500/80 shadow-inner relative flex items-center justify-center">
                           <span className="font-mono text-sm font-bold text-foreground">100%</span>
                        </div>
                     </div>
                     <div className="p-4 bg-muted/30 flex justify-between items-center rounded-b-xl">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Em Tempo Real</span>
                        <button className="text-[11px] font-bold uppercase tracking-wider bg-card border border-border hover:bg-muted text-foreground px-4 py-2 rounded-md transition-colors shadow-sm inline-flex items-center gap-2">Abrir Painel Completo <ChevronRight className="w-3 h-3" /></button>
                     </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border shadow-sm group relative overflow-hidden flex flex-col h-full">
                  <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none transition-opacity" />
                  <CardContent className="p-0 flex flex-col h-full relative z-10">
                     <div className="p-6 pb-4 border-b border-border/50 flex gap-4 items-start">
                        <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                           <TrendingUp className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-foreground tracking-tight">Curva de Lucratividade (Pareto 80/20)</h3>
                           <p className="text-[11px] font-medium text-muted-foreground mt-1">Mapeamento dos SKUs que trazem a maior margem de contribuição oficial.</p>
                        </div>
                     </div>
                     <div className="flex-1 p-6 flex items-end justify-center gap-3 opacity-60 min-h-[160px] bg-muted/10 border-b border-border/50">
                        {/* Simulating a bar chart */}
                        <div className="w-8 h-16 bg-emerald-500/40 rounded-t-sm" />
                        <div className="w-8 h-24 bg-emerald-500/60 rounded-t-sm" />
                        <div className="w-8 h-32 bg-emerald-500/80 rounded-t-sm" />
                        <div className="w-8 h-24 bg-emerald-500/50 rounded-t-sm" />
                        <div className="w-8 h-12 bg-emerald-500/30 rounded-t-sm" />
                        <div className="w-8 h-6 bg-emerald-500/20 rounded-t-sm" />
                     </div>
                     <div className="p-4 bg-muted/30 flex justify-between items-center rounded-b-xl">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Fechamento Semanal</span>
                        <button className="text-[11px] font-bold uppercase tracking-wider bg-card border border-border hover:bg-muted text-foreground px-4 py-2 rounded-md transition-colors shadow-sm inline-flex items-center gap-2">Abrir Painel Completo <ChevronRight className="w-3 h-3" /></button>
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
       "flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative overflow-hidden group whitespace-nowrap",
       active 
         ? "bg-card text-foreground shadow-sm border border-border" 
         : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
    )}>
       <Icon className={cn("w-3.5 h-3.5 shrink-0 transition-colors relative z-10", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
       <span className="relative z-10">{label}</span>
    </button>
  );
}

function ExportCard({ title, desc, period, preview, lastGenerated }: { title: string, desc: string, period: string, preview: string, lastGenerated?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col group relative overflow-hidden shadow-sm h-full">
       <div className="p-5 flex-1">
         <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-bold text-foreground leading-tight pr-4">{title}</span>
            <div className="bg-muted px-2 py-0.5 rounded border border-border shadow-sm shrink-0">
               <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{period}</span>
            </div>
         </div>
         <span className="text-[11px] font-medium text-muted-foreground leading-relaxed block mb-4">{desc}</span>
         
         <div className="bg-muted/50 rounded-lg p-3 border border-border/50 mb-2">
            <div className="flex items-center gap-1.5 mb-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
               <FileText className="w-3 h-3" /> Colunas Base do Documento
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/80 break-all">{preview}</span>
         </div>
         
         {lastGenerated && (
            <div className="text-[9px] font-medium text-muted-foreground flex items-center gap-1 mt-3">
               <Clock className="w-3 h-3" /> Último Evento: {lastGenerated}
            </div>
         )}
       </div>
       
       <div className="border-t border-border bg-muted/20 p-3 grid grid-cols-2 gap-2 mt-auto">
         <button className="flex justify-center items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-card border border-border hover:bg-muted text-foreground px-3 py-2 rounded-md transition-colors shadow-sm relative group/btn">
            <div className="absolute inset-0 bg-primary/0 group-hover/btn:bg-primary/5 transition-colors rounded-md" />
            <DownloadCloud className="w-3.5 h-3.5" /> XLS
         </button>
         <button className="flex justify-center items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-card border border-border hover:bg-muted text-foreground px-3 py-2 rounded-md transition-colors shadow-sm relative group/btn">
            <div className="absolute inset-0 bg-primary/0 group-hover/btn:bg-primary/5 transition-colors rounded-md" />
            <FileSpreadsheet className="w-3.5 h-3.5" /> CSV
         </button>
       </div>
    </div>
  )
}
