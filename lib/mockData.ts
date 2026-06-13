import { addDays, subDays, subHours } from 'date-fns';

// ─── TYPES ──────────────────────────────────────────────
export interface Product {
  id: string;
  sku: string;
  name: string;
  variation: string;
  pixPrice: number;
  cardPrice: number;
  cost: number;
  stock: number;
  status: 'ok' | 'pendente';
  origin: string;
  lastUpdate: string;
}

export interface SaleItem {
  sku: string;
  name: string;
  qty: number;
  price: number;
  cost: number;
}

export interface Sale {
  id: string;
  customer: string;
  date: string;
  status: 'entregue' | 'em_transito' | 'processando' | 'preparando' | 'cancelado';
  store: string;
  storeId: string;
  paymentMethod: string;
  fee: number;
  total: number;
  netTotal: number;
  productCost: number;
  deliveryCost: number;
  profit: number;
  items: SaleItem[];
}

export interface BusinessCost {
  id: string;
  date: string;
  summary: string;
  category: string;
  type: 'Fixo' | 'Variável';
  store: string;
  storeId: string;
  value: number;
  status: 'pago' | 'vencendo' | 'pendente' | 'em aberto' | 'atrasado' | 'cancelado';
  recurrence: boolean;
}

export interface DeliveryCost {
  id: string;
  order: string;
  saleId: string;
  date: string;
  method: string;
  charged: number;
  realCost: number;
  diff: number;
  status: 'ok' | 'alerta' | 'pendente';
  store: string;
  storeId: string;
}

export interface Delivery {
  id: string;
  customer: string;
  tracking: string;
  carrier: string;
  cost: number;
  deadline: string;
  status: string;
  store: string;
  storeId: string;
}

export interface StockEntry {
  date: string;
  description: string;
  value: number;
  type: 'entrada';
}

export interface StockExit {
  date: string;
  value: number;
  type: 'saida';
}

// ─── STORES ─────────────────────────────────────────────
export const stores = [
  { id: 'all', name: 'Todas as Lojas' },
  { id: 'araguari', name: 'Araguari' },
  { id: 'uberlandia', name: 'Uberlândia' },
];

export const dateFilters = [
  { id: 'hoje', name: 'Hoje' },
  { id: 'semana', name: 'Esta Semana' },
  { id: 'mes_atual', name: 'Mês Atual' },
  { id: 'mes_anterior', name: 'Mês Anterior' },
  { id: 'personalizado', name: 'Personalizado...' },
];

