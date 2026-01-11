import { useContext } from "react";
import type { AuthContextData } from "../domain/auth";
import { AuthContext } from "./AuthContext";

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
