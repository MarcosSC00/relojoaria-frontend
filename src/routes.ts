import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Clients } from "./pages/Clients";
import { CreateService } from "./components/forms/createservice";
import { Product } from "./pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/api",
    children: [
      { path: "clients", Component: Clients },
      { path: "product", Component: Product },
      { path: "forms", Component: CreateService },
      { path: "service-order", Component: Dashboard },
    ],
  },
]);
