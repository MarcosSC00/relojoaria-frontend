import React, { useState } from "react";
import { type User } from "../domain/user";
import { AuthContext } from "./AuthContext";
import { setToken, clearToken } from "../utils/token";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  function login(token: string, user: User) {
    setToken(token);
    setUser(user);
  }
  function logout() {
    clearToken();
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
