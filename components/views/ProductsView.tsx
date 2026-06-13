"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PRODUCTS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function ProductsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Produtos e Custos</h2>
          <p className="text-muted-foreground">Catálogo de SKUs e custos por item.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              <TableHead className="text-right">Custo Un.</TableHead>
              <TableHead className="text-right">Preço Venda</TableHead>
              <TableHead className="text-right">Margem Bruta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRODUCTS.map((p) => {
              const margin = p.price - p.cost;
              const marginPercent = ((margin / p.price) * 100).toFixed(1);
              return (
                <TableRow key={p.id}>
                  <TableCell className="font-medium font-mono text-xs">{p.sku}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell className="text-right">{p.stock} un</TableCell>
                  <TableCell className="text-right">R$ {p.cost.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell className="text-right">R$ {p.price.toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell className="text-right text-green-500">
                    {marginPercent}%
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
