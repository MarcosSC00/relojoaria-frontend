import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Navigation } from "./navigation";
import { NavLink } from "react-router";

interface HeaderProps {
  title: string | undefined;
  username?: string | undefined;
}

export function Header({ title, username }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleChangeMenu = () => {
    setOpenMenu(prev => !prev);
  }
  return (
    <div className="bg-white border-b border-gray-200 relative">
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center 
        justify-between
        items-start gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {username && (
              <p className="text-gray-600 mt-2">
                Bem-vindo de volta, {username}!
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <button className="md:hidden" onClick={handleChangeMenu}>
          {openMenu ? (
            <X/>
          ):(
            <MenuIcon />
          )}
        </button>
      </div>
      {openMenu && (
        <div className="px-6 py-4 w-full bg-white border-y 
      border-gray-200 absolute">
          <nav>
            <ul className="flex items-start flex-col md:items-center 
            md:flex-row md:w-full text-right gap-8 text-sm 
            font-semibold text-gray-400">
              <li>
                <NavLink 
                  to="/dashboard"
                  className={({isActive}) => `cursor-pointer transition-colors hover:text-gray-600
                  ${
                    isActive
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                  }`}
                >
                  DASHBOARD
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/clients"
                  className={({isActive}) => `cursor-pointer transition-colors hover:text-gray-600
                  ${
                    isActive
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                  }`}
                >
                  CLIENTES
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/products"
                  className={({isActive}) => `cursor-pointer transition-colors hover:text-gray-600
                  ${
                    isActive
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                  }`}
                >
                  PRODUTOS
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services"
                  className={({isActive}) => `cursor-pointer transition-colors hover:text-gray-600
                  ${
                    isActive
                    ? "border-b-2 border-gray-600 text-gray-600"
                    : ""
                  }`}
                >
                  SERVIÇOS
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
