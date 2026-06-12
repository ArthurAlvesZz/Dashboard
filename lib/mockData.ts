import { addDays, subDays } from 'date-fns';

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

export const mockDashboardData = {
  faturamentoDia: 8450.00,
  faturamentoMes: 154200.00,
  receitaLiquida: 142000.00,
  custosFixos: 12000.00,
  custosVariaveis: 4500.00,
  custoEntrega: 8200.00,
  custoProdutosVendidos: 45000.00,
  saidaProduto: 1240,
  compraEstoque: 35000.00,
  fluxoEstoqueStatus: 'Atenção em Uberlândia',
  previsaoFaturamento: 185000.00,
  lucro: 72300.00,
};

export const mockProducts = [
  { id: '1', sku: 'ADS01', name: 'Camiseta Classic', variation: 'Preta / M', image: 'https://picsum.photos/seed/p1/200', pixPrice: 89.90, cardPrice: 99.90, cost: 45.50, margin: '49%', origin: 'Araguari / Manual', lastUpdate: 'Hoje, 09:30', status: 'ok', stock: 120 },
  { id: '2', sku: 'ADS02', name: 'Camiseta Classic', variation: 'Branca / G', image: 'https://picsum.photos/seed/p2/200', pixPrice: 89.90, cardPrice: 99.90, cost: 45.50, margin: '49%', origin: 'Sistema / XLSX', lastUpdate: 'Ontem', status: 'ok', stock: 85 },
  { id: '3', sku: 'CON07', name: 'Conjunto Inverno 07', variation: 'Único', image: 'https://picsum.photos/seed/p3/200', pixPrice: 250.00, cardPrice: 280.00, cost: 0, margin: '0%', origin: 'Uberlândia / API', lastUpdate: '3 dias atrás', status: 'pendente', stock: 30 },
  { id: '4', sku: 'Verde P RAYSSA', name: 'Vestido Rayssa', variation: 'Verde / P', image: 'https://picsum.photos/seed/p4/200', pixPrice: 199.00, cardPrice: 220.00, cost: 0, margin: '0%', origin: 'Sistema / CSV', lastUpdate: '1 semana atrás', status: 'pendente', stock: 12 },
  { id: '5', sku: 'Creme PRT50', name: 'Calça Premium', variation: 'Creme / 40', image: 'https://picsum.photos/seed/p5/200', pixPrice: 320.00, cardPrice: 350.00, cost: 110.00, margin: '65%', origin: 'Araguari / Manual', lastUpdate: 'Mês passado', status: 'ok', stock: 45 },
];

export const mockSales = [
  { 
    id: 'PED-1092', customer: 'João Silva', date: new Date().toISOString(), status: 'entregue', 
    store: 'Araguari', paymentMethod: 'Pix', fee: 0, total: 250.00, netTotal: 250.00, productCost: 91.00, deliveryCost: 15.00, profit: 144.00,
    items: [
      { sku: 'ADS01', qty: 1, price: 89.90, cost: 45.50 },
      { sku: 'Verde P RAYSSA', qty: 1, price: 160.10, cost: 45.50 } // simulated frozen cost
    ]
  },
  { 
    id: 'PED-1093', customer: 'Maria Oliveira', date: subDays(new Date(), 1).toISOString(), status: 'em_transito', 
    store: 'Uberlândia', paymentMethod: 'Cartão 3x', fee: 12.60, total: 420.00, netTotal: 407.40, productCost: 220.00, deliveryCost: 25.00, profit: 162.40,
    items: [
      { sku: 'Creme PRT50', qty: 1, price: 350.00, cost: 110.00 },
      { sku: 'CON07', qty: 1, price: 70.00, cost: 110.00 }
    ]
  },
  { 
    id: 'PED-1094', customer: 'Carlos Mendes', date: subDays(new Date(), 1).toISOString(), status: 'processando', 
    store: 'Araguari', paymentMethod: 'Pix', fee: 0, total: 110.00, netTotal: 110.00, productCost: 45.50, deliveryCost: 0, profit: 64.50,
    items: [
      { sku: 'ADS02', qty: 1, price: 110.00, cost: 45.50 }
    ]
  },
];

