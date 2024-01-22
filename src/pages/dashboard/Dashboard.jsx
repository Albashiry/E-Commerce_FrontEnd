import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/dashboard/TopBar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard position-relative">
      <SideBar />
      <div className="d-flex gap-1" style={{marginTop: '70px'}}>
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}