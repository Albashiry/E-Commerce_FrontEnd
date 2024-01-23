import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { USER, USERS } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  // const [noUsers, setNoUsers] = useState("");

  useEffect(() => {
    Axios.get(`${USER}`).then(result => setCurrentUser(result.data));
  }, []);

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then(result => setUsers(result.data))
      .catch((error) => console.log(error));
  }, [deleteUser]);

  const userFilter = users.filter(user => user.id !== currentUser.id);
  const usersShow = userFilter.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Link>
          <FontAwesomeIcon
            onClick={() => handleDelete(user.id)}
            color={"red"}
            icon={faTrash}
            cursor={"pointer"}
          />
        </div>
      </td>
    </tr>
  ));

  async function handleDelete(id) {
    try {
      const response = await Axios.delete(`${USER}/${id}`);
      setDeleteUser(prev => !prev)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Users Page</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.length === 0
              ? <tr><td className="text-center" colSpan="12">Loading...</td></tr>
              : (users.length === 1
                ? <tr><td className="text-center" colSpan="12">No Users</td></tr>
                : usersShow
              )
          }
        </tbody>
      </Table>
    </>
  );
}