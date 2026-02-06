import { api } from "../api/api";
import type { ProductRequest, ProductResponse } from "../types/product";

export async function createProduct(data: ProductRequest): Promise<ProductResponse> {
  const response = await api.post("api/product", data);
  console.log("response do service" + response.data);
  return response.data;
}
export async function getProducts(): Promise<ProductResponse[]> {
  const response = await api.get("api/product");
  return response.data;
}

export async function getProductById(id: number): Promise<ProductResponse> {
  const response = await api.get(`api/product/${id}`);
  return response.data;
}

export async function deleteProduct(name: string) {
  await api.delete(`api/product/${name}`);
}
