import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockUsers } from '@/lib/mockData';
import { Shield, UserCog, Building2, TicketPercent, Wallet, Settings2, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Drawer } from '@/components/ui/Drawer';

type Tab = 'equipe' | 'permissoes' | 'lojas' | 'taxas' | 'parametros';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<Tab>('equipe');
  const [isEditingUser, setIsEditingUser] = useState<typeof mockUsers[0] | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 max-w-5xl">
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
             <div className="flex flex-col gap-2">
                <SettingsTab icon={UserCog} label="Acessos e Equipe" active={activeTab === 'equipe'} onClick={() => setActiveTab('equipe')} />
                <SettingsTab icon={Shield} label="Grupos de Permissão" active={activeTab === 'permissoes'} onClick={() => setActiveTab('permissoes')} />
                <SettingsTab icon={Building2} label="Cadastro de Lojas" active={activeTab === 'lojas'} onClick={() => setActiveTab('lojas')} />
                <SettingsTab icon={TicketPercent} label="Taxas de Intermediação" active={activeTab === 'taxas'} onClick={() => setActiveTab('taxas')} />
                <SettingsTab icon={Settings2} label="Parâmetros Fiscais" active={activeTab === 'parametros'} onClick={() => setActiveTab('parametros')} />
             </div>
          </div>

          <div className="lg:col-span-3">
             {activeTab === 'equipe' && (
               <Card>
                  <CardHeader className="border-b border-neutral-800 flex justify-between items-center sm:flex-row flex-col gap-4">
                     <CardTitle className="text-base text-white font-medium">Equipe Administrativa</CardTitle>
                     <button className="text-xs bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
                       Convidar Usuário
                     </button>
                  </CardHeader>
                  <div className="p-0">
                     <ul className="divide-y divide-neutral-800">
                        {mockUsers.map(user => (
                          <li key={user.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-neutral-900/50 transition-colors">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700 text-sm font-medium text-white shadow-inner">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-sm font-medium text-white">{user.name}</span>
                                   <span className="text-xs text-neutral-500 mt-0.5">{user.email}</span>
                                </div>
                             </div>
                             <div className="flex items-center gap-6 text-sm">
                                <div className="flex flex-col sm:items-end">
                                  <span className="text-neutral-300 font-medium">{user.role}</span>
                                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1">Acesso: {user.store}</span>
                                </div>
                                <button onClick={() => setIsEditingUser(user)} className="text-neutral-400 hover:text-white px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs shrink-0 font-medium transition-colors">Ajustar</button>
                             </div>
                          </li>
                        ))}
                     </ul>
                  </div>
               </Card>
             )}

             {activeTab === 'taxas' && (
               <Card>
                  <CardHeader className="border-b border-neutral-800">
                     <CardTitle className="text-base text-white font-medium flex items-center gap-2">
                       <Wallet className="w-4 h-4 text-emerald-500" />
                       Custos de Pagamento e Adquirencia
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div className="text-sm text-emerald-500/90 leading-relaxed">
                           Estes descontos são aplicados automaticamente sobre o preço cheio para compor o cálculo da Receita Líquida Diária.
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <ParameterInput label="Taxa PIX (Yampi / PagarMe)" value="1.50%" desc="Aplicado logo na aprovação" />
                       <ParameterInput label="Cartão de Crédito (1x)" value="3.80%" desc="Gateway Principal" />
                       <ParameterInput label="Cartão de Crédito (Avulso até 3x)" value="4.50%" desc="Em parcelamento sem juros" />
                       <ParameterInput label="Custo Antifraude Fixado" value="R$ 1,20" desc="Por transação aprovada ou negada" />
                     </div>
                     <button className="bg-white text-black text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-neutral-200 transition-colors w-full sm:w-auto">
                        Salvar Taxas
                     </button>
                  </CardContent>
               </Card>
             )}

             {(activeTab === 'lojas' || activeTab === 'parametros' || activeTab === 'permissoes') && (
                <div className="flex flex-col items-center justify-center p-12 bg-neutral-900 border border-neutral-800 rounded-xl text-center">
                   <Settings2 className="w-12 h-12 text-neutral-600 mb-4" />
                   <h3 className="text-lg font-medium text-white mb-2">Módulo em Integração</h3>
                   <p className="text-sm text-neutral-500 max-w-sm">Esta configuração ficará disponível após o alinhamento definitivo das franquias na próxima fase.</p>
                </div>
             )}
          </div>
       </div>

       <Drawer isOpen={!!isEditingUser} onClose={() => setIsEditingUser(null)} title="Permissões do Usuário">
         {isEditingUser && (
           <div className="space-y-6">
              <div>
                 <span className="block text-sm font-medium text-white mb-1">{isEditingUser.name}</span>
                 <span className="block text-xs text-neutral-500">{isEditingUser.email}</span>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-neutral-800">
                 <div>
                   <label className="text-xs font-medium uppercase tracking-widest text-neutral-500 mb-2 block">Papel de Sistema</label>
                   <select defaultValue={isEditingUser.role} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-700">
                     <option>Administrador</option>
                     <option>Gerente</option>
                     <option>Operador</option>
                     <option>Apenas Leitura (Auditoria)</option>
                   </select>
                 </div>
                 
                 <div>
                   <label className="text-xs font-medium uppercase tracking-widest text-neutral-500 mb-2 block">Acesso por Franquia</label>
                   <select defaultValue={isEditingUser.store} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-neutral-700">
                     <option>Todas (Matriz e Filiais)</option>
                     <option>Apenas Araguari</option>
                     <option>Apenas Uberlândia</option>
                   </select>
                 </div>
              </div>

              <div className="pt-4 flex gap-3">
                 <button onClick={() => setIsEditingUser(null)} className="flex-1 px-4 py-2.5 bg-neutral-900 text-neutral-300 font-medium text-sm rounded-lg hover:bg-neutral-800 transition-colors">Cancelar</button>
                 <button className="flex-1 px-4 py-2.5 bg-white text-black font-medium text-sm rounded-lg hover:bg-neutral-200 transition-colors">Salvar Perfil</button>
              </div>
           </div>
         )}
       </Drawer>
    </div>
  );
}

function SettingsTab({ icon: Icon, label, active, onClick }: { icon: React.ElementType, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left
      ${active ? 'bg-neutral-800 border-l-4 border-l-emerald-500 border-r border-t border-b border-neutral-800 text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent'}`}>
       <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-emerald-500' : 'text-neutral-500'}`} />
       {label}
    </button>
  );
}

function ParameterInput({ label, value, desc }: { label: string, value: string, desc: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
      <div className="flex flex-col pr-4">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-[11px] text-neutral-500 mt-1">{desc}</span>
      </div>
      <input type="text" defaultValue={value} className="w-20 bg-neutral-900 border border-neutral-700 rounded text-center py-1.5 text-sm font-mono text-emerald-400 focus:outline-none" />
    </div>
  );
}
