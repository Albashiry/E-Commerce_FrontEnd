import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

export default function RequireBack(){
  const cookie = new Cookies();
  const token = cookie.get("e-commerce");
  return (
    // token ? <Navigate to="/" /> : <Outlet /> 
    token ? window.history.back() : <Outlet /> 
  );
}