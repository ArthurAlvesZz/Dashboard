import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockUsers } from '@/lib/mockData';
import { Shield, UserCog, Building2, TicketPercent, Wallet, Settings2, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency, cn } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';

type Tab = 'equipe' | 'permissoes' | 'lojas' | 'taxas' | 'parametros';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>('equipe');
  const [isEditingUser, setIsEditingUser] = useState<typeof mockUsers[0] | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-5xl">
       
       {/* Premium Segmented Control */}
       <div className="p-1.5 bg-card border border-border rounded-xl inline-flex flex-wrap gap-1 shadow-sm overflow-x-auto w-full sm:w-auto">
          <SegmentedTab icon={UserCog} label="Acessos e Equipe" active={activeTab === 'equipe'} onClick={() => setActiveTab('equipe')} />
          <SegmentedTab icon={Shield} label="Permissões" active={activeTab === 'permissoes'} onClick={() => setActiveTab('permissoes')} />
          <SegmentedTab icon={Building2} label="Lojas" active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} />
          <SegmentedTab icon={TicketPercent} label="Taxas" active={activeTab === 'taxas'} onClick={() => setActiveTab('taxas')} />
          <SegmentedTab icon={Settings2} label="Parâmetros" active={activeTab === 'parametros'} onClick={() => setActiveTab('parametros')} />
       </div>

       <div className="mt-6">
          {activeTab === 'equipe' && (
            <Card className="bg-card border-border shadow-sm relative overflow-hidden">
               <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
               <CardHeader className="border-b border-border flex justify-between items-center sm:flex-row flex-col gap-4 relative z-10 pb-5">
                  <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Equipe Administrativa</CardTitle>
                  <button className="text-[11px] font-bold tracking-wider uppercase bg-primary text-primary-foreground px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors shadow-sm active:scale-95">
                    Convidar Novo
                  </button>
               </CardHeader>
               <div className="p-0 relative z-10">
                  <ul className="divide-y divide-border/50">
                     {mockUsers.map(user => (
                       <li key={user.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-muted/30 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center border border-border/50 text-sm font-bold text-primary group-hover:border-primary/30 transition-colors">
                               {user.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-bold text-foreground">{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                             <div className="flex flex-col sm:items-end gap-0.5">
                               <span className="text-foreground font-semibold text-sm">{user.role}</span>
                               <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-foreground mt-1">Acesso: {user.store}</span>
                             </div>
                             <button onClick={() => setIsEditingUser(user)} className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border px-4 py-2 rounded-md bg-transparent border border-transparent transition-all active:scale-95">
                               Ajustar
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
                  <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    Custos de Adquirencia
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-6">
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg flex items-start gap-4 shadow-sm">
                     <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                     <div className="text-sm text-foreground/80 leading-relaxed font-medium">
                        Estes descontos são aplicados automaticamente sobre o preço bruto para compor o cálculo da Receita Líquida Diária. Alterações afetam os dias futuros.
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterInput label="Taxa PIX (Yampi)" value="1.50%" desc="Aplicado imediatamente" color="pink" />
                    <ParameterInput label="Cartão Crédito (1x)" value="3.80%" desc="Gateway Principal" color="pink" />
                    <ParameterInput label="Cartão Crédito (3x)" value="4.50%" desc="Parcelamento Isento" color="pink" />
                    <ParameterInput label="Custo Antifraude Fixado" value="R$ 1,20" desc="Aprovado / Negado" color="pink" />
                  </div>
                  <button className="bg-primary text-primary-foreground text-[11px] uppercase tracking-wider font-bold px-8 py-3 rounded-md hover:bg-primary/90 transition-transform active:scale-95 w-full sm:w-auto shadow-sm">
                     Gravar Parâmetros
                  </button>
               </CardContent>
            </Card>
          )}

          {activeTab === 'permissoes' && (
             <Card className="bg-card border-border shadow-sm">
                <CardHeader className="border-b border-border">
                   <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                     <Shield className="w-4 h-4 text-primary" />
                     Grupos de Acesso Ativos
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                   <ul className="divide-y divide-border/50">
                      <li className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all group">
                         <div>
                            <span className="text-sm font-bold text-foreground block mb-1">Administrador Master</span>
                            <span className="text-[11px] text-muted-foreground font-medium block max-w-md leading-relaxed">Acesso irrestrito ao cofre, tabelas de markup, financeiro integral e edição de configurações fiscais.</span>
                         </div>
                         <button className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground group-hover:text-primary transition-colors">Configurar DRE</button>
                      </li>
                      <li className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all group">
                         <div>
                            <span className="text-sm font-bold text-foreground block mb-1">Coordenador de Franquia</span>
                            <span className="text-[11px] text-muted-foreground font-medium block max-w-md leading-relaxed">Acesso diário a dashboard filtrado, inserção de despesas da própria loja e relatórios locais estritos.</span>
                         </div>
                         <button className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground group-hover:text-primary transition-colors">Ver Privilégios</button>
                      </li>
                      <li className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all group">
                         <div>
                            <span className="text-sm font-bold text-foreground block mb-1">Auditor Contábil (Read-Only)</span>
                            <span className="text-[11px] text-muted-foreground font-medium block max-w-md leading-relaxed">Visualização de DRE exportável e histórico fechado de despesas. Nenhuma permissão de inserção manual.</span>
                         </div>
                         <button className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground group-hover:text-primary transition-colors">Ver Privilégios</button>
                      </li>
                   </ul>
                </CardContent>
             </Card>
          )}

          {activeTab === 'lojas' && (
             <Card className="bg-card border-border shadow-sm">
                <CardHeader className="border-b border-border flex justify-between items-center sm:flex-row flex-col gap-4">
                   <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                     <Building2 className="w-4 h-4 text-primary" />
                     Operações Cadastradas
                   </CardTitle>
                   <button className="text-[11px] font-bold tracking-wider uppercase bg-primary text-primary-foreground px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors shadow-sm active:scale-95">
                     Credenciar CNPJ
                   </button>
                </CardHeader>
                <CardContent className="p-0">
                   <ul className="divide-y divide-border">
                      <li className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center border border-border">
                              <span className="text-[11px] font-bold tracking-wider text-emerald-500">MAT</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                               <span className="text-sm font-bold text-foreground">Araguari (Matriz)</span>
                               <span className="text-[11px] font-semibold text-muted-foreground tracking-tight">CNPJ: 14.341.698/0001-99</span>
                            </div>
                         </div>
                         <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold rounded tracking-wider uppercase">Ativo</span>
                      </li>
                      <li className="p-6 flex items-center justify-between hover:bg-muted/30 transition-all">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center border border-border">
                              <span className="text-[11px] font-bold tracking-wider text-emerald-500">FL1</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                               <span className="text-sm font-bold text-foreground">Uberlândia Center</span>
                               <span className="text-[11px] font-semibold text-muted-foreground tracking-tight">CNPJ: 14.341.698/0002-70</span>
                            </div>
                         </div>
                         <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-bold rounded tracking-wider uppercase">Ativo</span>
                      </li>
                   </ul>
                </CardContent>
             </Card>
          )}

          {activeTab === 'parametros' && (
             <Card className="bg-card border-border shadow-sm">
                <CardHeader className="border-b border-border">
                   <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                     <Settings2 className="w-4 h-4 text-primary" />
                     Diretrizes Fiscais Globais
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <ParameterInput label="Simples Nacional (Méd.)" value="6.50%" desc="Dedução bruta mensal" />
                     <ParameterInput label="Markup CMV Recomendado" value="2.30" desc="Aviso visual nas compras" />
                     <ParameterInput label="Trava Reserva Matriz" value="10.00%" desc="Cálculo líquido" />
                     <ParameterInput label="Redline Lucratividade" value="20.00%" desc="Disparo p/ Cockpit" />
                   </div>
                   <button className="bg-primary text-primary-foreground text-[11px] uppercase font-bold tracking-wider px-8 py-3 rounded-md hover:bg-primary/90 transition-transform active:scale-95 w-full sm:w-auto shadow-sm">
                      Aplicar Diretrizes
                   </button>
                </CardContent>
             </Card>
          )}
       </div>

       <Drawer isOpen={!!isEditingUser} onClose={() => setIsEditingUser(null)} title="Controle de Elite do Usuário">
         {isEditingUser && (
           <div className="space-y-6 mt-2">
              <div className="p-4 bg-muted/30 rounded-xl border border-border flex items-center gap-4">
                 <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex justify-center items-center font-bold text-primary text-lg">
                    {isEditingUser.name.split(' ').map(n => n[0]).join('')}
                 </div>
                 <div>
                    <span className="block text-sm font-bold text-foreground">{isEditingUser.name}</span>
                    <span className="block text-xs text-muted-foreground tracking-tight font-semibold">{isEditingUser.email}</span>
                 </div>
              </div>
              
              <div className="space-y-5">
                 <div>
                   <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Papel Arquitetural</label>
                   <select defaultValue={isEditingUser.role} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:border-primary/50 appearance-none">
                     <option>Administrador Master</option>
                     <option>Gerente Operacional</option>
                     <option>Líder Caixa</option>
                     <option>Leitura Cega (Auditor)</option>
                   </select>
                 </div>
                 
                 <div>
                   <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2 block">Escopo Franquia</label>
                   <select defaultValue={isEditingUser.store} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:border-primary/50 appearance-none">
                     <option>Holding [Global]</option>
                     <option>Matriz (Araguari)</option>
                     <option>Filial (Uberlândia)</option>
                   </select>
                 </div>
              </div>

              <div className="pt-6 flex gap-3">
                 <button onClick={() => setIsEditingUser(null)} className="flex-1 px-4 py-3 bg-muted text-muted-foreground font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-muted/80 transition-colors">Abortar</button>
                 <button className="flex-1 px-4 py-3 bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors shadow-sm">Confirmar Mutação</button>
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
  const isPink = color === 'pink';
  return (
    <div className="flex items-center justify-between p-5 bg-card border border-border hover:border-border/80 transition-colors rounded-xl relative overflow-hidden group shadow-sm">
      <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-primary/30 transition-colors"></div>
      <div className="flex flex-col pr-4 pl-3 relative z-10">
        <span className="text-sm font-bold text-foreground tracking-tight mb-0.5">{label}</span>
        <span className="text-[11px] text-muted-foreground font-medium leading-tight pr-4">{desc}</span>
      </div>
      <input type="text" defaultValue={value} className={cn(
        "w-24 bg-muted/50 border border-border rounded-md text-center py-2 text-sm font-mono font-bold focus:outline-none focus:border-primary/50 transition-colors",
        isPink ? "text-primary" : "text-emerald-500"
      )} />
    </div>
  );
}
