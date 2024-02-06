import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import TableShow from "../../components/dashboard/TableShow";
import { USER, USERS } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const header = [
    {
      key: "name",
      name: 'Username',
    },
    {
      key: "email",
      name: 'Email',
    },
    {
      key: "role",
      name: 'Role',
    },
  ];

  useEffect(() => {
    Axios.get(`${USER}`).then(result => setCurrentUser(result.data));
  }, []);

  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then(result => setUsers(result.data))
      .catch((error) => console.log(error));
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white w-100 px-4 py-3 rounded shadow-sm">
      <div className="d-flex align-items-center justify-content-between">
        <h3>Users Page</h3>
        <Link to='/dashboard/user/add' className="btn btn-primary">
          Add User
        </Link>
      </div>

      <TableShow
        header={header}
        data={users}
        handleDelete={handleDelete}
        currentUser={currentUser}
      />
    </div>
  );
}