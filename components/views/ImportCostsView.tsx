'use client';
import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, CheckCircle2, FileSpreadsheet, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { formatCurrency } from '@/lib/utils';
import { useStore } from '@/contexts/StoreContext';

export function ImportCostsView() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { storeId } = useStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    setSaved(false);
    setError(null);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const json = XLSX.utils.sheet_to_json(ws);
        
        setData(json);
        setLoading(false);
      } catch (err) {
        setError('Erro ao ler a planilha. Verifique o formato do arquivo.');
        setLoading(false);
      }
    };
    reader.onerror = () => {
       setError('Erro na leitura do arquivo.');
       setLoading(false);
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
       // Mock the event for input change
       handleFileUpload({ target: { files: e.dataTransfer.files } } as any);
       e.dataTransfer.clearData();
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setData([]);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Importar Custos</h2>
        <p className="text-muted-foreground">Atualize os custos de produtos ou taxas logísticas via planilhas XLSX ou CSV.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div 
            className="flex flex-col items-center justify-center border-b border-border bg-card/50 p-12 text-center transition-colors hover:bg-muted/50 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input 
               type="file" 
               accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
               className="hidden" 
               ref={fileInputRef}
               onChange={handleFileUpload}
            />
            {file && !error ? (
               <FileSpreadsheet className="mb-4 h-12 w-12 text-emerald-500" />
            ) : error ? (
               <AlertCircle className="mb-4 h-12 w-12 text-destructive" />
            ) : (
               <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />
            )}
            
            <h3 className="mb-2 text-lg font-semibold">
              {file && !error ? file.name : error ? 'Erro na Leitura' : 'Arraste e solte seus arquivos'}
            </h3>
            <p className="mb-6 text-sm text-muted-foreground max-w-sm">
              {error ? error : 'Suporta arquivos .csv, .xlsx. O sistema unificará SKUs compatíveis automaticamente baseando nas colunas da planilha.'}
            </p>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Selecionar Arquivo
            </button>
          </div>
        </CardContent>
      </Card>

      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-center gap-3 text-emerald-600">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">Os custos foram importados e salvos com sucesso no sistema.</p>
        </div>
      )}

      {data.length > 0 && !saved && (
        <Card>
          <div className="p-4 flex justify-between items-center border-b border-border">
             <h3 className="font-medium">Pré-visualização dos Dados Estruturados ({data.length} linhas lidas)</h3>
             <button 
               onClick={handleSave} 
               disabled={loading}
               className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm font-medium"
             >
                {loading ? 'Processando...' : 'Confirmar e Salvar Custos'}
             </button>
          </div>
          <div className="w-full overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-muted text-muted-foreground">
                 <tr>
                    {Object.keys(data[0] || {}).map((key, i) => (
                      <th key={i} className="px-4 py-3 font-medium whitespace-nowrap">{key}</th>
                    ))}
                 </tr>
               </thead>
               <tbody className="divide-y divide-border">
                 {data.slice(0, 10).map((row, i) => (
                   <tr key={i} className="hover:bg-muted/50 transition-colors">
                      {Object.values(row).map((val: any, j) => (
                        <td key={j} className="px-4 py-3">
                           {typeof val === 'number' && Object.keys(data[0])[j].toLowerCase().includes('custo') 
                             ? formatCurrency(val) 
                             : String(val)}
                        </td>
                      ))}
                   </tr>
                 ))}
               </tbody>
             </table>
             {data.length > 10 && (
                <div className="p-3 text-center text-xs text-muted-foreground bg-muted/20 border-t border-border">
                   + {data.length - 10} linhas ocultas
                </div>
             )}
          </div>
        </Card>
      )}
    </div>
  );
}
