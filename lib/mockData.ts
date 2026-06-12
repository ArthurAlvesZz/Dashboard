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
  saidaProduto: 1240, // units
  compraEstoque: 35000.00,
  custoProdutosVendidos: 45000.00, // For profit formula
  fluxoEstoqueStatus: 'Saudável',
  previsaoFaturamento: 185000.00,
  previsaoLucro: 0, // Calculated dynamically
};

// Lucro = Receita líquida - custos fixos - custos variáveis - custo com entrega - custo dos produtos vendidos.
mockDashboardData.previsaoLucro = mockDashboardData.receitaLiquida - mockDashboardData.custosFixos - mockDashboardData.custosVariaveis - mockDashboardData.custoEntrega - mockDashboardData.custoProdutosVendidos;


export const mockProducts = [
  { id: '1', sku: 'ADS01', name: 'Camiseta Classic Preta', cost: 45.50, status: 'ok', stock: 120 },
  { id: '2', sku: 'ADS02', name: 'Camiseta Classic Branca', cost: 45.50, status: 'ok', stock: 85 },
  { id: '3', sku: 'CON07', name: 'Conjunto Inverno 07', cost: 0, status: 'pendente', stock: 30 },
  { id: '4', sku: 'Verde P RAYSSA', name: 'Vestido Verde Rayssa P', cost: 0, status: 'pendente', stock: 12 },
  { id: '5', sku: 'Creme PRT50', name: 'Calça Creme Premium (PRT50)', cost: 110.00, status: 'ok', stock: 45 },
];

export const mockRecentOrders = [
  { id: 'PED-1092', customer: 'João Silva', date: '2026-06-12T10:30:00Z', status: 'entregue', total: 250.00, store: 'Araguari' },
  { id: 'PED-1093', customer: 'Maria Oliveira', date: '2026-06-12T11:45:00Z', status: 'em_transito', total: 420.00, store: 'Uberlândia' },
  { id: 'PED-1094', customer: 'Carlos Mendes', date: '2026-06-12T14:10:00Z', status: 'processando', total: 110.00, store: 'Araguari' },
  { id: 'PED-1095', customer: 'Ana Clara', date: '2026-06-12T14:50:00Z', status: 'pagamento_pendente', total: 680.00, store: 'Uberlândia' },
];

export const mockChartData = [
  { name: '01 Jun', faturamento: 4000, lucro: 1200 },
  { name: '03 Jun', faturamento: 5500, lucro: 1800 },
  { name: '05 Jun', faturamento: 3200, lucro: 900 },
  { name: '07 Jun', faturamento: 7800, lucro: 2600 },
  { name: '09 Jun', faturamento: 6500, lucro: 2100 },
  { name: '11 Jun', faturamento: 8400, lucro: 2900 },
  { name: '12 Jun', faturamento: 8450, lucro: 3100 },
];
