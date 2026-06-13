export const STORES = [
  { id: "1", name: "Araguari" },
  { id: "2", name: "Uberlândia" },
];

export const PRODUCTS = [
  { id: "p1", sku: "ADS01", name: "Camiseta ADS01 Preta", variation: "Preta P", pixPrice: 79.90, cardPrice: 89.90, price: 89.90, cost: 32.50, stock: 45, status: "active", origin: "xlsx", lastUpdate: "2026-06-12" },
  { id: "p2", sku: "ADS02", name: "Camiseta ADS01 Branca", variation: "Branca M", pixPrice: 79.90, cardPrice: 89.90, price: 89.90, cost: 32.50, stock: 32, status: "active", origin: "manual", lastUpdate: "2026-06-12" },
  { id: "p3", sku: "CON07", name: "Calça CON07 Jeans", variation: "38", pixPrice: 139.90, cardPrice: 149.90, price: 149.90, cost: 60.00, stock: 15, status: "active", origin: "manual", lastUpdate: "2026-06-10" },
  { id: "p4", sku: "VRD-P", name: "Vestido RAYSSA", variation: "Verde P", pixPrice: 69.90, cardPrice: 79.90, price: 79.90, cost: 30.00, stock: 8, status: "pending_cost", origin: "csv", lastUpdate: "2026-06-11" },
  { id: "p5", sku: "CRM-50", name: "Creme PRT50", variation: "Único", pixPrice: 109.90, cardPrice: 119.90, price: 119.90, cost: 45.00, stock: 24, status: "active", origin: "xlsx", lastUpdate: "2026-06-08" },
  { id: "p6", sku: "BLU-IN", name: "Blusão Inverno", variation: "M", pixPrice: 199.90, cardPrice: 219.90, price: 219.90, cost: 95.00, stock: 12, status: "active", origin: "manual", lastUpdate: "2026-06-12" },
  { id: "p7", sku: "BLU-IN-G", name: "Blusão Inverno", variation: "G", pixPrice: 199.90, cardPrice: 219.90, price: 219.90, cost: 95.00, stock: 5, status: "active", origin: "manual", lastUpdate: "2026-06-12" },
  { id: "p8", sku: "TSH-B", name: "T-Shirt Básica", variation: "Preta", pixPrice: 49.90, cardPrice: 59.90, price: 59.90, cost: 18.50, stock: 150, status: "active", origin: "xlsx", lastUpdate: "2026-06-01" },
  { id: "p9", sku: "TSH-W", name: "T-Shirt Básica", variation: "Branca", pixPrice: 49.90, cardPrice: 59.90, price: 59.90, cost: 18.50, stock: 120, status: "active", origin: "xlsx", lastUpdate: "2026-06-01" },
  { id: "p10", sku: "TSH-G", name: "T-Shirt Básica", variation: "Cinza", pixPrice: 49.90, cardPrice: 59.90, price: 59.90, cost: 18.50, stock: 85, status: "active", origin: "xlsx", lastUpdate: "2026-06-01" },
  { id: "p11", sku: "SNE-W", name: "Sneaker Casual", variation: "Branco 39", pixPrice: 249.90, cardPrice: 279.90, price: 279.90, cost: 110.00, stock: 10, status: "active", origin: "manual", lastUpdate: "2026-06-05" },
  { id: "p12", sku: "SNE-B", name: "Sneaker Casual", variation: "Preto 40", pixPrice: 249.90, cardPrice: 279.90, price: 279.90, cost: 110.00, stock: 8, status: "active", origin: "manual", lastUpdate: "2026-06-05" },
  { id: "p13", sku: "JAC-L", name: "Jaqueta Couro", variation: "M", pixPrice: 399.90, cardPrice: 449.90, price: 449.90, cost: 180.00, stock: 4, status: "active", origin: "xlsx", lastUpdate: "2026-06-03" },
  { id: "p14", sku: "SOC-PK", name: "Meias Pack", variation: "3 pares", pixPrice: 29.90, cardPrice: 34.90, price: 34.90, cost: 9.00, stock: 200, status: "active", origin: "csv", lastUpdate: "2026-06-10" },
  { id: "p15", sku: "BEL-L", name: "Cinto Couro", variation: "Único", pixPrice: 89.90, cardPrice: 99.90, price: 99.90, cost: 35.00, stock: 45, status: "active", origin: "manual", lastUpdate: "2026-06-02" },
  { id: "p16", sku: "HAT-B", name: "Boné Aba Reta", variation: "Preto", pixPrice: 59.90, cardPrice: 69.90, price: 69.90, cost: 22.00, stock: 30, status: "inactive", origin: "manual", lastUpdate: "2026-05-15" },
  { id: "p17", sku: "SHI-F", name: "Camisa Flanela", variation: "Xadrez", pixPrice: 129.90, cardPrice: 149.90, price: 149.90, cost: 55.00, stock: 0, status: "inactive", origin: "manual", lastUpdate: "2026-05-20" },
  { id: "p18", sku: "BAG-T", name: "Tote Bag", variation: "Cru", pixPrice: 79.90, cardPrice: 89.90, price: 89.90, cost: 28.00, stock: 15, status: "pending_cost", origin: "csv", lastUpdate: "2026-06-11" },
  { id: "p19", sku: "GLA-S", name: "Óculos Sol", variation: "Retrô", pixPrice: 119.90, cardPrice: 139.90, price: 139.90, cost: 42.00, stock: 22, status: "active", origin: "xlsx", lastUpdate: "2026-06-04" },
  { id: "p20", sku: "WAC-D", name: "Relógio Digital", variation: "Prata", pixPrice: 199.90, cardPrice: 229.90, price: 229.90, cost: 85.00, stock: 6, status: "active", origin: "manual", lastUpdate: "2026-06-08" },
];