// ─── PRODUCTS (20 produtos) ──────────────────────────────
export const mockProducts: Product[] = [
  { id: '1', sku: 'ADS01', name: 'Camiseta Classic', variation: 'Preta / M', pixPrice: 89.90, cardPrice: 99.90, cost: 45.50, stock: 120, status: 'ok', origin: 'Araguari / Manual', lastUpdate: 'Hoje, 09:30' },
  { id: '2', sku: 'ADS02', name: 'Camiseta Classic', variation: 'Branca / G', pixPrice: 89.90, cardPrice: 99.90, cost: 45.50, stock: 85, status: 'ok', origin: 'Sistema / XLSX', lastUpdate: 'Ontem' },
  { id: '3', sku: 'CON07', name: 'Conjunto Inverno 07', variation: 'Único', pixPrice: 250.00, cardPrice: 280.00, cost: 0, stock: 30, status: 'pendente', origin: 'Importação Pendente', lastUpdate: '3 dias atrás' },
  { id: '4', sku: 'Verde P RAYSSA', name: 'Vestido Rayssa', variation: 'Verde / P', pixPrice: 199.00, cardPrice: 220.00, cost: 0, stock: 12, status: 'pendente', origin: 'Sistema / CSV', lastUpdate: '1 semana atrás' },
  { id: '5', sku: 'Creme PRT50', name: 'Calça Premium', variation: 'Creme / 40', pixPrice: 320.00, cardPrice: 350.00, cost: 110.00, stock: 45, status: 'ok', origin: 'Araguari / Manual', lastUpdate: 'Mês passado' },
  { id: '6', sku: 'ADS03', name: 'Camiseta Oversized', variation: 'Preta / GG', pixPrice: 109.90, cardPrice: 119.90, cost: 52.00, stock: 67, status: 'ok', origin: 'Uberlândia / XLSX', lastUpdate: 'Hoje' },
  { id: '7', sku: 'MOL01', name: 'Moletom Canguru', variation: 'Cinza / M', pixPrice: 189.90, cardPrice: 209.90, cost: 78.00, stock: 34, status: 'ok', origin: 'Araguari / Manual', lastUpdate: '2 dias atrás' },
  { id: '8', sku: 'CON08', name: 'Conjunto Verão 08', variation: 'Rosa / P', pixPrice: 220.00, cardPrice: 245.00, cost: 95.00, stock: 18, status: 'ok', origin: 'Sistema / XLSX', lastUpdate: 'Ontem' },
  { id: '9', sku: 'JAC01', name: 'Jaqueta Corta Vento', variation: 'Preto / G', pixPrice: 250.00, cardPrice: 280.00, cost: 120.00, stock: 22, status: 'ok', origin: 'Araguari / Manual', lastUpdate: '5 dias atrás' },
  { id: '10', sku: 'BON01', name: 'Boné Snapback', variation: 'Preto', pixPrice: 59.90, cardPrice: 69.90, cost: 22.00, stock: 90, status: 'ok', origin: 'Uberlândia / XLSX', lastUpdate: 'Hoje' },
  { id: '11', sku: 'TSH01', name: 'T-Shirt Básica', variation: 'Branca / M', pixPrice: 69.90, cardPrice: 79.90, cost: 28.00, stock: 150, status: 'ok', origin: 'Sistema / CSV', lastUpdate: 'Ontem' },
  { id: '12', sku: 'CAL01', name: 'Calça Alfaiataria', variation: 'Preta / 42', pixPrice: 280.00, cardPrice: 310.00, cost: 98.00, stock: 28, status: 'ok', origin: 'Araguari / Manual', lastUpdate: '3 dias atrás' },
  { id: '13', sku: 'VER01', name: 'Vestido Longo', variation: 'Azul / M', pixPrice: 210.00, cardPrice: 235.00, cost: 0, stock: 15, status: 'pendente', origin: 'Importação Pendente', lastUpdate: '1 semana atrás' },
  { id: '14', sku: 'ACS01', name: 'Cinto Couro', variation: 'Marrom', pixPrice: 89.90, cardPrice: 99.90, cost: 35.00, stock: 40, status: 'ok', origin: 'Uberlândia / Manual', lastUpdate: '4 dias atrás' },
  { id: '15', sku: 'MOL02', name: 'Moletom Zipado', variation: 'Preto / G', pixPrice: 199.90, cardPrice: 219.90, cost: 85.00, stock: 25, status: 'ok', origin: 'Araguari / XLSX', lastUpdate: 'Hoje' },
  { id: '16', sku: 'SAI01', name: 'Saia Midi', variation: 'Bege / M', pixPrice: 150.00, cardPrice: 170.00, cost: 55.00, stock: 32, status: 'ok', origin: 'Sistema / CSV', lastUpdate: 'Ontem' },
  { id: '17', sku: 'CON09', name: 'Conjunto Fitness', variation: 'Preto / P', pixPrice: 180.00, cardPrice: 200.00, cost: 0, stock: 0, status: 'pendente', origin: 'Importação Pendente', lastUpdate: '2 semanas' },
  { id: '18', sku: 'TEN01', name: 'Tênis Casual', variation: 'Branco / 40', pixPrice: 220.00, cardPrice: 250.00, cost: 110.00, stock: 19, status: 'ok', origin: 'Uberlândia / XLSX', lastUpdate: '3 dias atrás' },
  { id: '19', sku: 'GPS01', name: 'Polo Essentials', variation: 'Azul / G', pixPrice: 119.90, cardPrice: 129.90, cost: 48.00, stock: 55, status: 'ok', origin: 'Araguari / Manual', lastUpdate: 'Hoje' },
  { id: '20', sku: 'CAL02', name: 'Calça Jogger', variation: 'Cinza / M', pixPrice: 160.00, cardPrice: 180.00, cost: 65.00, stock: 38, status: 'ok', origin: 'Sistema / XLSX', lastUpdate: 'Ontem' },
];

