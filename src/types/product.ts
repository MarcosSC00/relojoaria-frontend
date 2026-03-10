export interface ProductRequest {
  name: string;
  unit: string;
  price: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  unit: string;
  price: number;
}

export interface ProductData {
  name: string;
  quantity: number;
  current_qtd: number;
}