import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "../../constants/MenuContext";
import { Window } from "../../constants/WindowContext";
import "./bars.css";

export default function SideBar() {
  const menu = useContext(Menu);
  const window = useContext(Window);
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '70px',
          left: '0',
          width: '100%',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.2)',
          zIndex: '1',
          display: window.windowSize < '768' && menu.isOpen ? 'block' : 'none'
        }}
      ></div>

      <aside
        className="side-bar pt-3"
        style={{
          left: window.windowSize < '768' ? (menu.isOpen ? '0' : '-100%') : '0',
          width: menu.isOpen ? '240px' : 'fit-content',
          position: window.windowSize < '768' ? 'fixed' : 'sticky'
        }}>

        <NavLink to={'users'} className="d-flex align-items-center gap-2 side-bar-link">
          <FontAwesomeIcon icon={faUsers} style={{ padding: menu.isOpen ? '10px 8px 10px 15px' : '10px 13px' }} />
          <p className="m-0" style={{ display: menu.isOpen ? 'block' : 'none' }}> Users</p>
        </NavLink>
      </aside>
    </>
  );
}