import { type User } from "./user";

export interface AuthContextData {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}
