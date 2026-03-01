export interface MaterialUsageRequest{
    productName: string;
    quantityUsed: number | null;
}

export interface MaterialUsageResponse{
    id: number;
    productName: string;
    unit: string;
    productPrice: number;
    quantityUsed: number;
    subTotal: number;
}