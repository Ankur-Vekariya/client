import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ childern }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return childern;
};

export const ProtectRoute = ({childern}) => {
    const username = useAuthStore.getState().auth.username;
    if (!username) {
        return <Navigate to={"/"} replace={true}></Navigate>;
      }
      return childern;
}
 