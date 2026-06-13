import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockUsers } from '@/lib/mockData';
import { Shield, UserCog, Building2, TicketPercent, Wallet, Settings2, CheckCircle2, AlertCircle, Check, X } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';

type Tab = 'equipe' | 'permissoes' | 'lojas' | 'taxas' | 'parametros';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>('equipe');
  const [isEditingUser, setIsEditingUser] = useState<typeof mockUsers[0] | null>(null);

  const permissionsMatrix = [
    { module: 'Dashboard Oficial', roles: [true, true, true, true] },
    { module: 'Lançamento de Custos Base', roles: [true, true, false, false] },
    { module: 'Acesso a DRE / Margens Reais', roles: [true, false, false, true] },
    { module: 'Auditoria de Pedidos', roles: [true, true, false, true] },
    { module: 'Credenciais de Acesso API', roles: [true, false, false, false] },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-5xl pb-10">
       
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-foreground">Configurações de Espaço</h1>
           <p className="text-sm font-medium text-muted-foreground mt-0.5">Parâmetros financeiros, permissões e matriz estrutural.</p>
        </div>
      </div>

       {/* Premium Segmented Control */}
       <div className="p-1.5 bg-card border border-border rounded-xl inline-flex flex-wrap gap-1 shadow-sm overflow-x-auto w-full sm:w-auto">
          <SegmentedTab icon={UserCog} label="Acessos e Equipe" active={activeTab === 'equipe'} onClick={() => setActiveTab('equipe')} />
          <SegmentedTab icon={Shield} label="Matriz de Permissões" active={activeTab === 'permissoes'} onClick={() => setActiveTab('permissoes')} />
          <SegmentedTab icon={Building2} label="Cadastro de Lojas" active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} />
          <SegmentedTab icon={TicketPercent} label="Taxas" active={activeTab === 'taxas'} onClick={() => setActiveTab('taxas')} />
          <SegmentedTab icon={Settings2} label="Baseline Financeiro" active={activeTab === 'parametros'} onClick={() => setActiveTab('parametros')} />
       </div>

       <div className="mt-6">
          {activeTab === 'equipe' && (
            <Card className="bg-card border-border shadow-sm relative overflow-hidden">
               <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
               <CardHeader className="border-b border-border flex justify-between items-center sm:flex-row flex-col gap-4 relative z-10 pb-5">
                  <CardTitle className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">Controle Central de Operadores</CardTitle>
                  <button className="text-[11px] font-bold tracking-wider uppercase bg-primary text-primary-foreground px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors shadow-sm active:scale-95">
                    Convidar Novo Operador
                  </button>
               </CardHeader>
               <div className="p-0 relative z-10">
                  <ul className="divide-y divide-border/50">
                     {mockUsers.map(user => (
                       <li key={user.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-muted/30 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border/50 text-sm font-bold text-primary group-hover:border-primary/30 transition-colors shadow-sm">
                               {user.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-bold text-foreground">{user.name}</span>
                                <span className="text-[11px] text-muted-foreground font-medium">{user.email}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                             <div className="flex flex-col sm:items-end gap-0.5">
                               <span className="text-foreground font-semibold text-[13px]">{user.role}</span>
                               <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground mt-1 bg-muted px-2 py-0.5 rounded shadow-sm border border-border/50">Escopo: {user.store}</span>
                             </div>
                             <button onClick={() => setIsEditingUser(user)} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border px-4 py-2 rounded-md bg-transparent border border-transparent transition-all active:scale-95 shadow-sm">
                               Gerenciar
                             </button>
                          </div>
                       </li>
                     ))}
                  </ul>
               </div>
            </Card>
          )}

          {activeTab === 'taxas' && (
            <Card className="bg-card border-border shadow-sm">
               <CardHeader className="border-b border-border">
                  <CardTitle className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    Custos de Adquirência
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-6">
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-start gap-4 shadow-sm">
                     <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                     <div className="text-xs text-primary leading-relaxed font-medium">
                        Estes valores são decantados automaticamente de cada transação do checkout e subtraídos para chegar ao lucro limpo e ao caixa.
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterInput label="Gateway PIX Ativo" value="0.99%" desc="Liquidação Automática" color="text-destructive" />
                    <ParameterInput label="Cartão de Crédito (1x a 3x)" value="3.99%" desc="Dedução Básica" color="text-destructive" />
                    <ParameterInput label="Taxa Antecipação Recorrente" value="1.80%" desc="Fluxo Antecipatório" color="text-destructive" />
                    <ParameterInput label="Custo Antifraude Aprovado" value="R$ 1,20" desc="Dedução por check" color="text-destructive" />
                  </div>
                  <button className="bg-primary text-primary-foreground text-[11px] uppercase tracking-wider font-bold px-8 py-3 rounded-md hover:bg-primary/90 transition-transform active:scale-95 w-full sm:w-auto shadow-sm">
                     Armazenar Cenário de Taxas
                  </button>
               </CardContent>
            </Card>
          )}

          {activeTab === 'permissoes' && (
             <Card className="bg-card border-border shadow-sm overflow-hidden">
                <CardHeader className="border-b border-border bg-muted/10">
                   <CardTitle className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                     <Shield className="w-4 h-4 text-primary" />
                     Matriz de Responsabilidade Autorizada
                   </CardTitle>
                </CardHeader>
                <div className="overflow-x-auto w-full custom-scrollbar">
                  <table className="w-full text-left font-sans text-sm min-w-[700px]">
                     <thead className="bg-muted/30 border-b border-border text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                        <tr>
                           <th className="px-6 py-4">Módulo do Sistema</th>
                           <th className="px-4 py-4 text-center">Master</th>
                           <th className="px-4 py-4 text-center">Gerente</th>
                           <th className="px-4 py-4 text-center">Caixa</th>
                           <th className="px-4 py-4 text-center">Auditor</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border/50 text-foreground text-sm font-medium">
                        {permissionsMatrix.map((row, idx) => (
                           <tr key={idx} className="hover:bg-muted/10 transition-colors">
                              <td className="px-6 py-4">{row.module}</td>
                              {row.roles.map((hasAccess, rIdx) => (
                                 <td key={rIdx} className="px-4 py-4 text-center">
                                    {hasAccess ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-muted border-border mx-auto" strokeWidth={3} />}
                                 </td>
                              ))}
                           </tr>
                        ))}
                     </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-border mt-auto">
                   <button className="bg-muted hover:bg-accent hover:text-foreground text-muted-foreground text-[10px] font-bold uppercase tracking-wider shadow-sm px-6 py-2.5 rounded-md transition-colors">
                      Adicionar Nova Regra
                   </button>
                </div>
             </Card>
          )}

          {activeTab === 'lojas' && (
             <Card className="bg-card border-border shadow-sm">
                <CardHeader className="border-b border-border flex justify-between items-center sm:flex-row flex-col gap-4">
                   <CardTitle className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                     <Building2 className="w-4 h-4 text-primary" />
                     Operações Oficiais (Empresas)
                   </CardTitle>
                   <button className="text-[11px] font-bold tracking-wider uppercase bg-primary text-primary-foreground px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors shadow-sm active:scale-95">
                     Adicionar CNPJ
                   </button>
                </CardHeader>
                <CardContent className="p-0">
                   <ul className="divide-y divide-border/50">
                      <li className="p-6 sm:flex items-center justify-between hover:bg-muted/30 transition-all group">
                         <div className="flex items-start gap-5">
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-sm">
                              <span className="text-[13px] font-bold tracking-wider text-emerald-500">MTRZ</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                               <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-foreground">Santa Bronx Brasil (Araguari)</span>
                                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold rounded tracking-wider uppercase shadow-sm">Ativo</span>
                               </div>
                               <span className="text-[11px] font-medium text-muted-foreground">CNPJ: 14.341.698/0001-99</span>
                               <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-1">Regime: Simples Nacional</span>
                            </div>
                         </div>
                         <button className="mt-4 sm:mt-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border px-4 py-2 hover:bg-muted rounded-md transition-colors w-full sm:w-auto text-center">
                            Parâmetros Locais
                         </button>
                      </li>
                      <li className="p-6 sm:flex items-center justify-between hover:bg-muted/30 transition-all group">
                         <div className="flex items-start gap-5">
                            <div className="w-14 h-14 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20 shadow-sm">
                              <span className="text-[13px] font-bold tracking-wider text-sky-500">FL01</span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                               <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-foreground">Santa Bronx Uberlândia</span>
                                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold rounded tracking-wider uppercase shadow-sm">Ativo</span>
                               </div>
                               <span className="text-[11px] font-medium text-muted-foreground">CNPJ: 14.341.698/0002-70</span>
                               <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-1 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded inline-block w-fit">Franquia Independente</span>
                            </div>
                         </div>
                         <button className="mt-4 sm:mt-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border px-4 py-2 hover:bg-muted rounded-md transition-colors w-full sm:w-auto text-center">
                            Parâmetros Locais
                         </button>
                      </li>
                   </ul>
                </CardContent>
             </Card>
          )}

          {activeTab === 'parametros' && (
             <Card className="bg-card border-border shadow-sm">
                <CardHeader className="border-b border-border">
                   <CardTitle className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-2">
                     <Settings2 className="w-4 h-4 text-primary" />
                     Parâmetros de Auditoria (Globais)
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <ParameterInput label="Alvo de Lucratividade Mínima" value="18.00%" desc="Flag visual vermelho se inferior" color="text-amber-500" />
                     <ParameterInput label="CMV de Referência Máxima" value="45.00%" desc="Margem tolerável de embalagem+produto" color="text-amber-500" />
                     <ParameterInput label="Custo Absorvido / Frete Ideal" value="R$ 15,00" desc="Meta logística padrão" color="text-emerald-500" />
                     <ParameterInput label="Recompra Ideal Recorrência" value="45 Dias" desc="Aviso para CRM / LTV" color="text-sky-500" />
                   </div>
                   <button className="bg-primary text-primary-foreground text-[11px] uppercase font-bold tracking-wider px-8 py-3 rounded-md hover:bg-primary/90 transition-transform active:scale-95 w-full sm:w-auto shadow-sm">
                      Gravar na Matriz Central
                   </button>
                </CardContent>
             </Card>
          )}
       </div>

       <Drawer isOpen={!!isEditingUser} onClose={() => setIsEditingUser(null)} title="Engajamento Sensível de Usuário">
         {isEditingUser && (
           <div className="space-y-6 mt-2">
              <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center gap-4">
                 <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex justify-center items-center font-bold text-primary text-xl shadow-inner">
                    {isEditingUser.name.split(' ').map(n => n[0]).join('')}
                 </div>
                 <div>
                    <span className="block text-sm font-bold text-foreground">{isEditingUser.name}</span>
                    <span className="block text-[11px] text-muted-foreground font-medium mt-1">{isEditingUser.email}</span>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Papel de Responsabilidade</label>
                   <select defaultValue={isEditingUser.role} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 appearance-none shadow-sm cursor-pointer hover:border-primary/30 transition-colors">
                     <option>Administrador Master</option>
                     <option>Gerente Operacional</option>
                     <option>Caixa Oficial</option>
                     <option>Auditor de Resultados (Read-Only)</option>
                   </select>
                 </div>
                 
                 <div className="space-y-1 mt-4">
                   <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">Jurisdição / Loja Autorizada</label>
                   <select defaultValue={isEditingUser.store} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 appearance-none shadow-sm cursor-pointer hover:border-primary/30 transition-colors">
                     <option>Holding Nacional (Todas)</option>
                     <option>Matriz (Araguari) APENAS</option>
                     <option>Franquia 01 (Uberlândia) APENAS</option>
                   </select>
                 </div>
              </div>

              <div className="pt-6 flex gap-3 border-t border-border mt-6">
                 <button onClick={() => setIsEditingUser(null)} className="flex-1 px-4 py-3 bg-muted text-muted-foreground font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-muted/80 transition-colors shadow-sm">Ignorar Troca</button>
                 <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors shadow-sm active:scale-95">Selar Configuração</button>
              </div>
           </div>
         )}
       </Drawer>
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

function ParameterInput({ label, value, desc, color }: { label: string, value: string, desc: string, color?: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-card border border-border hover:border-primary/30 transition-colors rounded-xl relative overflow-hidden group shadow-sm">
      <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-primary transition-colors"></div>
      <div className="flex flex-col pr-4 pl-3 relative z-10">
        <span className="text-[13px] font-bold text-foreground tracking-tight mb-0.5">{label}</span>
        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{desc}</span>
      </div>
      <input type="text" defaultValue={value} className={cn(
        "w-24 bg-muted/50 border border-border rounded-md text-center py-2 text-sm font-mono font-bold focus:outline-none focus:border-primary/50 transition-colors",
        color || "text-foreground"
      )} />
    </div>
  );
}
