import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../components/Loading";
import { baseURL, USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import Error403 from "./Error403";

export default function RequireAuth({allowedRole}) {
  // to secure authentication send token to backend and get the user
  const [user, setUser] = useState("");

  const cookie = new Cookies();
  const token = cookie.get('e-commerce');

  const navigate = useNavigate()

  useEffect(() => {
    // axios.get(`${baseURL}/${USER}`, {headers: {Authorization: `Bearer ${token}`}})
    Axios.get(`/${USER}`)
      .then(result => setUser(result.data))
      .catch(() => navigate('/login', { replace: true }));
  }, []);

  return (
    token
      ? (user === "" ? <Loading /> : (allowedRole.includes(user.role) ? <Outlet /> : <Error403 role={user.role} />))
      : <Navigate to={'/login'} replace={true} />
  );
}