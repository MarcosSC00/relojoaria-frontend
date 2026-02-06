import { api } from "../api/api";
import type { StockRequest, StockResponse } from "../types/stock";

export async function createStock(data: StockRequest): Promise<StockResponse>{
    const result = await api.post("api/stock", data);
    return result.data;
}

export async function getAllStock(): Promise<StockResponse[]> {
    const result = await api.get("api/stock");
    return result.data;
}

export async function getStockById(id: number): Promise<StockResponse>{
    const result = await api.get(`api/stock/${id}`);
    return result.data;
}

export async function updateStock(id: number, quantity: number): Promise<StockResponse>{
    const result = await api.put(`api/stock/${id}`, quantity);
    return result.data;
}

export async function deleteTask(id: number): Promise<void>{
    await api.delete(`api/stock/${id}`);
}