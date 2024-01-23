import { useContext } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/dashboard/SideBar";
import TopBar from "../../components/dashboard/TopBar";
import { Menu } from "../../constants/MenuContext";
import { Window } from "../../constants/WindowContext";
import "./dashboard.css";

export default function Dashboard() {
  const menu = useContext(Menu);
  const window = useContext(Window);

  return (
    <div className="dashboard position-relative">
      <SideBar />
      <div className="d-flex gap-1" style={{ marginTop: '70px' }}>
        <TopBar />
        <div
          className="users-table bg-white p-2"
          style={{
            top: window.windowSize < '768' ? '0' : '4rem',
            left: !menu.isOpen ? (window.windowSize < '768' ? '0px' : '70px') : (window.windowSize < '768' ? '0px' : '15rem'),
            width: !menu.isOpen ? (window.windowSize < '768'? '100%' : 'calc(100% - 6.5rem)') : (window.windowSize < '768' ? '100%' : 'calc(100% - 17rem)')
          }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}