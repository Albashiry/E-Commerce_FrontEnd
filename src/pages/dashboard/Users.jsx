import axios from "axios";
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";
import Cookies from "universal-cookie";
import { baseURL, USERS } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const cookie = new Cookies();
  const token = cookie.get('e-commerce');

  useEffect(() => {
    // const response = axios.get(`${baseURL}/${USERS}`, {headers: {Authorization: 'Bearer ' + token}})
    Axios.get(`/${USERS}`)
      .then(result => setUsers(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="users-table bg-white p-2">
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
            users.map((user,index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}