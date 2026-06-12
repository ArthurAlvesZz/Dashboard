import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { mockUsers } from '@/lib/mockData';
import { Shield, UserCog, Building2, TicketPercent } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="space-y-4">
             <div className="flex flex-col gap-2">
                <SettingsTab icon={UserCog} label="Acessos e Equipe" active />
                <SettingsTab icon={Shield} label="Níveis de Permissão" />
                <SettingsTab icon={Building2} label="Lojas Físicas" />
                <SettingsTab icon={TicketPercent} label="Taxas de Pagamento" />
             </div>
          </div>

          <div className="col-span-2">
             <Card>
                <CardHeader className="border-b border-neutral-800 flex justify-between items-center sm:flex-row flex-col gap-4">
                   <CardTitle>Equipe Administrativa</CardTitle>
                   <button className="text-sm bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
                     Convidar Membro
                   </button>
                </CardHeader>
                <div className="p-0">
                   <ul className="divide-y divide-neutral-800">
                      {mockUsers.map(user => (
                        <li key={user.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700 text-sm font-medium text-white">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-sm font-medium text-white">{user.name}</span>
                                 <span className="text-xs text-neutral-500">{user.email}</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-6 text-sm">
                              <div className="flex flex-col sm:items-end">
                                <span className="text-neutral-300">{user.role}</span>
                                <span className="text-xs text-neutral-500 mt-0.5">Visão: {user.store}</span>
                              </div>
                              <button className="text-sky-400 hover:underline text-xs shrink-0 font-medium">Editar</button>
                           </div>
                        </li>
                      ))}
                   </ul>
                </div>
             </Card>
          </div>

       </div>
    </div>
  );
}

function SettingsTab({ icon: Icon, label, active }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left
      ${active ? 'bg-neutral-900 border border-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'}`}>
       <Icon className="w-5 h-5 shrink-0" />
       {label}
    </button>
  );
}
