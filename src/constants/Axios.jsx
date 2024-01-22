import axios from "axios";
import Cookies from "universal-cookie";
import { baseURL } from "./API";

const cookie = new Cookies();
const token = cookie.get("e-commerce");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});