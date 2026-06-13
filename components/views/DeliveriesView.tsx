"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DELIVERIES } from "@/lib/mockData";

export function DeliveriesView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Entregas</h2>
        <p className="text-muted-foreground">Gestão de logística e rastreio de envios.</p>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entrega ID</TableHead>
              <TableHead>Pedido</TableHead>
              <TableHead>Transportadora</TableHead>
              <TableHead>Rastreio</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Custo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DELIVERIES.map((d) => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.id}</TableCell>
                <TableCell>{d.saleId}</TableCell>
                <TableCell>{d.carrier}</TableCell>
                <TableCell className="font-mono text-xs">{d.tracking}</TableCell>
                <TableCell>
                  <Badge variant={d.status === 'delivered' ? 'default' : 'secondary'}>
                    {d.status === 'delivered' ? 'Entregue' : 'Em Trânsito'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  R$ {d.cost.toFixed(2).replace('.', ',')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
