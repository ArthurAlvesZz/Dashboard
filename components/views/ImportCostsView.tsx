import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, Info, Eye, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';

export function ImportCostsView() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => setStep(5), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-2 mb-10 px-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
             <div className={cn(
              "flex flex-col gap-2 items-start shrink-0 relative",
              step === s ? "opacity-100" : (step > s ? "opacity-100" : "opacity-40")
            )}>
              <div className={cn(
                "h-1.5 w-12 rounded-full transition-all duration-500",
                step >= s ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-muted"
              )} />
              <div className="absolute top-4 left-0 text-[10px] uppercase font-semibold tracking-wider whitespace-nowrap hidden sm:block">
                <span className={cn(
                  "transition-colors",
                  step >= s ? "text-primary" : "text-muted-foreground"
                )}>
                  {s === 1 && "Importar"}
                  {s === 2 && "Mapear"}
                  {s === 3 && "Revisar"}
                  {s === 4 && "Escrever"}
                  {s === 5 && "Sucesso"}
                </span>
              </div>
            </div>
            {s < 5 && <div className={cn("h-px flex-1 transition-colors mx-2", step > s ? "bg-primary/30" : "bg-border")}></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="bg-card border-border shadow-sm mt-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
          <CardHeader>
             <CardTitle className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">Ponto de Injeção de Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all bg-muted/10 rounded-xl p-16 flex flex-col items-center justify-center text-center cursor-pointer group" onClick={() => setStep(2)}>
              <div className="w-20 h-20 bg-card border border-border group-hover:border-primary/30 rounded-full flex items-center justify-center mb-6 shadow-sm relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <UploadCloud className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors relative z-10" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">Anexar Base de Dados</h3>
              <p className="text-sm text-muted-foreground max-w-md">Arraste um documento XLSX ou CSV homologado. O sistema processará até 50.000 linhas por lote.</p>
              
              <div className="mt-8 flex gap-2">
                 <span className="px-3 py-1 bg-muted border border-border rounded-md font-mono text-[10px] text-muted-foreground uppercase font-semibold">.CSV</span>
                 <span className="px-3 py-1 bg-muted border border-border rounded-md font-mono text-[10px] text-muted-foreground uppercase font-semibold">.XLSX</span>
              </div>
            </div>

             <div className="flex flex-col gap-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1">Restrição de Loja (Origem)</label>
                <div className="bg-muted/30 border border-border p-1 rounded-lg flex shadow-sm">
                   <select className="w-full bg-transparent border-0 text-foreground text-[13px] font-medium tracking-wide focus:ring-0 p-3 outline-none cursor-pointer">
                      <option>Aplicar a todo o sistema (Global)</option>
                      <option>Restringir: Somente Araguari</option>
                      <option>Restringir: Somente Uberlândia</option>
                   </select>
                </div>
             </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="bg-card border-border shadow-sm mt-4 animate-in fade-in duration-500">
          <CardHeader>
             <CardTitle className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">Resolução de Colunas</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="bg-muted/30 border border-border p-5 rounded-lg flex items-center justify-between group">
                  <div>
                    <span className="block text-sm font-semibold text-foreground tracking-tight">ID Rastreador (SKU)</span>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Chave primária obrigatória</span>
                  </div>
                  <select className="bg-card border border-border text-[13px] font-medium text-foreground rounded-md px-4 py-2.5 focus:outline-none focus:border-primary transition-colors w-48 shadow-sm">
                     <option>A (Auto-detectado)</option>
                     <option>B (Código Local)</option>
                  </select>
               </div>
               
               <div className="bg-muted/30 border border-border p-5 rounded-lg flex items-center justify-between group">
                  <div>
                    <span className="block text-sm font-semibold text-foreground tracking-tight">Despesa Mercadoria (CMV / R$)</span>
                    <span className="text-[11px] text-muted-foreground mt-1 block">Custo absoluto por unidade</span>
                  </div>
                  <select className="bg-card border border-border text-[13px] font-medium text-foreground rounded-md px-4 py-2.5 focus:outline-none focus:border-primary transition-colors w-48 shadow-sm">
                     <option>C (Custo Base)</option>
                     <option>D (Custo Integrado)</option>
                  </select>
               </div>
               
               <div className="pt-8 flex justify-end">
                 <button onClick={() => setStep(3)} className="bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-[11px] px-8 py-3.5 rounded-lg hover:bg-primary/90 transition-transform active:scale-95 shadow-sm flex items-center gap-2">
                    Analisar & Compilar
                    <ArrowRight className="w-3.5 h-3.5" />
                 </button>
               </div>
             </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="bg-card border-border shadow-sm mt-4 animate-in fade-in duration-500">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl relative">
                  <div className="absolute inset-0 bg-primary/20 blur-lg rounded-xl opacity-50"></div>
                  <FileSpreadsheet className="w-6 h-6 text-primary relative z-10" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">Documento Processado</h3>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mt-1">Ready for execution</p>
                </div>
              </div>
               <button onClick={() => setShowPreview(true)} className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground bg-muted hover:bg-accent hover:text-foreground border border-border px-5 py-2.5 rounded-lg transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  Abrir Auditoria (Log)
               </button>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryStat icon={CheckCircle2} label="Conformidade" value="414" color="text-emerald-500" />
                <SummaryStat icon={AlertTriangle} label="Sobrescrever (R$ 0)" value="2" color="text-amber-500" />
                <SummaryStat icon={AlertTriangle} label="Chaves Ausentes" value="0" color="text-destructive" />
                <SummaryStat icon={Info} label="Clean-up (Auto)" value="2" color="text-sky-500" sub="Sanitização aplicada" />
              </div>

              <div className="pt-8 flex gap-4">
                <button onClick={() => setStep(1)} className="px-6 py-3.5 bg-muted border border-border text-muted-foreground font-semibold text-[11px] uppercase tracking-wider rounded-lg hover:bg-accent hover:text-foreground transition-colors">
                  Cancelar Operação
                </button>
                <button onClick={() => setStep(4)} className="flex-1 flex justify-center items-center gap-3 px-6 py-3.5 bg-primary text-primary-foreground font-semibold text-[11px] uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-sm">
                  Confirmar Escrita
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(step === 4 || step === 5) && (
         <Card className="bg-card border-border shadow-sm mt-4 animate-in fade-in duration-500 relative overflow-hidden">
            {step === 5 && <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />}
            <CardContent className="p-16 flex flex-col items-center justify-center text-center relative z-10">
              {step === 4 ? (
                <>
                  <div className="w-20 h-20 border-2 border-muted border-t-primary rounded-full animate-spin mb-8 relative">
                     <div className="absolute inset-0 border-2 border-transparent border-t-primary/50 rounded-full animate-spin opacity-50 blur-sm"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Executando Escrita...</h3>
                  <p className="text-sm font-mono text-muted-foreground">Mutando 414 registros no banco de dados.</p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-50"></div>
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">Sincronização Concluída</h3>
                  <p className="text-sm text-muted-foreground mb-10 max-w-lg leading-relaxed">
                     A operação de lote foi finalizada com sucesso. 414 registros atualizados. Chaves com valor absoluto igual a zero foram ignoradas conforme regra de negócio e continuam bloqueadas para venda.
                  </p>
                  <button onClick={() => setStep(1)} className="px-8 py-3 bg-muted border border-border text-muted-foreground font-semibold text-[11px] uppercase tracking-wider rounded-lg hover:bg-accent hover:text-foreground transition-colors">
                    Iniciar Nova Operação
                  </button>
                </>
              )}
            </CardContent>
         </Card>
      )}

      <Drawer isOpen={showPreview} onClose={() => setShowPreview(false)} title="Console de Auditoria (Prévia)">
          <div className="space-y-6 mt-4">
             <div className="bg-amber-500/10 text-amber-500 p-4 rounded-xl text-sm border border-amber-500/20 flex gap-3 shadow-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="leading-relaxed text-[13px] font-medium">
                  Aviso Estrutural: 2 SKUs (CON07, Verde P RAYSSA) detectados com valor numérico R$ 0,00 na matriz.
                  Por política, valores nulos <strong className="font-semibold text-amber-600 dark:text-amber-400">não efetuam "override"</strong> num custo estabelecido, a fim de proteger a exibição do produto.
                </p>
             </div>
             <table className="w-full text-left text-sm font-sans mb-4">
                <thead className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider border-b border-border bg-muted/30">
                   <tr>
                      <th className="py-3 px-4 font-medium">Identificador Oculto</th>
                      <th className="py-3 px-4 font-medium text-right">Valor Capturado</th>
                      <th className="py-3 px-4 font-medium text-right">Status do Evento</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-foreground">
                   <tr className="hover:bg-muted/30"><td className="py-3 px-4 font-mono text-xs font-semibold">ADS01</td><td className="py-3 px-4 text-right tabular-nums text-emerald-500 font-mono">R$ 45,50</td><td className="py-3 px-4 text-right"><span className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">Escrita Segura</span></td></tr>
                   <tr className="hover:bg-muted/30"><td className="py-3 px-4 font-mono text-xs font-semibold">ADS02</td><td className="py-3 px-4 text-right tabular-nums text-emerald-500 font-mono">R$ 45,50</td><td className="py-3 px-4 text-right"><span className="text-emerald-500 text-[10px] uppercase font-bold tracking-wider">Escrita Segura</span></td></tr>
                   <tr className="bg-amber-500/5 hover:bg-amber-500/10"><td className="py-3 px-4 font-mono text-xs font-semibold text-amber-500">CON07</td><td className="py-3 px-4 text-right tabular-nums text-amber-500 font-mono">R$ 0,00</td><td className="py-3 px-4 text-right"><span className="text-amber-500 text-[10px] uppercase font-bold tracking-wider drop-shadow">Pular Override</span></td></tr>
                   <tr className="hover:bg-muted/30"><td className="py-3 px-4 font-mono text-xs font-semibold text-sky-500">Creme PRT50.</td><td className="py-3 px-4 text-right tabular-nums text-emerald-500 font-mono">R$ 110,00</td><td className="py-3 px-4 text-right"><span className="text-sky-500 text-[10px] uppercase font-bold tracking-wider">Espaço Sanitizado</span></td></tr>
                   <tr className="hover:bg-muted/30 text-muted-foreground"><td className="py-3 px-4 text-xs font-semibold">Total geral</td><td className="py-3 px-4 text-right tabular-nums">-</td><td className="py-3 px-4 text-right"><span className="text-[10px] uppercase font-bold tracking-wider">Linha Descartada</span></td></tr>
                </tbody>
             </table>
          </div>
      </Drawer>
    </div>
  );
}

function SummaryStat({ icon: Icon, label, value, color, sub }: { icon: LucideIcon, label: string, value: string, color: string, sub?: string }) {
  return (
    <div className="bg-muted/20 border border-border p-5 rounded-xl flex flex-col gap-3 shadow-sm relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground leading-tight pr-4">{label}</span>
        <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", color)} />
      </div>
      <div className="mt-1 relative z-10">
        <span className="text-2xl font-bold font-mono tracking-tight text-foreground">{value}</span>
        {sub && <span className="block mt-1.5 text-[10px] text-muted-foreground uppercase font-semibold tracking-wider leading-tight">{sub}</span>}
      </div>
    </div>
  );
}
