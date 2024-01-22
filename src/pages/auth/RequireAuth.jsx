import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../components/Loading";
import { baseURL, USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function RequireAuth() {
  // to secure authentication send token to backend and get the user
  const [user, setUser] = useState("");

  // const cookie = new Cookies();
  // const token = cookie.get('e-commerce');

  const navigate = useNavigate()

  useEffect(() => {
    // axios.get(`${baseURL}/${USER}`, {headers: {Authorization: `Bearer ${token}`}})
    Axios.get(`/${USER}`)
    .then(data => setUser(data))
    .catch(() => navigate('/login', { replace: true }));
  }, []);

  return token ? (user === "" ? <Loading /> : <Outlet />) : <Navigate to={'/login'} replace={true} />;
}