import type { User } from "../domain/user";
import { publicApi } from "../api/api";

interface LoginResponse {
  token: string;
  userResponse: User;
}

export async function LoginService(
  name: string,
  password: string
): Promise<LoginResponse> {
  const response = await publicApi.post("auth/login", {
    name,
    password,
  });
  return response.data;
}
