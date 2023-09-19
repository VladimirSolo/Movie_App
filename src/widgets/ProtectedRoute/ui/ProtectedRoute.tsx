import { Navigate, Outlet } from "react-router-dom";
import { useTypedSelector } from "app/providers/store/config/hooks";

interface Props {
  isAuthenticated: boolean;
}

export const ProtectedRoute = (props: Props) => {
  const { isAuthenticated } = props;
  const { uid } = useTypedSelector((state) => state.auth.user);

  if (isAuthenticated && !uid) {
    return <Navigate to="/login" />;
  }

  if (!isAuthenticated && uid) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};