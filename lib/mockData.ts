export const STORES = [
  { id: "1", name: "Araguari" },
  { id: "2", name: "Uberlândia" }
];

export const PRODUCTS = [
  { id: "p1", sku: "ADS01", name: "Camiseta ADS01", price: 89.90, cost: 35.00, stock: 45 },
  { id: "p2", sku: "ADS02", name: "Camiseta ADS02", price: 89.90, cost: 35.00, stock: 32 },
  { id: "p3", sku: "CON07", name: "Calça CON07", price: 149.90, cost: 60.00, stock: 15 },
  { id: "p4", sku: "VRD-P", name: "Verde P RAYSSA", price: 79.90, cost: 30.00, stock: 8 },
  { id: "p5", sku: "CRM-50", name: "Creme PRT50", price: 119.90, cost: 45.00, stock: 24 }
];

export const SALES = [
  { id: "s1", storeId: "1", date: "2026-06-12", customer: "João Silva", total: 179.80, status: "completed", items: [{ sku: "ADS01", qty: 2 }] },
  { id: "s2", storeId: "2", date: "2026-06-12", customer: "Maria Costa", total: 149.90, status: "pending", items: [{ sku: "CON07", qty: 1 }] },
  { id: "s3", storeId: "1", date: "2026-06-11", customer: "Carlos Moura", total: 79.90, status: "completed", items: [{ sku: "VRD-P", qty: 1 }] },
  { id: "s4", storeId: "2", date: "2026-06-10", customer: "Ana Julia", total: 209.80, status: "canceled", items: [{ sku: "ADS02", qty: 1 }, { sku: "CRM-50", qty: 1 }] },
];

export const DELIVERIES = [
  { id: "d1", saleId: "s1", status: "delivered", carrier: "Correios", tracking: "BR123456789BR", cost: 15.50 },
  { id: "d2", saleId: "s2", status: "in_transit", carrier: "Loggi", tracking: "LG987654321", cost: 22.00 }
];

export const BUSINESS_COSTS = [
  { id: "c1", storeId: "1", type: "fixed", description: "Aluguel", amount: 3500.00, month: "2026-06" },
  { id: "c2", storeId: "2", type: "fixed", description: "Aluguel", amount: 4200.00, month: "2026-06" },
  { id: "c3", storeId: "1", type: "variable", description: "Energia", amount: 450.00, month: "2026-06" },
  { id: "c4", storeId: "1", type: "variable", description: "Internet", amount: 150.00, month: "2026-06" },
  { id: "c5", storeId: "2", type: "variable", description: "Energia", amount: 520.00, month: "2026-06" },
];
