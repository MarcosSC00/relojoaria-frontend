import { api } from "../api/api";
import type { Product } from "../domain/product";

export async function createProduct(
  name: string,
  unit: string,
  price: number
): Promise<Product> {
  const response = await api.post("api/product", {
    name,
    unit,
    price,
  });
  console.log("response do service" + response.data);
  return response.data;
}
export async function getProducts(): Promise<Product[]> {
  const response = await api.get("api/product");
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get(`api/product/${id}`);
  return response.data;
}

export async function deleteProduct(name: string) {
  await api.delete(`api/product/${name}`);
}
