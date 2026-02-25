import type { MaterialUsageRequest } from "./materialusagerequest";

export interface TaskRequest {
    clientName: string;
    title: string;
    description: string;
    status: string;
    addValue?: number;
    type: string;
    items: MaterialUsageRequest[];
    endDate: string;
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
    items: MaterialUsageRequest[];
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