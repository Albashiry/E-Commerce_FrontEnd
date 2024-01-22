import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Menu } from "../../constants/MenuContext";
import "./bars.css";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  return (
    <nav className="top-bar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-5">
        <h3>E-Commerce</h3>
        <FontAwesomeIcon
          onClick={() => setIsOpen(prev => !prev)}
          cursor='pointer'
          icon={faBars} />
      </div>
    </nav>
  );
}