export const SALES = [
  { id: "s1", storeId: "1", date: "2026-06-12T14:30:00Z", customer: "João Silva", total: 179.80, status: "completed", paymentMethod: "pix", items: [{ sku: "ADS01", qty: 2 }] },
  { id: "s2", storeId: "2", date: "2026-06-12T15:45:00Z", customer: "Maria Costa", total: 149.90, status: "pending", paymentMethod: "card", items: [{ sku: "CON07", qty: 1 }] },
  { id: "s3", storeId: "1", date: "2026-06-11T10:15:00Z", customer: "Carlos Moura", total: 79.90, status: "completed", paymentMethod: "cash", items: [{ sku: "VRD-P", qty: 1 }] },
  { id: "s4", storeId: "2", date: "2026-06-10T09:20:00Z", customer: "Ana Julia", total: 209.80, status: "canceled", paymentMethod: "pix", items: [{ sku: "ADS02", qty: 1 }, { sku: "CRM-50", qty: 1 }] },
  { id: "s5", storeId: "1", date: "2026-06-09T11:10:00Z", customer: "Pedro Henrique", total: 59.90, status: "completed", paymentMethod: "pix", items: [{ sku: "TSH-W", qty: 1 }] },
  { id: "s6", storeId: "2", date: "2026-06-09T16:05:00Z", customer: "Juliana Paes", total: 449.90, status: "completed", paymentMethod: "card", items: [{ sku: "JAC-L", qty: 1 }] },
  { id: "s7", storeId: "1", date: "2026-06-08T13:40:00Z", customer: "Roberto Carlos", total: 139.90, status: "refunded", paymentMethod: "pix", items: [{ sku: "GLA-S", qty: 1 }] },
];

export const DELIVERIES = [
  { id: "d1", saleId: "s1", status: "delivered", carrier: "Correios", tracking: "BR123456789BR", cost: 15.50, estimatedDate: "2026-06-15" },
  { id: "d2", saleId: "s2", status: "in_transit", carrier: "Loggi", tracking: "LG987654321", cost: 22.00, estimatedDate: "2026-06-16" },
  { id: "d3", saleId: "s3", status: "delivered", carrier: "Motoboy", tracking: "MT0001", cost: 10.00, estimatedDate: "2026-06-11" },
  { id: "d4", saleId: "s5", status: "separated", carrier: "Correios", tracking: "BR987654321BR", cost: 18.00, estimatedDate: "2026-06-18" },
];

export const BUSINESS_COSTS = [
  { id: "c1", storeId: "1", type: "fixed", description: "Aluguel", amount: 3500.00, month: "2026-06" },
  { id: "c2", storeId: "2", type: "fixed", description: "Aluguel", amount: 4200.00, month: "2026-06" },
  { id: "c3", storeId: "1", type: "variable", description: "Energia", amount: 450.00, month: "2026-06" },
  { id: "c4", storeId: "1", type: "variable", description: "Internet", amount: 150.00, month: "2026-06" },
  { id: "c5", storeId: "2", type: "variable", description: "Energia", amount: 520.00, month: "2026-06" },
  { id: "c6", storeId: "1", type: "variable", description: "Material Limpeza", amount: 120.00, month: "2026-06" },
  { id: "c7", storeId: "2", type: "fixed", description: "Software PDV", amount: 200.00, month: "2026-06" },
];

export const STOCK_FLOW = [
  { id: "sf1", type: "in", date: "2026-06-01", sku: "ADS01", qty: 50, note: "Compra fornecedor XYZ" },
  { id: "sf2", type: "out", date: "2026-06-12", sku: "ADS01", qty: 2, note: "Venda s1" },
  { id: "sf3", type: "in", date: "2026-06-05", sku: "TSH-W", qty: 100, note: "Compra reposição" },
  { id: "sf4", type: "out", date: "2026-06-09", sku: "TSH-W", qty: 1, note: "Venda s5" },
];
