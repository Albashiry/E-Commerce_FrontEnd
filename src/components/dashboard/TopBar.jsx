import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookies from "universal-cookie";
import { LOGOUT, USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import { Menu } from "../../constants/MenuContext";
import "../../assets/styles/dashboard/bars.css";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const cookie = new Cookies();
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    Axios.get(`${USER}`).then(result => setCurrentUserName(result.data.name));
  }, []);

  async function handleLogout() {
    try {
      const response = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="top-bar d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-4">
        <h3>E-Commerce</h3>
        <FontAwesomeIcon
          onClick={() => setIsOpen(prev => !prev)}
          cursor='pointer'
          icon={faBars} />
      </div>
      <div>
        <DropdownButton id="logout" title={currentUserName}>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </nav>
  );
}