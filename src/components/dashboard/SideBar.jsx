import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import { Menu } from "../../constants/MenuContext";
import { links } from "../../constants/NavLinks";
import { Window } from "../../constants/WindowContext";
import "../../assets/styles/bars.css";

export default function SideBar() {
  const menu = useContext(Menu);
  const window = useContext(Window);
  const [user, setUser] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then(result => setUser(result.data))
      .catch(() => navigate('/login', { replace: true }));
  }, []);

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
        {links.map((link, index) => (
          link.role.includes(user.role) &&
          <NavLink key={index} to={link.path} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon icon={link.icon} style={{ padding: menu.isOpen ? '10px 8px 10px 15px' : '10px 13px' }} />
            <p className="m-0" style={{ display: menu.isOpen ? 'block' : 'none' }}>
              {link.name}
            </p>
          </NavLink>
        ))
        }

        {/* {
        user.role === '1995' &&
          <>
            <NavLink to={'users'} className="d-flex align-items-center gap-2 side-bar-link">
              <FontAwesomeIcon icon={faUsers} style={{ padding: menu.isOpen ? '10px 8px 10px 15px' : '10px 13px' }} />
              <p className="m-0" style={{ display: menu.isOpen ? 'block' : 'none' }}>
                Users
              </p>
            </NavLink>

            <NavLink to={'/dashboard/user/add'} className="d-flex align-items-center gap-2 side-bar-link">
              <FontAwesomeIcon icon={faPlus} style={{ padding: menu.isOpen ? '10px 8px 10px 15px' : '10px 13px' }} />
              <p className="m-0" style={{ display: menu.isOpen ? 'block' : 'none' }}>
                Add User
              </p>
            </NavLink>

            <NavLink to={'/dashboard/writer'} className="d-flex align-items-center gap-2 side-bar-link">
              <FontAwesomeIcon icon={faPen} style={{ padding: menu.isOpen ? '10px 8px 10px 15px' : '10px 13px' }} />
              <p className="m-0" style={{ display: menu.isOpen ? 'block' : 'none' }}>
                Writer
              </p>
            </NavLink>
          </>
        }
        {user.role === '1996' &&
          <NavLink to={'/dashboard/writer'} className="d-flex align-items-center gap-2 side-bar-link">
            <FontAwesomeIcon icon={faPen} style={{ padding: menu.isOpen ? '10px 8px 10px 15px' : '10px 13px' }} />
            <p className="m-0" style={{ display: menu.isOpen ? 'block' : 'none' }}>
              Writer
            </p>
          </NavLink>
        } */}
      </aside>
    </>
  );
}