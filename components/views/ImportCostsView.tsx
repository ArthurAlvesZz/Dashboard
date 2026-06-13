import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, Info, DownloadCloud, FileText, XCircle, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';

export function ImportCostsView() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedStore, setSelectedStore] = useState<'global' | 'araguari' | 'uberlandia'>('global');

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setStep(5), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Importar Custos de Produtos</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">Atualize o custo médio por SKU via planilha</p>
        </div>
        <div className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-[11px] font-bold tracking-wider text-primary uppercase">414 produtos cadastrados</span>
        </div>
      </div>

      {/* STEPPER VISUAL */}
      <div className="flex justify-between items-center bg-card border border-border rounded-xl p-4 shadow-sm w-full overflow-x-auto">
        <StepIndicator num={1} label="Upload" current={step} />
        <div className={cn("h-px flex-1 mx-2 sm:mx-4 transition-colors", step > 1 ? "bg-primary" : "bg-border")} />
        <StepIndicator num={2} label="Mapear" current={step} />
        <div className={cn("h-px flex-1 mx-2 sm:mx-4 transition-colors", step > 2 ? "bg-primary" : "bg-border")} />
        <StepIndicator num={3} label="Revisar" current={step} />
        <div className={cn("h-px flex-1 mx-2 sm:mx-4 transition-colors", step > 3 ? "bg-primary" : "bg-border")} />
        <StepIndicator num={4} label="Aplicar" current={step} />
        <div className={cn("h-px flex-1 mx-2 sm:mx-4 transition-colors", step > 4 ? "bg-primary" : "bg-border")} />
        <StepIndicator num={5} label="Concluído" current={step} />
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-6">
          {/* SELETOR DE LOJA & UPLOAD */}
          <Card className="bg-card border-border shadow-sm">
            <CardContent className="p-6 sm:p-8 space-y-8">
              
              {/* Seletor de Loja */}
              <div className="flex flex-col gap-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground">Aplicar custos para:</span>
                <div className="flex flex-col sm:flex-row gap-2 text-sm font-semibold">
                  <button 
                    onClick={() => setSelectedStore('global')} 
                    className={cn("px-4 py-2.5 rounded-lg border transition-all active:scale-[0.98]", selectedStore === 'global' ? "bg-muted text-foreground shadow-sm border-border" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground")}
                  >
                    Global (todas as lojas)
                  </button>
                  <button 
                    onClick={() => setSelectedStore('araguari')} 
                    className={cn("px-4 py-2.5 rounded-lg border transition-all active:scale-[0.98]", selectedStore === 'araguari' ? "bg-muted text-foreground shadow-sm border-border" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground")}
                  >
                    Araguari
                  </button>
                  <button 
                    onClick={() => setSelectedStore('uberlandia')} 
                    className={cn("px-4 py-2.5 rounded-lg border transition-all active:scale-[0.98]", selectedStore === 'uberlandia' ? "bg-muted text-foreground shadow-sm border-border" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground")}
                  >
                    Uberlândia
                  </button>
                </div>
              </div>

              {/* Seção de Upload */}
              <div className="border-2 border-dashed border-border hover:border-primary/50 hover:bg-muted/10 transition-all rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer group bg-card relative overflow-hidden" onClick={() => setStep(3)}>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-16 h-16 bg-muted border border-border rounded-full flex items-center justify-center mb-5 shadow-sm relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors relative z-10 animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
                <h3 className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors relative z-10">Arraste seu arquivo XLSX ou CSV aqui</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1 relative z-10">ou clique para selecionar</p>
                <div className="flex gap-2 mt-6 relative z-10">
                  <span className="px-2 py-1 bg-muted font-mono text-[10px] uppercase font-bold tracking-wider rounded text-muted-foreground border border-border shadow-sm">[.XLSX]</span>
                  <span className="px-2 py-1 bg-muted font-mono text-[10px] uppercase font-bold tracking-wider rounded text-muted-foreground border border-border shadow-sm">[.CSV]</span>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-6 relative z-10">Máximo 10MB</p>
              </div>

            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Histórico Recente
              </CardTitle>
            </CardHeader>
            <div className="p-0 overflow-x-auto">
               <table className="w-full text-left font-sans text-sm">
                  <thead className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider bg-muted/30 border-b border-border">
                     <tr>
                        <th className="py-3 px-6 whitespace-nowrap">Data</th>
                        <th className="py-3 px-6 whitespace-nowrap">Arquivo</th>
                        <th className="py-3 px-6 whitespace-nowrap">Loja</th>
                        <th className="py-3 px-6 whitespace-nowrap">Status</th>
                        <th className="py-3 px-6 whitespace-nowrap text-right">Usuário</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground">
                     <tr className="hover:bg-muted/30 transition-colors group">
                        <td className="py-4 px-6 font-mono text-[12px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">12/06 14:30</td>
                        <td className="py-4 px-6 font-semibold whitespace-nowrap flex items-center gap-2"><File className="w-3.5 h-3.5 text-muted-foreground" /> custos.xlsx</td>
                        <td className="py-4 px-6"><span className="px-2 py-1 bg-muted rounded text-[10px] font-bold uppercase tracking-wider border border-border">Global</span></td>
                        <td className="py-4 px-6">
                           <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider rounded-md whitespace-nowrap">414 Atualizados</span>
                        </td>
                        <td className="py-4 px-6 text-right font-medium text-muted-foreground">Arthur</td>
                     </tr>
                     <tr className="hover:bg-muted/30 transition-colors group">
                        <td className="py-4 px-6 font-mono text-[12px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">10/06 09:15</td>
                        <td className="py-4 px-6 font-semibold whitespace-nowrap flex items-center gap-2"><File className="w-3.5 h-3.5 text-muted-foreground" /> precos_junho.csv</td>
                        <td className="py-4 px-6"><span className="px-2 py-1 bg-muted rounded text-[10px] font-bold uppercase tracking-wider border border-border">Araguari</span></td>
                        <td className="py-4 px-6">
                           <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider rounded-md whitespace-nowrap">380 Atualizados</span>
                        </td>
                        <td className="py-4 px-6 text-right font-medium text-muted-foreground">Sistema</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </Card>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          {/* CARDS DE ESTATÍSTICA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <StatCard label="Linhas Válidas" value="412" icon={CheckCircle2} color="text-emerald-500" />
             <StatCard label="Custo Zero" value="2" icon={AlertTriangle} color="text-amber-500" />
             <StatCard label="Não Encontrados" value="0" icon={XCircle} color="text-destructive" />
             <StatCard label="Normalizados" value="1" icon={Info} color="text-sky-500" />
          </div>

          {/* TABELA DE PRÉVIA */}
          <Card className="bg-card border-border shadow-sm mt-6">
            <CardHeader className="border-b border-border">
               <CardTitle className="text-sm font-bold tracking-tight text-foreground flex items-center justify-between">
                 Prévia dos Dados
                 <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">Ação Pendente</span>
               </CardTitle>
            </CardHeader>
            <div className="p-0 overflow-x-auto">
               <table className="w-full text-left font-sans text-sm">
                  <thead className="bg-muted/30 border-b border-border text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
                     <tr>
                        <th className="py-3 px-6 whitespace-nowrap">Status</th>
                        <th className="py-3 px-6 whitespace-nowrap">SKU / Produto</th>
                        <th className="py-3 px-6 text-right whitespace-nowrap">Custo Atual</th>
                        <th className="py-3 px-6 text-right whitespace-nowrap">Custo Novo</th>
                        <th className="py-3 px-6 text-right whitespace-nowrap">Diferença</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-foreground">
                     <PreviewRow 
                        sku="ADS01" 
                        current="R$ 44,00" 
                        novo="R$ 45,50" 
                        diff="+R$ 1,50" 
                        diffColor="text-emerald-500"
                        status="Atualizar" 
                        statusColor="bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                     />
                     <PreviewRow 
                        sku="ADS02" 
                        current="R$ 44,00" 
                        novo="R$ 45,50" 
                        diff="+R$ 1,50" 
                        diffColor="text-emerald-500"
                        status="Atualizar" 
                        statusColor="bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                     />
                     <PreviewRow 
                        sku="CON07" 
                        current="R$ 0,00" 
                        novo="R$ 0,00" 
                        diff="-" 
                        diffColor="text-muted-foreground"
                        status="Revisar" 
                        statusColor="bg-amber-500/10 text-amber-500 border-amber-500/20" 
                     />
                     <PreviewRow 
                        sku="Verde P RAYSSA" 
                        current="R$ 0,00" 
                        novo="R$ 0,00" 
                        diff="-" 
                        diffColor="text-muted-foreground"
                        status="Revisar" 
                        statusColor="bg-amber-500/10 text-amber-500 border-amber-500/20" 
                     />
                     <PreviewRow 
                        sku="Creme PRT50" 
                        current="R$ 110,00" 
                        novo="R$ 110,00" 
                        diff="Espaço corrigido" 
                        diffColor="text-sky-500 text-[11px]"
                        status="Normalizado" 
                        statusColor="bg-sky-500/10 text-sky-500 border-sky-500/20" 
                     />
                     <PreviewRow 
                        sku="Total geral" 
                        current="-" 
                        novo="-" 
                        diff="-" 
                        diffColor="text-muted-foreground"
                        status="Ignorado" 
                        statusColor="bg-muted text-muted-foreground border-border" 
                        isFaded
                     />
                  </tbody>
               </table>
            </div>
          </Card>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
             <button onClick={() => setStep(1)} className="px-6 py-3.5 bg-muted border border-border text-foreground font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-muted/80 transition-colors shadow-sm w-full sm:w-auto">
               Cancelar
             </button>
             <button className="px-6 py-3.5 bg-transparent text-primary hover:bg-primary/5 font-bold text-[11px] uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
               <DownloadCloud className="w-4 h-4" />
               Baixar Relatório
             </button>
             <div className="flex-1"></div>
             <button onClick={() => setStep(4)} className="px-8 py-3.5 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-transform active:scale-95 shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto">
               Aplicar Importação
               <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      )}

      {(step === 4 || step === 5) && (
        <Card className="bg-card border-border shadow-sm mt-4 animate-in fade-in duration-500 relative overflow-hidden">
          {step === 5 && <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />}
          <CardContent className="p-16 flex flex-col items-center justify-center text-center relative z-10">
            {step === 4 ? (
              <>
                <div className="w-20 h-20 border-2 border-muted border-t-primary rounded-full animate-spin mb-8 relative">
                   <div className="absolute inset-0 border-2 border-transparent border-t-primary/50 rounded-full animate-spin opacity-50 blur-sm"></div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Executando Atualização...</h3>
                <p className="text-sm font-medium text-muted-foreground">Aplicando novos custos em 414 SKUs no catálogo.</p>
              </>
            ) : (
              <div className="animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-8 mx-auto relative group">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-50"></div>
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Importação Finalizada</h3>
                <p className="text-sm font-medium text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
                   Os custos foram atualizados com sucesso. Registros com custo zero foram revisados pelas políticas da plataforma.
                </p>
                <div className="flex gap-4 justify-center flex-col sm:flex-row">
                  <button className="px-6 py-3.5 bg-transparent border border-border text-foreground font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-muted transition-colors shadow-sm w-full sm:w-auto">
                    Ver Catálogo
                  </button>
                  <button onClick={() => setStep(1)} className="px-8 py-3.5 bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto">
                    Nova Importação
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

    </div>
  );
}

// COMPONENTES AUXILIARES

function StepIndicator({ num, label, current }: { num: number, label: string, current: number }) {
  const isCompleted = current > num;
  const isActive = current === num;
  
  return (
    <div className={cn("flex flex-col items-center gap-2", isActive || isCompleted ? "opacity-100" : "opacity-40 grayscale")}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all shadow-sm",
        isActive ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : 
        isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"
      )}>
        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : num}
      </div>
      <span className={cn(
        "text-[10px] uppercase font-bold tracking-wider hidden sm:block",
        isActive ? "text-primary" : "text-muted-foreground"
      )}>{label}</span>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
  return (
    <div className="bg-card border border-border p-5 rounded-xl shadow-sm flex flex-col gap-3 group relative overflow-hidden">
      <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-l from-current/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ color: 'inherit' }} />
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
        <Icon className={cn("w-5 h-5", color)} />
      </div>
      <span className="text-2xl font-bold text-foreground tracking-tight font-mono relative z-10">{value}</span>
    </div>
  );
}

function PreviewRow({ sku, current, novo, diff, diffColor, status, statusColor, isFaded }: any) {
  return (
    <tr className={cn("hover:bg-muted/30 transition-colors", isFaded && "opacity-50")}>
      <td className="py-4 px-6 whitespace-nowrap">
        <span className={cn("px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border", statusColor)}>
          {status}
        </span>
      </td>
      <td className="py-4 px-6 font-mono font-semibold text-[13px]">{sku}</td>
      <td className="py-4 px-6 text-right font-mono text-[13px] text-muted-foreground font-medium">{current}</td>
      <td className="py-4 px-6 text-right font-mono text-[13px] font-bold text-foreground">{novo}</td>
      <td className={cn("py-4 px-6 text-right font-mono text-[13px] font-bold", diffColor)}>{diff}</td>
    </tr>
  );
}
