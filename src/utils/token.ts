import type { User } from "../types/user";

let memoryToken: string | null = null;
let memoryUser: User | null = null;

export function setToken(token: string) {
  memoryToken = token;
  localStorage.setItem("rd:token", token);
}

export function setUser(user: User){
  memoryUser = user;
  localStorage.setItem("rd:user", JSON.stringify(user));
}

export function getUser(){
  if(memoryUser) return memoryUser;
  return localStorage.getItem("rd:user");
}

export function getToken() {
  if (memoryToken) return memoryToken;
  return localStorage.getItem("rd:token");
}

export function clearAuth() {
  memoryToken = null;
  memoryUser = null;
  localStorage.removeItem("rd:token");
  localStorage.removeItem("rd:user");
}
