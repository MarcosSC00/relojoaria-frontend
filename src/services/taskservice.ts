import { api } from "../api/api";
import type { SubTaskRequest, SubTaskResponse } from "../types/subtask";
import type { TaskCustom, TaskRequest, TaskResponse } from "../types/task";

export async function createTask(data: TaskRequest): Promise<TaskResponse>{
    const response = await api.post("api/service-order", data);
    return response.data;
}

export async function getAllTasks(): Promise<TaskResponse[]>{
    const response = await api.get("api/service-order");
    return response.data;
}

export async function getTaskById(id: number): Promise<TaskResponse>{
    const response = await api.get(`api/service-order/${id}`);
    return response.data;
}

export async function updateTask(id: number, data: TaskRequest): Promise<TaskResponse>{
    const result = await api.put(`api/service-order/${id}`, data);
    return result.data;
}

export async function deleteTask(id: number): Promise<void>{
    await api.delete(`api/service-order/${id}`);
}

export async function addSubTask(id: number, data: SubTaskRequest): Promise<SubTaskResponse>{
    const result = await api.post(`api/service-order/${id}/add-subservice`, data);
    return result.data;
}

export async function removeSubTask(idTask: number, idSubTask: number): Promise<void>{
    await api.post(`api/service-order/${idTask}/remove-subservice/${idSubTask}`);
}

export async function getSubTasks(idTask: number): Promise<SubTaskResponse[]>{
    const result = await api.post(`api/service-order/${idTask}/subservices`);
    return result.data;
}

export async function getCustomTasks(productName: string): Promise<TaskCustom[]>{
    const response = await api.get(`api/service-order/custom/${productName}`);
    return response.data;
}