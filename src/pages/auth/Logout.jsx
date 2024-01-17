import axios from "axios";
import Cookies from "universal-cookie";
import { baseURl, LOGOUT } from "../../constants/API";

export default function Logout() {
  const cookie = new Cookies();
  const token = cookie.get('e-commerce');

  async function handleLogout() {
    try {
      const response = await axios.get(`${baseURl}/${LOGOUT}`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  );
}