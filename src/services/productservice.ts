import { api } from "../api/api";
import type { ProductRequest, ProductResponse } from "../types/product";
import type { ProductAnalysis } from "../types/product-analysis";

export async function createProduct(data: ProductRequest): Promise<ProductResponse> {
  const response = await api.post("api/product", data);
  return response.data;
}

export async function updateProduct(name: string, data: ProductRequest): Promise<ProductResponse>{
  const response = await api.put(`api/product/${name}`, data);
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

export async function deleteProduct(name: string): Promise<void> {
  await api.delete(`api/product/${name}`);
}

export async function getProductAnalysis(productName: string): Promise<ProductAnalysis>{
    const response = await api.get(`api/product/analysis/${productName}`);
    return response.data;
}

export async function getJustNameProducts(): Promise<any[]> {
  const response = await api.get(`api/product/get-just-name`);
  return response.data;
}
