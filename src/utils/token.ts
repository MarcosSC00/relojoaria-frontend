let memoryToken: string | null = null;

export function setToken(token: string) {
  memoryToken = token;
  localStorage.setItem("rd:token", token);
}

export function getToken() {
  if (memoryToken) return memoryToken;
  return localStorage.getItem("rd:token");
}

export function clearToken() {
  memoryToken = null;
  localStorage.removeItem("rd:token");
}
