import { Navigate } from "react-router-dom";
import { useAppContext } from "../store/AppContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAppContext();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
