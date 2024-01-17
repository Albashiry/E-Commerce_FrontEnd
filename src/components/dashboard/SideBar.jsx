import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "./bars.css";

export default function SideBar() {
  return (
    <aside className="side-bar pt-3">
      <NavLink to={'users'} className="d-flex align-items-center gap-2 side-bar-link">
        <FontAwesomeIcon icon={faUsers} />
        <p className="m-0"> Users</p>
      </NavLink>
    </aside>
  );
}