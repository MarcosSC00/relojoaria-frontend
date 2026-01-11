import { createContext } from "react";
import { type AuthContextData } from "../domain/auth";

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);
