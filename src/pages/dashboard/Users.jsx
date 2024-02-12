import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import TableShow from "../../components/dashboard/TableShow";
import { USER, USERS } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalData, setTotalData] = useState(0);
  const [loading, setLoading] = useState(false);

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
    {
      key: 'created_at',
      name: 'Created'
    },
    {
      key: 'updated_at',
      name: 'Last Login'
    },
  ];

  useEffect(() => {
    Axios.get(`${USER}`).then(result => setCurrentUser(result.data));
  }, []);

  // get all users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then(result => {
        setUsers(result.data.data);
        setTotalData(result.data.total);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [limit, page]);

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
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        totalData={totalData}
        loading={loading}
        searchIn='name'
        searchLink={USER}
      />
    </div>
  );
}