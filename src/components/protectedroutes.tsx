import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

interface ProtectedRouteProps{
    children: React.ReactNode
    requiredProfile?: string
}
export function ProtectedRoute({requiredProfile, children}: ProtectedRouteProps){
    const { userAuth, hasProfile, loading } = useAuth();

    if(loading){
        return <h2>carregando...</h2>
    }

    if (!userAuth) {
        return <Navigate to="/" replace />;
    }

    if (requiredProfile && !hasProfile(requiredProfile)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>
};