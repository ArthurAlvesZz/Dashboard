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

// Funcao para gerar vendas mockadas
export function generateMockSales(count: number) {
  const statuses = ['entregue', 'em_transito', 'processando', 'cancelado'] as const;
  const stores = ['Araguari', 'Uberlândia'];
  const methods = ['Pix', 'Cartão 1x', 'Cartão 3x', 'Dinheiro'];
  const customers = ['João Silva', 'Maria Oliveira', 'Carlos Mendes', 'Ana Clara', 'Pedro Santos', 'Lucia Ferreira', 'Ricardo Alves', 'Fernanda Costa', 'Bruno Lima', 'Camila Souza'];
  
  return Array.from({ length: count }, (_, i) => {
    const status = statuses[i % statuses.length];
    const total = Math.floor(Math.random() * 500) + 50;
    const fee = total * (Math.random() * 0.05);
    const productCost = total * (Math.random() * 0.4 + 0.2);
    const deliveryCost = Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 10 : 0;
    
    return {
      id: `PED-${1092 + i}`,
      customer: customers[i % customers.length],
      date: subDays(new Date(), i % 30).toISOString(),
      status,
      store: stores[i % stores.length],
      storeId: stores[i % stores.length].toLowerCase().replace('ê', 'e').replace('â', 'a'), // Simple hack for storeId
      paymentMethod: methods[i % methods.length],
      fee: Math.round(fee * 100) / 100,
      total,
      netTotal: Math.round((total - fee) * 100) / 100,
      productCost: Math.round(productCost * 100) / 100,
      deliveryCost,
      profit: Math.round((total - fee - productCost - deliveryCost) * 100) / 100,
      items: [
        { sku: 'ADS01', qty: 1, price: total * 0.6, cost: 45.50 },
        { sku: 'ADS02', qty: 1, price: total * 0.4, cost: 45.50 }
      ]
    };
  });
}

// Funcao para gerar produtos mockados
export function generateMockProducts(count: number): Product[] {
  const names = ['Camiseta Classic', 'Conjunto Inverno', 'Vestido Rayssa', 'Calça Premium', 'Jaqueta Urban', 'Bermuda Sport', 'Moletom Comfort', 'Regata Basic', 'Short Fitness', 'Blusa Cropped'];
  const variations = ['Preta / M', 'Branca / G', 'Verde / P', 'Creme / 40', 'Azul / GG', 'Vermelha / P', 'Cinza / M', 'Rosa / P', 'Preto / G', 'Bege / M'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    sku: `SKU${String(i + 1).padStart(3, '0')}`,
    name: names[i % names.length],
    variation: variations[i % variations.length],
    image: `https://picsum.photos/seed/p${i + 1}/200`,
    pixPrice: Math.floor(Math.random() * 300) + 50,
    cardPrice: Math.floor(Math.random() * 350) + 60,
    cost: Math.random() > 0.2 ? Math.floor(Math.random() * 150) + 20 : 0,
    margin: Math.random() > 0.2 ? `${Math.floor(Math.random() * 40) + 30}%` : '0%',
    origin: i % 3 === 0 ? 'Araguari / Manual' : i % 3 === 1 ? 'Sistema / XLSX' : 'Importação Pendente',
    lastUpdate: i < 3 ? 'Hoje' : i < 6 ? 'Ontem' : '3 dias atrás',
    status: Math.random() > 0.2 ? 'ok' : 'pendente',
    stock: Math.floor(Math.random() * 200) + 10
  }));
}

// Funcao para gerar custos empresa mockados
export function generateMockBusinessCosts(count: number): BusinessCost[] {
  const summaries = ['Aluguel Loja', 'Conta de Energia', 'Embalagens', 'Marketing Meta', 'Salário Equipe', 'Internet/Fibra', 'Manutenção Piso', 'Impostos DAS', 'Água e Saneamento', 'Sistema PDV'];
  const categories = ['Infraestrutura', 'Insumos', 'Marketing', 'Equipe', 'Sistemas', 'Impostos'];
  const types: BusinessCost['type'][] = ['Fixo', 'Variável'];
  const stores = ['Araguari', 'Uberlândia', 'Todas'];
  const statuses: BusinessCost['status'][] = ['pago', 'vencendo', 'pendente', 'atrasado', 'em aberto'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    date: (i % 2 === 0 ? addDays : subDays)(new Date(), Math.floor(Math.random() * 30)).toISOString(),
    summary: summaries[i % summaries.length],
    category: categories[i % categories.length],
    type: types[i % types.length],
    store: stores[i % stores.length],
    storeId: stores[i % stores.length] === 'Todas' ? 'all' : stores[i % stores.length].toLowerCase().replace('ê', 'e').replace('â', 'a'),
    value: Math.floor(Math.random() * 5000) + 200,
    status: statuses[i % statuses.length],
    recurrence: Math.random() > 0.5
  }));
}

