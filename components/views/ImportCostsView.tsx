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
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center gap-2 mb-10 px-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
             <div className={cn(
              "flex flex-col gap-2 items-start shrink-0 relative",
              step === s ? "opacity-100" : (step > s ? "opacity-100" : "opacity-30")
            )}>
              <div className={cn(
                "h-1.5 w-12 rounded-full transition-all duration-500",
                step >= s ? "bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]" : "bg-neutral-800"
              )} />
              <div className="absolute top-4 left-0 text-[10px] uppercase font-mono tracking-widest whitespace-nowrap hidden sm:block">
                <span className={cn(
                  "transition-colors",
                  step >= s ? "text-pink-400" : "text-neutral-600"
                )}>
                  {s === 1 && "Importar"}
                  {s === 2 && "Mapear"}
                  {s === 3 && "Revisar"}
                  {s === 4 && "Escrever"}
                  {s === 5 && "Sucesso"}
                </span>
              </div>
            </div>
            {s < 5 && <div className={cn("h-px flex-1 transition-colors mx-2", step > s ? "bg-pink-500/30" : "bg-neutral-900")}></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl mt-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-pink-500/5 to-transparent pointer-events-none" />
          <CardHeader>
             <CardTitle className="font-mono uppercase tracking-widest text-xs text-neutral-400">Ponto de Injeção de Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border border-dashed border-neutral-800 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all bg-[#050505] rounded-xl p-16 flex flex-col items-center justify-center text-center cursor-pointer group" onClick={() => setStep(2)}>
              <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 group-hover:border-pink-500/30 rounded-full flex items-center justify-center mb-6 shadow-inner relative">
                <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <UploadCloud className="w-8 h-8 text-neutral-500 group-hover:text-pink-400 transition-colors relative z-10" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-pink-50 transition-colors tracking-tight">Anexar Base de Dados</h3>
              <p className="text-sm text-neutral-500 max-w-md">Arraste um documento XLSX ou CSV homologado. O sistema processará até 50.000 linhas por lote.</p>
              
              <div className="mt-8 flex gap-2">
                 <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px] text-neutral-500 uppercase">.CSV</span>
                 <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded font-mono text-[10px] text-neutral-500 uppercase">.XLSX</span>
              </div>
            </div>

             <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-1">Restrição de Loja (Origem)</label>
                <div className="bg-[#121212] border border-neutral-800 p-1 rounded-lg flex shadow-inner">
                   <select className="w-full bg-transparent border-0 text-white text-[13px] font-medium tracking-wide focus:ring-0 p-3 outline-none cursor-pointer">
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
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl mt-4 animate-in fade-in duration-300">
          <CardHeader>
             <CardTitle className="font-mono uppercase tracking-widest text-xs text-neutral-400">Resolução de Colunas</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="bg-[#121212] border border-neutral-800 p-5 rounded-lg flex items-center justify-between group">
                  <div>
                    <span className="block text-sm font-medium text-white tracking-wide">ID Rastreador (SKU)</span>
                    <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Chave primária obrigatória</span>
                  </div>
                  <select className="bg-[#0a0a0a] border border-neutral-700 text-[13px] font-medium text-white rounded-md px-4 py-2.5 focus:outline-none focus:border-pink-500 transition-colors w-48 shadow-inner">
                     <option>A (Auto-detectado)</option>
                     <option>B (Código Local)</option>
                  </select>
               </div>
               
               <div className="bg-[#121212] border border-neutral-800 p-5 rounded-lg flex items-center justify-between group">
                  <div>
                    <span className="block text-sm font-medium text-white tracking-wide">Despesa Mercadoria (CMV / R$)</span>
                    <span className="text-[11px] text-neutral-500 font-mono mt-1 block">Custo absoluto por unidade</span>
                  </div>
                  <select className="bg-[#0a0a0a] border border-neutral-700 text-[13px] font-medium text-white rounded-md px-4 py-2.5 focus:outline-none focus:border-pink-500 transition-colors w-48 shadow-inner">
                     <option>C (Custo Base)</option>
                     <option>D (Custo Integrado)</option>
                  </select>
               </div>
               
               <div className="pt-8 flex justify-end">
                 <button onClick={() => setStep(3)} className="bg-white text-black font-mono font-bold uppercase tracking-widest text-[11px] px-8 py-3.5 rounded-lg hover:bg-neutral-200 transition-transform active:scale-95 shadow-lg flex items-center gap-2">
                    Analisar & Compilar
                    <ArrowRight className="w-3.5 h-3.5" />
                 </button>
               </div>
             </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl mt-4 animate-in fade-in duration-300">
          <CardHeader className="border-b border-neutral-900 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl relative">
                  <div className="absolute inset-0 bg-pink-500/20 blur-lg rounded-xl opacity-50"></div>
                  <FileSpreadsheet className="w-6 h-6 text-pink-500 relative z-10" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white tracking-tight">Documento Processado</h3>
                  <p className="text-[11px] uppercase tracking-widest font-mono text-neutral-500 mt-1">Ready for execution</p>
                </div>
              </div>
               <button onClick={() => setShowPreview(true)} className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest font-mono text-neutral-400 bg-[#121212] hover:bg-[#1a1a1a] hover:text-white border border-neutral-800 font-medium px-5 py-2.5 rounded-lg transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  Abrir Auditoria (Log)
               </button>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <SummaryStat icon={CheckCircle2} label="Conformidade Ideal" value="414" color="text-emerald-500" />
                <SummaryStat icon={AlertTriangle} label="Sobrescrever (R$ 0)" value="2" color="text-amber-500" />
                <SummaryStat icon={AlertTriangle} label="Chaves Ausentes" value="0" color="text-red-500" />
                <SummaryStat icon={Info} label="Clean-up (Auto)" value="2" color="text-sky-500" sub="Sanitização aplicada" />
              </div>

              <div className="pt-8 flex gap-4">
                <button onClick={() => setStep(1)} className="px-6 py-3.5 bg-[#121212] border border-neutral-800 text-neutral-400 font-mono text-[11px] uppercase tracking-widest rounded-lg hover:bg-neutral-900 hover:text-white transition-colors">
                  Cancelar Operação
                </button>
                <button onClick={() => setStep(4)} className="flex-1 flex justify-center items-center gap-3 px-6 py-3.5 bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)] font-mono text-[11px] uppercase tracking-widest font-bold rounded-lg hover:bg-pink-400 transition-all hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] active:scale-95">
                  Confirmar Escrita em Massa
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(step === 4 || step === 5) && (
         <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl mt-4 animate-in fade-in duration-300 relative overflow-hidden">
            {step === 5 && <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />}
            <CardContent className="p-16 flex flex-col items-center justify-center text-center relative z-10">
              {step === 4 ? (
                <>
                  <div className="w-20 h-20 border-2 border-[#121212] border-t-pink-500 rounded-full animate-spin mb-8 relative">
                     <div className="absolute inset-0 border-2 border-transparent border-t-pink-400 rounded-full animate-spin opacity-50 blur-sm"></div>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Executando Escrita...</h3>
                  <p className="text-sm font-mono text-neutral-500">Mutando 414 registros no banco de dados.</p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-50"></div>
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Sincronização Concluída</h3>
                  <p className="text-sm text-neutral-500 mb-10 max-w-lg leading-relaxed">
                     A operação de lote foi finalizada com sucesso. 414 registros atualizados. Chaves com valor absoluto igual a zero foram ignoradas conforme regra de negócio e continuam bloqueadas para venda.
                  </p>
                  <button onClick={() => setStep(1)} className="px-8 py-3 bg-[#121212] border border-neutral-800 text-neutral-300 font-mono text-[11px] uppercase tracking-widest font-medium rounded-lg hover:bg-neutral-800 hover:text-white transition-colors">
                    Iniciar Nova Operação
                  </button>
                </>
              )}
            </CardContent>
         </Card>
      )}

      <Drawer isOpen={showPreview} onClose={() => setShowPreview(false)} title="Console de Auditoria (Prévia)">
          <div className="space-y-6 mt-4">
             <div className="bg-amber-500/10 text-amber-500 p-4 rounded-xl text-sm border border-amber-500/20 flex gap-3 shadow-inner">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <p className="leading-relaxed text-[13px]">
                  Aviso Estrutural: 2 SKUs (CON07, Verde P RAYSSA) detectados com valor numérico R$ 0,00 na matriz.
                  Por política, valores nulos <b>não efetuam "override"</b> num custo estabelecido, a fim de proteger a exibição do produto.
                </p>
             </div>
             <table className="w-full text-left text-sm font-sans mb-4">
                <thead className="text-neutral-500 text-[10px] font-mono tracking-widest uppercase border-b border-neutral-800 bg-[#121212]">
                   <tr>
                      <th className="py-3 px-4 font-medium">Indentificador Oculto</th>
                      <th className="py-3 px-4 font-medium text-right">Valor Capturado</th>
                      <th className="py-3 px-4 font-medium text-right">Status do Evento</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a] text-neutral-300">
                   <tr className="hover:bg-[#121212]"><td className="py-3 px-4 font-mono text-xs">ADS01</td><td className="py-3 px-4 text-right tabular-nums text-emerald-400 font-mono">R$ 45,50</td><td className="py-3 px-4 text-right"><span className="text-emerald-400 text-[11px] uppercase tracking-wider font-mono">Escrita Segura</span></td></tr>
                   <tr className="hover:bg-[#121212]"><td className="py-3 px-4 font-mono text-xs">ADS02</td><td className="py-3 px-4 text-right tabular-nums text-emerald-400 font-mono">R$ 45,50</td><td className="py-3 px-4 text-right"><span className="text-emerald-400 text-[11px] uppercase tracking-wider font-mono">Escrita Segura</span></td></tr>
                   <tr className="bg-amber-500/5 hover:bg-amber-500/10"><td className="py-3 px-4 font-mono text-xs text-amber-500">CON07</td><td className="py-3 px-4 text-right tabular-nums text-amber-500 font-mono">R$ 0,00</td><td className="py-3 px-4 text-right"><span className="text-amber-500 text-[11px] uppercase tracking-wider font-mono drop-shadow">Pular Override</span></td></tr>
                   <tr className="hover:bg-[#121212]"><td className="py-3 px-4 font-mono text-xs text-sky-400">Creme PRT50.</td><td className="py-3 px-4 text-right tabular-nums text-emerald-400 font-mono">R$ 110,00</td><td className="py-3 px-4 text-right"><span className="text-sky-400 text-[11px] uppercase tracking-wider font-mono">Espaço Sanitizado</span></td></tr>
                   <tr className="hover:bg-[#121212] text-neutral-600"><td className="py-3 px-4 font-mono text-xs">Total geral</td><td className="py-3 px-4 text-right tabular-nums">-</td><td className="py-3 px-4 text-right"><span className="text-[11px] uppercase tracking-wider font-mono">Linha Descartada</span></td></tr>
                </tbody>
             </table>
          </div>
      </Drawer>
    </div>
  );
}

function SummaryStat({ icon: Icon, label, value, color, sub }: { icon: LucideIcon, label: string, value: string, color: string, sub?: string }) {
  return (
    <div className="bg-[#121212] border border-neutral-800 p-5 rounded-xl flex flex-col gap-3 shadow-inner relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 leading-tight pr-4">{label}</span>
        <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", color)} />
      </div>
      <div className="mt-1 relative z-10">
        <span className="text-2xl font-mono tracking-tighter text-white">{value}</span>
        {sub && <span className="block mt-1.5 text-[10px] text-neutral-600 uppercase tracking-widest leading-tight">{sub}</span>}
      </div>
    </div>
  );
}
