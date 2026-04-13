import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function NotFound() {
  const { userAuth } = useAuth();
  const hasProfile = userAuth?.role.includes("ADMIN");
  return (
    <div className="flex flex-col h-screen justify-center text-center items-center">
      <h1 className="text-5xl font-black text-gray-700">404</h1>
      <span className="text-gray-600 text-sm">Página Não Encontrada</span>
      <p className="text-sm">Ops! A página que você procura não existe.</p>
      <Link
        to={hasProfile ? "/dashboard" : "/"}
        replace={false}
        className="px-4 rounded-md bg-blue-900 mt-2 text-gray-100
                font-semibold text-sm w-fit hover:bg-blue-950"
      >
        Início
      </Link>
    </div>
  );
}
