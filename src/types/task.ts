import type { MaterialUsageRequest, MaterialUsageResponse } from "./materialusagerequest";
import type { SubTaskRequest, SubTaskResponse } from "./subtask";

export interface TaskRequest {
    clientName: string;
    title: string;
    description: string;
    status: string;
    addValue?: number;
    type: string;
    items: MaterialUsageRequest[];
    endDate: string;
    subServices: SubTaskRequest[] | null;
}

export interface TaskResponse {
    id: number;
    clientId: number;
    clientName: string;
    title: string;
    description: string;
    status: string;
    addValue: number;
    subServicesPrice: any;
    type: string;
    items: MaterialUsageResponse[];
    subServices: SubTaskResponse[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    endDate: string;
}

export interface TaskCustom {
    id: number;
    title: string;
    qtdProductUsed: number;
    totalProductPrice: number;
    amountService: number;
}

export interface ClientTask {
    serviceId: number;
    title: string;
    totalPrice: number; 
}