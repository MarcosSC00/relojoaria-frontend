export interface SubTaskRequest {
    title: string;
    description: string;
    price: number;
}

export interface SubTaskForm {
    subtasks: SubTaskRequest[];
}
export interface SubTaskResponse {
    title: string;
    description: string;
}