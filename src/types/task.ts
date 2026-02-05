export interface TaskRequest {
    id: number;
    clientId: number;
    clientName: string;
    title: string;
    description: string;
    status: string;
    addValue: number;
    subServicesPrice: number;
    type: string;
    items: any;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface TaskResponse {
    id: number;
    clientId: number;
    clientName: string;
    title: string;
    description: string;
    status: string;
    addValue: string;
    subServicesPrice: any;
    type: string;
    items: any;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}