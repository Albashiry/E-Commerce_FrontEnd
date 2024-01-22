import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { baseURL, GOOGLE_CALL_BACK } from "../../constants/API";

export default function GoogleCallBack() {
  const cookie = new Cookies();
  const location = useLocation();

  useEffect(() => {
    GoogleCall();
  }, []);

  async function GoogleCall() {
    try {
      const response = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location.search}`);
      const token = response.data.access-token;
      cookie.set('e-commerce', token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <h1>test</h1>
  );
}