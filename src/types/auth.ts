import { type User } from "./user";

export interface AuthContextData {
  userAuth: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  hasProfile: (profile: string) => boolean
}
