import type { ClientTask } from "./task";

export interface Client {
  id: number;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientWithServices {
  id: number;
  name: string;
  phone: string;
  createdAt: string;
  services: ClientTask[];
}