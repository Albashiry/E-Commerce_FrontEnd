import axios from "axios";
import { useEffect } from "react"
import Cookies from "universal-cookie";
import { baseURl, USERS } from "../../constants/API";
import Logout from "../auth/Logout";

export default function Users() {
  const cookie = new Cookies();
  const token = cookie.get('e-commerce');
  useEffect(() => {
    const response = axios.get(`${baseURl}/${USERS}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(data => console.log(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <h1>Users page</h1>
      <Logout />
    </>
  );
}