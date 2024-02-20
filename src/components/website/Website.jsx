import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Website() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}