// ─── SALES (50 vendas geradas) ──────────────────────────
function generateSales(): Sale[] {
  const customers = [
    'João Silva', 'Maria Oliveira', 'Carlos Mendes', 'Ana Julia', 'Pedro Santos',
    'Lucia Ferreira', 'Roberto Lima', 'Fernanda Alves', 'Marcos Oliveira', 'Patricia Souza',
    'Thiago Costa', 'Amanda Ribeiro', 'Bruno Martins', 'Camila Souza', 'Diego Fernandes',
    'Elaine Barbosa', 'Felipe Araújo', 'Giulia Mendonça', 'Hugo Nascimento', 'Isabela Castro'
  ];
  const statuses: Sale['status'][] = ['entregue', 'entregue', 'entregue', 'em_transito', 'em_transito', 'processando', 'preparando', 'cancelado'];
  const stores = [
    { id: 'araguari', name: 'Araguari' },
    { id: 'uberlandia', name: 'Uberlândia' },
  ];
  const methods = ['Pix', 'Cartão', 'Cartão 3x', 'Cartão 2x', 'Dinheiro'];
  const fees: Record<string, number> = { 'Pix': 0, 'Cartão': 1.99, 'Cartão 3x': 3.8, 'Cartão 2x': 2.5, 'Dinheiro': 0 };

  const sales: Sale[] = [];

  for (let i = 1; i <= 50; i++) {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const day = Math.floor(Math.random() * 13) + 1;
    const hour = Math.floor(Math.random() * 12) + 8;
    const minute = Math.floor(Math.random() * 60);
    const date = `2026-06-${day.toString().padStart(2, '0')}T${hour}:${minute.toString().padStart(2, '0')}:00Z`;
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const feePercent = fees[method];

    const numItems = Math.floor(Math.random() * 3) + 1;
    const items: SaleItem[] = [];
    let total = 0;
    let productCost = 0;

    for (let j = 0; j < numItems; j++) {
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const qty = Math.floor(Math.random() * 2) + 1;
      const price = method.includes('Pix') ? product.pixPrice : product.cardPrice;
      items.push({ sku: product.sku, name: product.name, qty, price, cost: product.cost });
      total += price * qty;
      productCost += product.cost * qty;
    }

    const fee = total * (feePercent / 100);
    const netTotal = total - fee;
    const deliveryCost = Math.random() > 0.3 ? Math.floor(Math.random() * 25) + 10 : 0;
    const profit = netTotal - productCost - deliveryCost;

    sales.push({
      id: `PED-${1050 + i}`,
      customer,
      date,
      status,
      store: store.name,
      storeId: store.id,
      paymentMethod: method,
      fee,
      total,
      netTotal,
      productCost,
      deliveryCost,
      profit,
      items,
    });
  }

  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const mockSales: Sale[] = generateSales();

// ─── BUSINESS COSTS (25 custos) ─────────────────────────
export const mockBusinessCosts: BusinessCost[] = [
  { id: '1', date: addDays(new Date(), 2).toISOString(), summary: 'Aluguel Loja Araguari', category: 'Infraestrutura', type: 'Fixo', store: 'Araguari', storeId: 'araguari', value: 4500.00, status: 'vencendo', recurrence: true },
  { id: '2', date: subDays(new Date(), 3).toISOString(), summary: 'Conta de Energia', category: 'Infraestrutura', type: 'Fixo', store: 'Uberlândia', storeId: 'uberlandia', value: 850.00, status: 'pago', recurrence: true },
  { id: '3', date: addDays(new Date(), 5).toISOString(), summary: 'Embalagens G', category: 'Insumos', type: 'Variável', store: 'Todas', storeId: 'all', value: 1200.00, status: 'vencendo', recurrence: false },
  { id: '4', date: addDays(new Date(), 10).toISOString(), summary: 'Marketing / Meta Ads', category: 'Marketing', type: 'Variável', store: 'Todas', storeId: 'all', value: 5000.00, status: 'pendente', recurrence: true },
  { id: '5', date: subDays(new Date(), 1).toISOString(), summary: 'Aluguel Loja Uberlândia', category: 'Infraestrutura', type: 'Fixo', store: 'Uberlândia', storeId: 'uberlandia', value: 5200.00, status: 'pago', recurrence: true },
  { id: '6', date: addDays(new Date(), 3).toISOString(), summary: 'Salário Atendente', category: 'Equipe e RH', type: 'Fixo', store: 'Araguari', storeId: 'araguari', value: 1800.00, status: 'vencendo', recurrence: true },
  { id: '7', date: addDays(new Date(), 3).toISOString(), summary: 'Salário Vendedor', category: 'Equipe e RH', type: 'Fixo', store: 'Uberlândia', storeId: 'uberlandia', value: 2000.00, status: 'vencendo', recurrence: true },
  { id: '8', date: subDays(new Date(), 5).toISOString(), summary: 'Internet Fibra', category: 'Sistemas', type: 'Fixo', store: 'Araguari', storeId: 'araguari', value: 150.00, status: 'pago', recurrence: true },
  { id: '9', date: subDays(new Date(), 5).toISOString(), summary: 'Internet Fibra', category: 'Sistemas', type: 'Fixo', store: 'Uberlândia', storeId: 'uberlandia', value: 150.00, status: 'pago', recurrence: true },
  { id: '10', date: addDays(new Date(), 8).toISOString(), summary: 'IPTU Trimestral', category: 'Infraestrutura', type: 'Fixo', store: 'Araguari', storeId: 'araguari', value: 850.00, status: 'pendente', recurrence: true },
  { id: '11', date: addDays(new Date(), 12).toISOString(), summary: 'Manutenção Ar-Condicionado', category: 'Manutenção', type: 'Variável', store: 'Araguari', storeId: 'araguari', value: 180.00, status: 'pendente', recurrence: false },
  { id: '12', date: subDays(new Date(), 7).toISOString(), summary: 'Assinatura PDV', category: 'Sistemas', type: 'Fixo', store: 'Todas', storeId: 'all', value: 89.00, status: 'pago', recurrence: true },
  { id: '13', date: addDays(new Date(), 15).toISOString(), summary: 'Conta de Água', category: 'Infraestrutura', type: 'Variável', store: 'Araguari', storeId: 'araguari', value: 95.00, status: 'pendente', recurrence: true },
  { id: '14', date: addDays(new Date(), 15).toISOString(), summary: 'Conta de Água', category: 'Infraestrutura', type: 'Variável', store: 'Uberlândia', storeId: 'uberlandia', value: 110.00, status: 'pendente', recurrence: true },
  { id: '15', date: subDays(new Date(), 2).toISOString(), summary: 'Material de Limpeza', category: 'Manutenção', type: 'Variável', store: 'Todas', storeId: 'all', value: 250.00, status: 'pago', recurrence: false },
  { id: '16', date: subDays(new Date(), 10).toISOString(), summary: 'Compra Estoque Camisetas', category: 'Insumos', type: 'Variável', store: 'Araguari', storeId: 'araguari', value: 8500.00, status: 'pago', recurrence: false },
  { id: '17', date: subDays(new Date(), 8).toISOString(), summary: 'Compra Estoque Calças', category: 'Insumos', type: 'Variável', store: 'Uberlândia', storeId: 'uberlandia', value: 6200.00, status: 'pago', recurrence: false },
  { id: '18', date: subDays(new Date(), 4).toISOString(), summary: 'Frete Fornecedor', category: 'Insumos', type: 'Variável', store: 'Todas', storeId: 'all', value: 1350.00, status: 'pago', recurrence: false },
  { id: '19', date: addDays(new Date(), 6).toISOString(), summary: 'Condomínio Galpão', category: 'Infraestrutura', type: 'Fixo', store: 'Araguari', storeId: 'araguari', value: 450.00, status: 'atrasado', recurrence: true },
  { id: '20', date: addDays(new Date(), 6).toISOString(), summary: 'Condomínio Galpão', category: 'Infraestrutura', type: 'Fixo', store: 'Uberlândia', storeId: 'uberlandia', value: 520.00, status: 'vencendo', recurrence: true },
  { id: '21', date: addDays(new Date(), 20).toISOString(), summary: 'Plano Celular Loja', category: 'Sistemas', type: 'Fixo', store: 'Araguari', storeId: 'araguari', value: 79.00, status: 'pendente', recurrence: true },
  { id: '22', date: addDays(new Date(), 20).toISOString(), summary: 'Plano Celular Loja', category: 'Sistemas', type: 'Fixo', store: 'Uberlândia', storeId: 'uberlandia', value: 79.00, status: 'pendente', recurrence: true },
  { id: '23', date: subDays(new Date(), 6).toISOString(), summary: 'Conserto Vidraça', category: 'Manutenção', type: 'Variável', store: 'Araguari', storeId: 'araguari', value: 280.00, status: 'pago', recurrence: false },
  { id: '24', date: addDays(new Date(), 4).toISOString(), summary: 'Instagram Ads', category: 'Marketing', type: 'Variável', store: 'Uberlândia', storeId: 'uberlandia', value: 350.00, status: 'vencendo', recurrence: true },
  { id: '25', date: subDays(new Date(), 9).toISOString(), summary: 'Software Gestão', category: 'Sistemas', type: 'Fixo', store: 'Todas', storeId: 'all', value: 49.00, status: 'pago', recurrence: true },
];

// ─── DELIVERY COSTS (30 entregas) ───────────────────────
function generateDeliveryCosts(): DeliveryCost[] {
  const methods = ['Motoboy Lógico', 'Correios SEDEX', 'Motoboy Terceiro', 'Retirada', 'Transportadora'];
  const stores = [
    { id: 'araguari', name: 'Araguari' },
    { id: 'uberlandia', name: 'Uberlândia' },
  ];
  const costs: DeliveryCost[] = [];

  for (let i = 1; i <= 30; i++) {
    const store = stores[Math.floor(Math.random() * stores.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const charged = method === 'Retirada' ? 0 : Math.floor(Math.random() * 25) + 10;
    const realCost = method === 'Retirada' ? 0 : Math.floor(Math.random() * 35) + 10;
    const status = realCost === 0 && method !== 'Retirada' ? 'pendente' : (realCost > charged ? 'alerta' : 'ok');

    costs.push({
      id: `dc${i}`,
      order: `PED-${1050 + i}`,
      saleId: `s${i}`,
      date: subDays(new Date(), Math.floor(Math.random() * 10)).toISOString(),
      method,
      charged,
      realCost,
      diff: charged - realCost,
      status: status as 'ok' | 'alerta' | 'pendente',
      store: store.name,
      storeId: store.id,
    });
  }
  return costs;
}

export const mockDeliveryCosts: DeliveryCost[] = generateDeliveryCosts();

// ─── DELIVERIES (10 entregas) ───────────────────────────
export const mockDeliveries: Delivery[] = [
  { id: 'PED-1092', customer: 'João Silva', tracking: 'MB-493', carrier: 'Motoboy Zé', cost: 15.00, deadline: 'Hoje', status: 'entregue', store: 'Araguari', storeId: 'araguari' },
  { id: 'PED-1093', customer: 'Maria Oliveira', tracking: 'PQ123456789BR', carrier: 'Correios', cost: 35.00, deadline: 'Amanhã', status: 'em_transito', store: 'Uberlândia', storeId: 'uberlandia' },
  { id: 'PED-1094', customer: 'Carlos Mendes', tracking: 'LG987654321', carrier: 'Loggi', cost: 28.00, deadline: '2 dias', status: 'em_transito', store: 'Todas', storeId: 'all' },
  { id: 'PED-1095', customer: 'Ana Julia', tracking: 'MB-495', carrier: 'Motoboy (A Definir)', cost: 0, deadline: 'Hoje', status: 'preparando', store: 'Araguari', storeId: 'araguari' },
  { id: 'PED-1096', customer: 'Pedro Santos', tracking: 'JD111222333', carrier: 'Jadlog', cost: 22.00, deadline: '3 dias', status: 'processando', store: 'Uberlândia', storeId: 'uberlandia' },
  { id: 'PED-1097', customer: 'Lucia Ferreira', tracking: 'MB-501', carrier: 'Motoboy Zé', cost: 18.00, deadline: 'Hoje', status: 'entregue', store: 'Araguari', storeId: 'araguari' },
  { id: 'PED-1098', customer: 'Roberto Lima', tracking: 'PQ987654321BR', carrier: 'Correios', cost: 42.00, deadline: 'Amanhã', status: 'em_transito', store: 'Uberlândia', storeId: 'uberlandia' },
  { id: 'PED-1099', customer: 'Fernanda Alves', tracking: 'TE444555666', carrier: 'Total Express', cost: 32.00, deadline: '2 dias', status: 'processando', store: 'Araguari', storeId: 'araguari' },
  { id: 'PED-1100', customer: 'Marcos Oliveira', tracking: 'MB-510', carrier: 'Motoboy Zé', cost: 12.00, deadline: 'Hoje', status: 'entregue', store: 'Uberlândia', storeId: 'uberlandia' },
  { id: 'PED-1101', customer: 'Patricia Souza', tracking: 'PQ111222333BR', carrier: 'Correios', cost: 38.00, deadline: '3 dias', status: 'preparando', store: 'Araguari', storeId: 'araguari' },
];

// ─── MOCK DASHBOARD DATA ────────────────────────────────
const totalFaturamento = mockSales.reduce((a, s) => a + s.total, 0);
const totalReceitaLiquida = mockSales.reduce((a, s) => a + s.netTotal, 0);
const totalCustoProdutos = mockSales.reduce((a, s) => a + s.productCost, 0);
const totalCustosFixos = mockBusinessCosts.filter(c => c.type === 'Fixo' && c.status !== 'cancelado').reduce((a, c) => a + c.value, 0);
const totalCustosVariaveis = mockBusinessCosts.filter(c => c.type === 'Variável' && c.status !== 'cancelado').reduce((a, c) => a + c.value, 0);
const totalCustoEntrega = mockDeliveryCosts.reduce((a, d) => a + d.realCost, 0);
const totalLucro = totalReceitaLiquida - totalCustoProdutos - totalCustosFixos - totalCustosVariaveis - totalCustoEntrega;

export const mockDashboardData = {
  faturamentoDia: mockSales.filter(s => {
    const d = new Date(s.date);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).reduce((a, s) => a + s.total, 0),
  faturamentoMes: totalFaturamento,
  receitaLiquida: totalReceitaLiquida,
  custosFixos: totalCustosFixos,
  custosVariaveis: totalCustosVariaveis,
  custoEntrega: totalCustoEntrega,
  custoProdutosVendidos: totalCustoProdutos,
  saidaProduto: mockSales.reduce((a, s) => a + s.items.reduce((b, i) => b + i.qty, 0), 0),
  compraEstoque: 35000.00,
  fluxoEstoqueStatus: 'Atenção em Uberlândia',
  previsaoFaturamento: totalFaturamento * 1.2,
  lucro: totalLucro,
};

export const mockGoals = [
  { name: 'Receita Líquida Mensal', current: mockDashboardData.receitaLiquida, target: 145000 },
  { name: 'Custos Fixos', current: mockDashboardData.custosFixos, target: 12350 },
  { name: 'CMV Mensal', current: mockDashboardData.custoProdutosVendidos, target: 48000 },
  { name: 'Envios Realizados', current: mockDeliveries.length, target: 3500 },
];

// ─── MOCK CHART DATA ────────────────────────────────────
export const mockChartData = [
  { day: '08/06', faturamento: 8200, cmv: 3100, lucro: 5100 },
  { day: '09/06', faturamento: 9800, cmv: 3800, lucro: 6000 },
  { day: '10/06', faturamento: 7500, cmv: 2900, lucro: 4600 },
  { day: '11/06', faturamento: 12400, cmv: 4700, lucro: 7700 },
  { day: '12/06', faturamento: 10800, cmv: 4100, lucro: 6700 },
  { day: '13/06', faturamento: 6200, cmv: 2400, lucro: 3800 },
  { day: '14/06', faturamento: 0, cmv: 0, lucro: 0 },
];

// ─── MOCK STOCK FLOW ────────────────────────────────────
export const mockStockFlow = {
  comprasMes: 35000.00,
  custoSaida: totalCustoProdutos,
  necessidadeReposicao: Math.max(0, totalCustoProdutos - 35000),
  saldoFluxo: 35000 - totalCustoProdutos,
  entries: [
    { date: subDays(new Date(), 5).toISOString(), description: 'Lote Verão #01', value: 15000.00, type: 'entrada' as const },
    { date: subDays(new Date(), 12).toISOString(), description: 'Lote Básico #04', value: 20000.00, type: 'entrada' as const },
  ],
  exits: Array.from({ length: 7 }, (_, i) => ({
    date: subDays(new Date(), i).toISOString(),
    value: Math.floor(Math.random() * 5000) + 2000,
    type: 'saida' as const,
  })),
};

// ─── MOCK USERS ─────────────────────────────────────────
export const mockUsers = [
  { id: '1', name: 'Arthur Alves', email: 'arthur@santabronx.com', role: 'Admin', status: 'online' },
  { id: '2', name: 'Funcionário Araguari', email: 'func1@santabronx.com', role: 'Operador', status: 'offline' },
  { id: '3', name: 'Funcionário Uberlândia', email: 'func2@santabronx.com', role: 'Operador', status: 'offline' },
];

// ─── FILTER HELPERS ─────────────────────────────────────
export function filterByStore<T extends { storeId?: string }>(data: T[], storeId: string): T[] {
  if (storeId === 'all') return data;
  return data.filter(item => item.storeId === storeId);
}

export function filterByDate<T extends { date: string }>(data: T[], from: string, to: string): T[] {
  if (!from || !to) return data;
  return data.filter(item => {
    const d = new Date(item.date);
    return d >= new Date(from) && d <= new Date(to);
  });
}
