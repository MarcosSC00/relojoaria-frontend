export interface SubTaskRequest {
    title: string;
    description: string;
    price: number | null;
}

export interface SubTaskForm {
    subtasks: SubTaskRequest[];
}
export interface SubTaskResponse {
    title: string;
    description: string;
    price: number;
}