export const mockBusinessCosts = [
  { id: '1', date: addDays(new Date(), 2).toISOString(), summary: 'Aluguel Loja Araguari', category: 'Infraestrutura', type: 'Fixo', store: 'Araguari', value: 4500.00, status: 'vencendo', recurrence: true },
  { id: '2', date: subDays(new Date(), 3).toISOString(), summary: 'Conta de Energia', category: 'Infraestrutura', type: 'Fixo', store: 'Uberlândia', value: 850.00, status: 'pago', recurrence: true },
  { id: '3', date: addDays(new Date(), 5).toISOString(), summary: 'Embalagens G', category: 'Insumos', type: 'Variável', store: 'Todas', value: 1200.00, status: 'vencendo', recurrence: false },
  { id: '4', date: addDays(new Date(), 10).toISOString(), summary: 'Marketing / Meta Ads', category: 'Marketing', type: 'Variável', store: 'Todas', value: 5000.00, status: 'pendente', recurrence: true },
];

export const mockDeliveryCosts = [
  { id: '1', order: 'PED-1092', date: new Date().toISOString(), method: 'Motoboy Lógico', charged: 15.00, realCost: 15.00, diff: 0, status: 'ok', store: 'Araguari' },
  { id: '2', order: 'PED-1093', date: subDays(new Date(), 1).toISOString(), method: 'Correios SEDEX', charged: 25.00, realCost: 35.00, diff: -10.00, status: 'alerta', store: 'Uberlândia' },
  { id: '3', order: 'PED-1094', date: subDays(new Date(), 1).toISOString(), method: 'Retirada', charged: 0, realCost: 0, diff: 0, status: 'ok', store: 'Araguari' },
  { id: '4', order: 'PED-1095', date: subDays(new Date(), 2).toISOString(), method: 'Motoboy Terceiro', charged: 10.00, realCost: 0, diff: 10.00, status: 'pendente', store: 'Araguari' }, // Sem custo preenchido
];

export const mockDeliveries = [
  { id: 'PED-1092', customer: 'João Silva', tracking: 'MB-493', carrier: 'Motoboy Zé', cost: 15.00, deadline: 'Hoje', status: 'entregue' },
  { id: 'PED-1093', customer: 'Maria Oliveira', tracking: 'PQ123456789BR', carrier: 'Correios', cost: 35.00, deadline: 'Amanhã', status: 'em_transito' },
  { id: 'PED-1095', customer: 'Ana Clara', tracking: 'MB-495', carrier: 'Motoboy (A Definir)', cost: 0, deadline: 'Hoje', status: 'preparando' },
];

export const mockStockFlow = {
  comprasMes: 35000.00,
  custoSaida: 45000.00,
  necessidadeReposicao: 12000.00,
  saldoFluxo: -10000.00,
  entries: [
    { date: subDays(new Date(), 5).toISOString(), description: 'Lote Verão #01', value: 15000.00, type: 'entrada' },
    { date: subDays(new Date(), 12).toISOString(), description: 'Lote Básico #04', value: 20000.00, type: 'entrada' },
  ],
  exits: [
    { date: new Date().toISOString(), value: 450.00, type: 'saida' },
    { date: subDays(new Date(), 1).toISOString(), value: 1200.00, type: 'saida' },
    { date: subDays(new Date(), 2).toISOString(), value: 3800.00, type: 'saida' },
  ]
};

export const mockChartData = [
  { name: '01 Jun', faturamento: 4000, lucro: 1200 },
  { name: '03 Jun', faturamento: 5500, lucro: 1800 },
  { name: '05 Jun', faturamento: 3200, lucro: 900 },
  { name: '07 Jun', faturamento: 7800, lucro: 2600 },
  { name: '09 Jun', faturamento: 6500, lucro: 2100 },
  { name: '11 Jun', faturamento: 8400, lucro: 2900 },
  { name: '12 Jun', faturamento: 8450, lucro: 3100 },
];

export const mockUsers = [
  { id: '1', name: 'Arthur Alves', email: 'arthur@santabronx.com', role: 'Administrador', store: 'Todas', lastAccess: 'Agora' },
  { id: '2', name: 'Marina Santos', email: 'marina@santabronx.com', role: 'Gerente', store: 'Uberlândia', lastAccess: 'Há 2h' },
  { id: '3', name: 'Lucas Costa', email: 'lucas.ops@santabronx.com', role: 'Operador', store: 'Araguari', lastAccess: 'Há 5h' },
];

