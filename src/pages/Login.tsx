import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginService } from "../services/loginservice";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
interface LoginSchema {
  name: string;
  password: string;
}
export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const loginSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setLoadingLogin(true);
    try {
      const response = await LoginService(data.name, data.password);
      login(response.token, response.userResponse);
      navigate("/dashboard");
    } catch (error) {
      setLoginError("usuário ou senha inválidos.");
      console.error("erro ao realizar login", error);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 flex self-center justify-center items-center">
      <div
        className="w-[300px] h-[350px] flex border border-gray-300
        rounded-md flex-col items-center p-2 shadow bg-white justify-between"
      >
        <h2 className="text-2xl text-gray-800 font-bold mt-2">Bem-Vindo!</h2>
        <div className="flex flex-col w-full gap-2">
          <form
            onSubmit={handleSubmit(loginSubmit)}
            className="flex flex-col gap-2"
          >
            <label htmlFor="name" className="text-sm font-bold text-gray-700">
              Nome:
            </label>
            <input
              type="text"
              placeholder="insira seu nome"
              id="name"
              {...register("name", { required: "nome é obrigatório" })}
              className="outline-none rounded-sm border border-gray-200 p-1 text-gray-600"
            />
            {errors.name?.message && (
              <span className="text-red-500 text-xs">
                {errors.name?.message}
              </span>
            )}
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-700"
            >
              Senha:
            </label>
            <input
              type="password"
              placeholder="senha"
              id="password"
              {...register("password", { required: "senha é obrigatório" })}
              className="outline-none rounded-sm border border-gray-200 p-1 text-gray-600"
            />
            {errors.password?.message && (
              <span className="text-red-500 text-xs">
                {errors.password?.message}
              </span>
            )}

            {loginError && (
              <span className="text-red-500 text-xs">{loginError}</span>
            )}
            <button
              type="submit"
              disabled={loadingLogin}
              className={`px-4 mb-3 rounded-md font-semibold  text-gray-50
            cursor-pointer transition-colors duration-150 
            ${
              loadingLogin
                ? "bg-blue-950 text-gray-400"
                : "bg-blue-800 hover:bg-blue-900 "
            }`}
            >
              {loadingLogin ? "ENTRANDO..." : "ENTRAR"}
            </button>
          </form>
        </div>
        <p className="text-sm">
          Esqueceu sua senha?
          <button className="text-blue-500 cursor-pointer">clique aqui.</button>
        </p>
      </div>
    </div>
  );
}
