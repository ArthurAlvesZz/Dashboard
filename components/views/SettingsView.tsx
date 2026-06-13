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
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-5xl">
       
       {/* Premium Segmented Control */}
       <div className="p-1.5 bg-[#0a0a0a] border border-neutral-900 rounded-xl inline-flex flex-wrap gap-1 shadow-lg overflow-x-auto w-full sm:w-auto">
          <SegmentedTab icon={UserCog} label="Acessos e Equipe" active={activeTab === 'equipe'} onClick={() => setActiveTab('equipe')} />
          <SegmentedTab icon={Shield} label="Permissões" active={activeTab === 'permissoes'} onClick={() => setActiveTab('permissoes')} />
          <SegmentedTab icon={Building2} label="Lojas" active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} />
          <SegmentedTab icon={TicketPercent} label="Taxas" active={activeTab === 'taxas'} onClick={() => setActiveTab('taxas')} />
          <SegmentedTab icon={Settings2} label="Parâmetros" active={activeTab === 'parametros'} onClick={() => setActiveTab('parametros')} />
       </div>

       <div className="mt-6">
          {activeTab === 'equipe' && (
            <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl relative overflow-hidden">
               <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-pink-500/5 to-transparent pointer-events-none" />
               <CardHeader className="border-b border-neutral-900 flex justify-between items-center sm:flex-row flex-col gap-4 relative z-10 pb-5">
                  <CardTitle className="text-sm font-medium tracking-widest uppercase text-neutral-300">Equipe Administrativa</CardTitle>
                  <button className="text-[11px] font-mono tracking-widest uppercase bg-white text-black px-5 py-2.5 rounded-md hover:bg-neutral-200 transition-colors shadow-lg active:scale-95">
                    Convidar Novo
                  </button>
               </CardHeader>
               <div className="p-0 relative z-10">
                  <ul className="divide-y divide-neutral-900/50">
                     {mockUsers.map(user => (
                       <li key={user.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#0f0f0f] transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 bg-neutral-900 rounded-md flex items-center justify-center border border-neutral-800 text-sm font-medium text-pink-500 group-hover:border-pink-500/30 transition-colors">
                               {user.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div className="flex flex-col gap-0.5">
                                <span className="text-sm font-medium text-white">{user.name}</span>
                                <span className="text-xs text-neutral-500">{user.email}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-6 text-sm">
                             <div className="flex flex-col sm:items-end gap-0.5">
                               <span className="text-neutral-300 font-medium text-sm">{user.role}</span>
                               <span className="text-[10px] uppercase tracking-widest text-neutral-600 mt-1">Acesso: {user.store}</span>
                             </div>
                             <button onClick={() => setIsEditingUser(user)} className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 hover:border-white/10 px-4 py-2 rounded-md bg-neutral-900 border border-neutral-800 font-medium transition-all active:scale-95">
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
            <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl">
               <CardHeader className="border-b border-neutral-900">
                  <CardTitle className="text-sm font-medium tracking-widest uppercase text-neutral-300 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-pink-500" />
                    Custos de Adquirencia
                  </CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-6">
                  <div className="bg-pink-500/5 border border-pink-500/20 p-4 rounded-lg flex items-start gap-4 shadow-[inset_0_0_15px_rgba(236,72,153,0.02)]">
                     <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                     <div className="text-sm text-pink-200/80 leading-relaxed font-medium">
                        Estes descontos são aplicados automaticamente sobre o preço bruto para compor o cálculo da Receita Líquida Diária. Alterações afetam os dias futuros.
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterInput label="Taxa PIX (Yampi)" value="1.50%" desc="Aplicado imediatamente" color="pink" />
                    <ParameterInput label="Cartão Crédito (1x)" value="3.80%" desc="Gateway Principal" color="pink" />
                    <ParameterInput label="Cartão Crédito (3x)" value="4.50%" desc="Parcelamento Isento" color="pink" />
                    <ParameterInput label="Custo Antifraude Fixado" value="R$ 1,20" desc="Aprovado / Negado" color="pink" />
                  </div>
                  <button className="bg-white text-black text-[11px] uppercase tracking-widest font-mono font-medium px-8 py-3 rounded-md hover:bg-neutral-200 transition-transform active:scale-95 w-full sm:w-auto shadow-lg">
                     Gravar Parâmetros
                  </button>
               </CardContent>
            </Card>
          )}

          {activeTab === 'permissoes' && (
             <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl">
                <CardHeader className="border-b border-neutral-900">
                   <CardTitle className="text-sm font-medium tracking-widest uppercase text-neutral-300 flex items-center gap-2">
                     <Shield className="w-4 h-4 text-pink-500" />
                     Grupos de Acesso Ativos
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                   <ul className="divide-y divide-neutral-800/50">
                      <li className="p-6 flex items-center justify-between hover:bg-[#0f0f0f] transition-all group">
                         <div>
                            <span className="text-sm font-medium text-white block mb-1">Administrador Master</span>
                            <span className="text-[11px] text-neutral-500 block max-w-md leading-relaxed">Acesso irrestrito ao cofre, tabelas de markup, financeiro integral e edição de configurações fiscais.</span>
                         </div>
                         <button className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 group-hover:text-pink-400 transition-colors">Configurar DRE</button>
                      </li>
                      <li className="p-6 flex items-center justify-between hover:bg-[#0f0f0f] transition-all group">
                         <div>
                            <span className="text-sm font-medium text-white block mb-1">Coordenador de Franquia</span>
                            <span className="text-[11px] text-neutral-500 block max-w-md leading-relaxed">Acesso diário a dashboard filtrado, inserção de despesas da própria loja e relatórios locais estritos.</span>
                         </div>
                         <button className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 group-hover:text-pink-400 transition-colors">Ver Privilégios</button>
                      </li>
                      <li className="p-6 flex items-center justify-between hover:bg-[#0f0f0f] transition-all group">
                         <div>
                            <span className="text-sm font-medium text-white block mb-1">Auditor Contábil (Read-Only)</span>
                            <span className="text-[11px] text-neutral-500 block max-w-md leading-relaxed">Visualização de DRE exportável e histórico fechado de despesas. Nenhuma permissão de inserção manual.</span>
                         </div>
                         <button className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 group-hover:text-pink-400 transition-colors">Ver Privilégios</button>
                      </li>
                   </ul>
                </CardContent>
             </Card>
          )}

          {activeTab === 'lojas' && (
             <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl">
                <CardHeader className="border-b border-neutral-900 flex justify-between items-center sm:flex-row flex-col gap-4">
                   <CardTitle className="text-sm font-medium tracking-widest uppercase text-neutral-300 flex items-center gap-2">
                     <Building2 className="w-4 h-4 text-pink-500" />
                     Operações Cadastradas
                   </CardTitle>
                   <button className="text-[11px] font-mono tracking-widest uppercase bg-white text-black px-5 py-2.5 rounded-md hover:bg-neutral-200 transition-colors shadow-lg active:scale-95">
                     Credenciar CNPJ
                   </button>
                </CardHeader>
                <CardContent className="p-0">
                   <ul className="divide-y divide-neutral-900">
                      <li className="p-6 flex items-center justify-between hover:bg-[#0f0f0f] transition-all">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center border border-neutral-800">
                              <span className="text-[11px] font-mono tracking-widest text-emerald-400">MAT</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                               <span className="text-sm font-medium text-white">Araguari (Matriz)</span>
                               <span className="text-[11px] text-neutral-500 font-mono tracking-tight">CNPJ: 14.341.698/0001-99</span>
                            </div>
                         </div>
                         <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono rounded tracking-widest uppercase">Ativo</span>
                      </li>
                      <li className="p-6 flex items-center justify-between hover:bg-[#0f0f0f] transition-all">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center border border-neutral-800">
                              <span className="text-[11px] font-mono tracking-widest text-emerald-400">FL1</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                               <span className="text-sm font-medium text-white">Uberlândia Center</span>
                               <span className="text-[11px] text-neutral-500 font-mono tracking-tight">CNPJ: 14.341.698/0002-70</span>
                            </div>
                         </div>
                         <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono rounded tracking-widest uppercase">Ativo</span>
                      </li>
                   </ul>
                </CardContent>
             </Card>
          )}

          {activeTab === 'parametros' && (
             <Card className="bg-[#0a0a0a] border-neutral-900 shadow-2xl">
                <CardHeader className="border-b border-neutral-900">
                   <CardTitle className="text-sm font-medium tracking-widest uppercase text-neutral-300 flex items-center gap-2">
                     <Settings2 className="w-4 h-4 text-pink-500" />
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
                   <button className="bg-white text-black text-[11px] uppercase tracking-widest font-mono font-medium px-8 py-3 rounded-md hover:bg-neutral-200 transition-transform active:scale-95 w-full sm:w-auto shadow-lg">
                      Aplicar Diretrizes
                   </button>
                </CardContent>
             </Card>
          )}
       </div>

       <Drawer isOpen={!!isEditingUser} onClose={() => setIsEditingUser(null)} title="Controle de Elite do Usuário">
         {isEditingUser && (
           <div className="space-y-6 mt-2">
              <div className="p-4 bg-[#0a0a0a] rounded-xl border border-neutral-900 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-lg bg-pink-500/10 border border-pink-500/20 flex justify-center items-center font-display text-pink-500 text-lg">
                    {isEditingUser.name.split(' ').map(n => n[0]).join('')}
                 </div>
                 <div>
                    <span className="block text-sm font-medium text-white">{isEditingUser.name}</span>
                    <span className="block text-xs text-neutral-500 font-mono tracking-tight">{isEditingUser.email}</span>
                 </div>
              </div>
              
              <div className="space-y-5">
                 <div>
                   <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 block">Papel Arquitetural</label>
                   <select defaultValue={isEditingUser.role} className="w-full bg-[#050505] border border-neutral-800 rounded-lg px-4 py-3 text-sm font-medium text-neutral-200 focus:outline-none focus:border-pink-500/50 appearance-none">
                     <option>Administrador Master</option>
                     <option>Gerente Operacional</option>
                     <option>Líder Caixa</option>
                     <option>Leitura Cega (Auditor)</option>
                   </select>
                 </div>
                 
                 <div>
                   <label className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-2 block">Escopo Franquia</label>
                   <select defaultValue={isEditingUser.store} className="w-full bg-[#050505] border border-neutral-800 rounded-lg px-4 py-3 text-sm font-medium text-neutral-200 focus:outline-none focus:border-pink-500/50 appearance-none">
                     <option>Holding [Global]</option>
                     <option>Matriz (Araguari)</option>
                     <option>Filial (Uberlândia)</option>
                   </select>
                 </div>
              </div>

              <div className="pt-6 flex gap-3">
                 <button onClick={() => setIsEditingUser(null)} className="flex-1 px-4 py-3 bg-neutral-900 text-neutral-300 font-mono text-[10px] uppercase tracking-widest rounded-lg hover:bg-neutral-800 transition-colors">Abortar</button>
                 <button className="flex-1 px-4 py-3 bg-white text-black font-mono font-medium text-[10px] uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-colors shadow-lg">Confirmar Mutação</button>
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
       "flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium transition-all relative overflow-hidden group whitespace-nowrap",
       active 
         ? "bg-neutral-900/80 text-white shadow-sm" 
         : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/30"
    )}>
       {active && <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent pointer-events-none" />}
       <Icon className={cn("w-3.5 h-3.5 shrink-0 transition-colors relative z-10", active ? "text-pink-500" : "text-neutral-500 group-hover:text-neutral-400")} />
       <span className="relative z-10">{label}</span>
       {active && <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-pink-500 rounded-t-sm shadow-[0_0_8px_rgba(236,72,153,0.8)]" />}
    </button>
  );
}

function ParameterInput({ label, value, desc, color }: { label: string, value: string, desc: string, color?: string }) {
  const isPink = color === 'pink';
  return (
    <div className="flex items-center justify-between p-5 bg-[#050505] border border-neutral-900/80 hover:border-neutral-800 transition-colors rounded-xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-neutral-800 group-hover:bg-neutral-700 transition-colors"></div>
      <div className="flex flex-col pr-4 pl-3 relative z-10">
        <span className="text-sm font-medium text-neutral-200 mb-0.5">{label}</span>
        <span className="text-[11px] text-neutral-500 leading-tight pr-4">{desc}</span>
      </div>
      <input type="text" defaultValue={value} className={cn(
        "w-24 bg-[#0a0a0a] border border-neutral-800 rounded-md text-center py-2 text-sm font-mono focus:outline-none focus:border-pink-500/50 transition-colors",
        isPink ? "text-pink-400" : "text-emerald-400"
      )} />
    </div>
  );
}
