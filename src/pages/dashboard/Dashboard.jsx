import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/dashboard/TopBar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="position-relative dashboard">
      <SideBar />
      <TopBar />
      <Outlet />
    </div>
  );
}