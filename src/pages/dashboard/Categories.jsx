import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TableShow from "../../components/dashboard/TableShow";
import { CATEG, USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Categories(){
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);

  useEffect(() => {
    Axios.get(`/${CATEG}`)
      .then(result => setUsers(result.data))
      .catch((error) => console.log(error));
  }, [deleteUser]);

  const header = [
    {name: 'Title'},
    {name: 'Image'},
  ];

  function RoleLabel(props) {
    switch (props.role) {
      case '1995': return <span>Admin</span>;
      case '1996': return <span>Writer</span>;
      case '1999': return <span>Product Manager</span>;
      default: return <span>User</span>;
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Categories Page</h3>
        <Link to='/dashboard/user/add' className="btn btn-primary">
          Add User
        </Link>
      </div>
      
      {/* <TableShow header={header} /> */}
    </>
  );
}