"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BUSINESS_COSTS, STORES } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export function BusinessCostsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Custos do Negócio</h2>
        <p className="text-muted-foreground">Acompanhamento e registro de despesas fixas e variáveis.</p>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mês</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Loja</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUSINESS_COSTS.map((c) => {
              const store = STORES.find(s => s.id === c.storeId);
              return (
                <TableRow key={c.id}>
                  <TableCell>{c.month}</TableCell>
                  <TableCell className="font-medium">{c.description}</TableCell>
                  <TableCell>{store?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={c.type === 'fixed' ? 'outline' : 'secondary'}>
                      {c.type === 'fixed' ? 'Fixo' : 'Variável'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {c.amount.toFixed(2).replace('.', ',')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
