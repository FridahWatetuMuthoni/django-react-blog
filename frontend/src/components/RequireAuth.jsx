import UseAuthContext from "../hooks/UseAuthContext";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const { token } = UseAuthContext();
  //getting our current location
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
