export interface StockResponse {
  id: string;
  productName: string;
  price: number;
  currentQuantity: number;
  unit: string;
  qtdUsed: number;
}

export interface StockRequest {
  productName: string;
  quantity: number;
}

export interface StockCustom{
  id: number;
  taskName: string;
  qtdUsed: number;
  value: number;
}
