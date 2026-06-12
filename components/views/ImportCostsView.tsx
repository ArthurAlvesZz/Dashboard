import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, Info, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';

export function ImportCostsView() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-4 flex-1">
             <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors shrink-0",
              step >= s ? "bg-white text-black" : "bg-neutral-900 border border-neutral-800 text-neutral-500"
            )}>{s}</div>
            {s < 5 && <div className={cn("h-px flex-1 transition-colors", step > s ? "bg-white" : "bg-neutral-800")}></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
             <CardTitle>1. Upload de Arquivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-dashed border-neutral-700 hover:border-neutral-500 bg-neutral-900/50 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                 onClick={() => setStep(2)}>
              <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Clique ou arraste sua planilha</h3>
              <p className="text-sm text-neutral-500 max-w-md">Suporta XLSX e CSV. Limitado a 5MB.</p>
            </div>
             <div className="mt-4 flex gap-4">
                <div className="flex-1 bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                   <span className="text-xs font-medium text-neutral-500 uppercase">Loja Alvo</span>
                   <select className="w-full mt-2 bg-transparent border-0 text-white text-sm focus:ring-0 p-0">
                      <option>Todas as Lojas (Padrão)</option>
                      <option>Apenas Araguari</option>
                      <option>Apenas Uberlândia</option>
                   </select>
                </div>
             </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="animate-in fade-in duration-300">
          <CardHeader>
             <CardTitle>2. Mapeamento de Colunas</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="block text-sm font-medium text-white">Coluna SKU</span>
                    <span className="text-xs text-neutral-500">Obrigatório para parear.</span>
                  </div>
                  <select className="bg-neutral-950 border border-neutral-700 text-sm text-white rounded-md px-3 py-1.5 focus:outline-none">
                     <option>SKU (Automático)</option>
                     <option>Código Fornecedor</option>
                  </select>
               </div>
               <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="block text-sm font-medium text-white">Coluna Custo Unitário</span>
                    <span className="text-xs text-neutral-500">Valor em R$.</span>
                  </div>
                  <select className="bg-neutral-950 border border-neutral-700 text-sm text-white rounded-md px-3 py-1.5 focus:outline-none">
                     <option>Valor (Automático)</option>
                     <option>Custo Total Base</option>
                  </select>
               </div>
               <div className="pt-4 flex justify-end">
                 <button onClick={() => setStep(3)} className="bg-white text-black font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-neutral-200">
                    Processar
                 </button>
               </div>
             </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="animate-in fade-in duration-300">
          <CardHeader className="border-b border-neutral-800 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Planilha Processada</h3>
                  <p className="text-xs text-neutral-500 text-medium">Prévia pronta para revisão</p>
                </div>
              </div>
               <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 text-sm text-white bg-neutral-800 hover:bg-neutral-700 font-medium px-4 py-2 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  Ver Tabela Prévia
               </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <SummaryStat icon={CheckCircle2} label="Prontos p/ Atualizar" value="414 SKUs" color="text-emerald-500" />
                <SummaryStat icon={AlertTriangle} label="A Revisar (Custo Zero)" value="2 SKUs" color="text-amber-500" />
                <SummaryStat icon={AlertTriangle} label="SKU Não Encontrado" value="0 linhas" color="text-red-500" />
                <SummaryStat icon={Info} label="Ações Auto" value="2 ajustes" color="text-sky-500" sub="1 rodapé removido, 1 espaço ajustado" />
              </div>

              <div className="pt-6 flex gap-4">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                  Cancelar
                </button>
                <button onClick={() => setStep(4)} className="flex-1 flex justify-center items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                  Aplicar Importação Agora
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {(step === 4 || step === 5) && (
         <Card className="animate-in fade-in duration-300">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              {step === 4 ? (
                <>
                  <div className="w-16 h-16 border-4 border-neutral-800 border-t-emerald-500 rounded-full animate-spin mb-6" />
                  <h3 className="text-xl font-medium text-white mb-2">Aplicando 414 Custos...</h3>
                  <p className="text-sm text-neutral-500">Isso pode levar alguns segundos.</p>
                  {setTimeout(() => setStep(5), 1500) && null}
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Importação Concluída com Sucesso</h3>
                  <p className="text-sm text-neutral-500 mb-8 max-w-md">Foram atualizados os custos de 414 produtos baseando-se no arquivo &quot;custos_junho_v2.xlsx&quot;. Os produtos que constavam zerados foram ignorados e continuam com o aviso na aba Produtos.</p>
                  <button onClick={() => setStep(1)} className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors">
                    Nova Importação
                  </button>
                </>
              )}
            </CardContent>
         </Card>
      )}

      <Drawer isOpen={showPreview} onClose={() => setShowPreview(false)} title="Prévia de Dados">
          <div className="space-y-4">
             <div className="bg-amber-500/10 text-amber-500 p-3 rounded-lg text-sm border border-amber-500/20">
                Atenção: 2 SKUs (CON07, Verde P RAYSSA) detectados com valor R$ 0,00 na planilha. Eles <b>não</b> terão seus custos atuais sobrescritos, mantendo o alerta no sistema.
             </div>
             <table className="w-full text-left text-sm font-sans">
                <thead className="text-neutral-500 text-xs uppercase border-b border-neutral-800 bg-neutral-950">
                   <tr>
                      <th className="py-2 px-3 font-medium">SKU (Lido)</th>
                      <th className="py-2 px-3 font-medium text-right">Custo Analisado</th>
                      <th className="py-2 px-3 font-medium">Ação Automática</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 text-neutral-300">
                   <tr><td className="py-2 px-3 font-mono text-xs">ADS01</td><td className="py-2 px-3 text-right">R$ 45,50</td><td className="py-2 px-3"><span className="text-emerald-400 text-xs">Atualizar</span></td></tr>
                   <tr><td className="py-2 px-3 font-mono text-xs">ADS02</td><td className="py-2 px-3 text-right">R$ 45,50</td><td className="py-2 px-3"><span className="text-emerald-400 text-xs">Atualizar</span></td></tr>
                   <tr><td className="py-2 px-3 font-mono text-xs text-amber-500">CON07</td><td className="py-2 px-3 text-right text-amber-500">R$ 0,00</td><td className="py-2 px-3"><span className="text-amber-500 text-xs">Revisar (Pular Override)</span></td></tr>
                   <tr><td className="py-2 px-3 font-mono text-xs text-sky-400">Creme PRT50.</td><td className="py-2 px-3 text-right">R$ 110,00</td><td className="py-2 px-3"><span className="text-sky-400 text-xs">Normalizado espaço invisível</span></td></tr>
                   <tr><td className="py-2 px-3 font-mono text-xs text-neutral-600">Total geral</td><td className="py-2 px-3 text-right text-neutral-600">-</td><td className="py-2 px-3"><span className="text-neutral-600 text-xs">Linha Ignorada</span></td></tr>
                </tbody>
             </table>
          </div>
      </Drawer>
    </div>
  );
}

function SummaryStat({ icon: Icon, label, value, color, sub }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium text-neutral-400 leading-tight">{label}</span>
        <Icon className={cn("w-4 h-4 shrink-0", color)} />
      </div>
      <div className="mt-1">
        <span className="text-lg font-semibold text-white tracking-tight">{value}</span>
        {sub && <span className="block mt-1 text-[10px] text-neutral-500 leading-tight">{sub}</span>}
      </div>
    </div>
  );
}
