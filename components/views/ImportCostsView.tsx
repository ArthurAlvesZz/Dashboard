import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ImportCostsView() {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors",
          step >= 1 ? "bg-white text-black" : "bg-neutral-800 text-neutral-500"
        )}>1</div>
        <div className="h-px bg-neutral-800 flex-1"></div>
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-colors",
          step === 2 ? "bg-white text-black" : "bg-neutral-800 text-neutral-500"
        )}>2</div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Importar Planilha de Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-dashed border-neutral-700 hover:border-neutral-500 bg-neutral-900/50 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
                 onClick={() => setStep(2)}>
              <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Clique ou arraste seu arquivo XLSX/CSV</h3>
              <p className="text-sm text-neutral-500 max-w-md">
                A planilha deve conter colunas para SKU, Nome do Produto e Custo Unitário. O sistema mapeará automaticamente as colunas principais.
              </p>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-sm text-neutral-400 bg-neutral-900 p-4 rounded-lg border border-neutral-800">
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Dica: Exporte a tabela padrão do seu fornecedor. Nosso sistema ignora rodapés (como &quot;Total geral&quot;) automaticamente.</span>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="animate-in fade-in zoom-in-95 duration-300">
          <CardHeader className="border-b border-neutral-800 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">custos_junho_v2.xlsx</h3>
                  <p className="text-xs text-neutral-500 text-medium">Processamento concluído</p>
                </div>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium tracking-tight text-neutral-400 uppercase">Resumo da Leitura</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <SummaryStat icon={CheckCircle2} label="Linhas Válidas" value="414 importáveis" color="text-emerald-500" />
                <SummaryStat icon={Info} label="Ignorados" value="1 linha (Total geral)" color="text-neutral-400" />
                <SummaryStat icon={AlertTriangle} label="Custos Zerados" value="2 SKUs" color="text-amber-500" />
                <SummaryStat icon={CheckCircle2} label="Duplicidades" value="0 encontradas" color="text-emerald-500" />
                <SummaryStat icon={Info} label="Correções Auto" value="1 espaço invisível" color="text-sky-500" />
              </div>

              <div className="mt-6 p-4 rounded-lg border border-neutral-800 bg-neutral-900/50">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Atenção Necessária</h5>
                    <ul className="mt-2 space-y-2 text-sm text-neutral-400">
                      <li>• <b>CON07</b> e <b>Verde P RAYSSA</b> vieram com custo zerado na planilha.</li>
                      <li>• Espaço invisível removido automaticamente no SKU <b>Creme PRT50</b>.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                  Confirmar Importação de 414 Custos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SummaryStat({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className={cn("w-4 h-4", color)} />
        <span className="text-xs font-medium text-neutral-400">{label}</span>
      </div>
      <span className="text-sm font-semibold text-white tracking-tight">{value}</span>
    </div>
  );
}
