import { LOGOUT } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Logout() {

  async function handleLogout() {
    try {
      const response = await Axios.get(`/${LOGOUT}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  );
}