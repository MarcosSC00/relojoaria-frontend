import { createBrowserRouter} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Clients } from "./pages/Clients";
import { Product } from "./pages/Products";
import {ProtectedRoute} from "./components/protectedroutes"
import { Tasks } from "./pages/Tasks";
import { Stock } from "./pages/Stock";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element:
      <ProtectedRoute requiredProfile="ADMIN">
        <Dashboard/>
      </ProtectedRoute>
  },
  {
    path: "/clients",
    element: 
      <ProtectedRoute requiredProfile="ADMIN">
        <Clients/>
      </ProtectedRoute>
    
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute requiredProfile="ADMIN">
        <Product/>
      </ProtectedRoute>
    )
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute requiredProfile="ADMIN">
        <Tasks/>
      </ProtectedRoute>
    )
  },
  {
    path: "/stock/:productName",
    element: (
      <ProtectedRoute requiredProfile="ADMIN">
        <Stock />
      </ProtectedRoute>
    )
  }
]);