// Funcao para gerar entregas mockadas
export function generateMockDeliveries(count: number): DeliveryCost[] {
  const methods = ['Motoboy Lógico', 'Correios SEDEX', 'Retirada', 'Motoboy Terceiro', 'Logística Expressa'];
  const stores = ['Araguari', 'Uberlândia'];
  const statuses: DeliveryCost['status'][] = ['ok', 'alerta', 'pendente'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    order: `PED-${1092 + i}`,
    saleId: `s${i}`,
    date: subDays(new Date(), i % 15).toISOString(),
    method: methods[i % methods.length],
    charged: Math.floor(Math.random() * 40) + 10,
    realCost: Math.floor(Math.random() * 50) + 5,
    diff: Math.floor(Math.random() * 20) - 10,
    status: statuses[i % statuses.length],
    store: stores[i % stores.length],
    storeId: stores[i % stores.length].toLowerCase().replace('ê', 'e').replace('â', 'a')
  }));
}

// Funcao para gerar dados do grafico
export function generateMockChartData(days: number) {
  return Array.from({ length: days }, (_, i) => ({
    name: `${String(i + 1).padStart(2, '0')}/Jun`,
    faturamento: Math.floor(Math.random() * 8000) + 3000,
    cmv: Math.floor(Math.random() * 3000) + 1000,
    lucro: Math.floor(Math.random() * 4000) + 1500
  }));
}

// Atualizar mockProducts existente para ter mais dados
export const mockProducts = [
  { id: '1', sku: 'ADS01', name: 'Camiseta Classic', variation: 'Preta / M', image: 'https://picsum.photos/seed/p1/200', pixPrice: 89.90, cardPrice: 99.90, cost: 45.50, margin: '49%', origin: 'Araguari / Manual', lastUpdate: 'Hoje, 09:30', status: 'ok', stock: 120 },
  { id: '2', sku: 'ADS02', name: 'Camiseta Classic', variation: 'Branca / G', image: 'https://picsum.photos/seed/p2/200', pixPrice: 89.90, cardPrice: 99.90, cost: 45.50, margin: '49%', origin: 'Sistema / XLSX', lastUpdate: 'Ontem', status: 'ok', stock: 85 },
  { id: '3', sku: 'CON07', name: 'Conjunto Inverno 07', variation: 'Único', image: 'https://picsum.photos/seed/p3/200', pixPrice: 250.00, cardPrice: 280.00, cost: 0, margin: '0%', origin: 'Importação Pendente', lastUpdate: '3 dias atrás', status: 'pendente', stock: 30 },
  { id: '4', sku: 'Verde P RAYSSA', name: 'Vestido Rayssa', variation: 'Verde / P', image: 'https://picsum.photos/seed/p4/200', pixPrice: 199.00, cardPrice: 220.00, cost: 0, margin: '0%', origin: 'Sistema / CSV', lastUpdate: '1 semana atrás', status: 'pendente', stock: 12 },
  { id: '5', sku: 'Creme PRT50', name: 'Calça Premium', variation: 'Creme / 40', image: 'https://picsum.photos/seed/p5/200', pixPrice: 320.00, cardPrice: 350.00, cost: 110.00, margin: '65%', origin: 'Araguari / Manual', lastUpdate: 'Mês passado', status: 'ok', stock: 45 },
  ...generateMockProducts(15)
];

// Adicionar mockSales expandido
export const mockSales = generateMockSales(50);

// Adicionar mockBusinessCosts expandido
export const mockBusinessCosts = generateMockBusinessCosts(25);

// Adicionar mockDeliveryCosts expandido
export const mockDeliveryCosts = generateMockDeliveries(30);

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

// Adicionar mockChartData expandido
export const mockChartData = generateMockChartData(14);

// Adicionar mockGoals
export const mockGoals = {
  metaFaturamento: 200000.00,
  faturamentoAtual: 154200.00,
  tetoDespesasFixas: 15000.00,
  despesasFixasAtuais: 12000.00,
  metaLucro: 60000.00,
  lucroAtual: 72300.00,
  capacidadeProdutiva: 5000,
  enviosRealizados: 2250,
};

const totalFaturamento = mockSales.reduce((a, s) => a + s.total, 0);
const totalReceitaLiquida = mockSales.reduce((a, s) => a + s.netTotal, 0);
const totalCustoProdutos = mockSales.reduce((a, s) => a + s.productCost, 0);
const totalCustosFixos = mockBusinessCosts.filter(c => c.type === 'Fixo' && c.status !== 'cancelado').reduce((a, c) => a + c.value, 0);
const totalCustosVariaveis = mockBusinessCosts.filter(c => c.type === 'Variável' && c.status !== 'cancelado').reduce((a, c) => a + c.value, 0);
const totalCustoEntrega = mockDeliveryCosts.reduce((a, d) => a + (d.realCost || 0), 0);
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
