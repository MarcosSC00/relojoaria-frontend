import { api } from "../api/api";
import type { Client } from "../types/client";
import type { ClientTask } from "../types/task";

export async function createClient(
    name: string,
    phone: string,
): Promise<Client> {
    const response = await api.post("api/clients",{
        name,
        phone
    })
    return response.data;
}

export async function updateClient(
    id: number,
    data: {name:string, phone: string}
): Promise<Client> {
    const response = await api.put(`api/clients/${id}`, data)
    return response.data
}

export async function getClientById(id: number): Promise<Client> {
    const response = await api.get(`api/clients/${id}`);
    return response.data;
}

export async function getClients(): Promise<Client[]> {
    const response = await api.get("api/clients")
    return response.data;
}

export async function deleteClient(id: number): Promise<void> {
    await api.delete(`api/clients/${id}`)
}

export async function getAllClientNames(): Promise<String[]> {
    const response = await api.get("api/clients/get-all-names");
    return response.data;
}

export async function getClientServices(id: number): Promise<ClientTask[]> {
    const response = await api.get(`api/clients/get-clients-with-services/${id}`);
    return response.data;
}