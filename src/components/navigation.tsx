import { NavLink } from "react-router-dom";

export function Navigation() {
  return (
    <div className="px-6 py-4 w-full bg-white border-b border-gray-200">
      <nav>
        <ul className="flex w-full text-right gap-8 text-sm font-semibold text-gray-400">
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
        </ul>
      </nav>
    </div>
  );
}
