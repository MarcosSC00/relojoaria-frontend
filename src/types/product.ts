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