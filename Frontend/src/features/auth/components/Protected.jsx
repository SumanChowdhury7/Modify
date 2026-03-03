import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default Protected;