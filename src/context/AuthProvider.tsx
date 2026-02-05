import React, { useEffect, useState } from "react";
import { type User } from "../types/user";
import { AuthContext } from "./AuthContext";
import { setToken, clearAuth, setUser } from "../utils/token";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("rd:user");
    if(storedUser){
      setUserAuth(JSON.parse(storedUser))
    }
    setloading(false)
  }, [])

  function login(token: string, user: User) {
    setToken(token);
    setUser(user);
    setUserAuth(user);
  }
  function logout() {
    clearAuth();
    setUserAuth(null);
  }
  function  hasProfile(profile: string) {
    return userAuth?.role?.includes(profile) ?? false;
  
  }
  return (
    <AuthContext.Provider value={{ userAuth, login, logout, hasProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
