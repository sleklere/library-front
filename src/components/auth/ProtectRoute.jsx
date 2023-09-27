import { Navigate } from "react-router-dom";
import { getAuthToken } from "./AuthVerify";

function ProtectRoute({ children }) {
  const token = getAuthToken();

  if (!token) {
    // for some reason, useNavigate briefly shows the protected path's page before navigating
    return <Navigate to={"/login"} replace />;
  }
  return children;
}

export default ProtectRoute;
