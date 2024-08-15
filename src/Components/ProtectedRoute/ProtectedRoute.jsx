import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(UserContext);

  if (token) {
    // User is logged in
    return children;
  } else {
    // Login first
    return <Navigate to={"/login"}></Navigate>;
  }
}
