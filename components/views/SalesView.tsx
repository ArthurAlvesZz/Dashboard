"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SALES, STORES } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SalesView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pedidos e Vendas</h2>
          <p className="text-muted-foreground">Acompanhe todos os pedidos realizados nas filiais.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar pedido..." className="w-full pl-8" />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Loja</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SALES.map((sale) => {
              const store = STORES.find(s => s.id === sale.storeId);
              return (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{store?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={
                      sale.status === 'completed' ? 'default' :
                      sale.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {sale.status === 'completed' ? 'Concluído' :
                       sale.status === 'pending' ? 'Pendente' : 'Cancelado'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {sale.total.toFixed(2).replace('.', ',')}
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
