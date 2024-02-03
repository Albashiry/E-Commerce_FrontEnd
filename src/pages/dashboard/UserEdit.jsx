import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import { USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function UserEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const id = Number(window.location.pathname.replace("/dashboard/users/", ""));
  const {id} = useParams(); //const id = useParams().id;

  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}/${id}`)
      .then(result => {
        setName(result.data.name);
        setEmail(result.data.email);
        setRole(result.data.role);
        setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(() => navigate('/dashboard/users/nopage', { replace: true }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role
      });
      window.location.pathname = '/dashboard/users';
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white mx-2 p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="true"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="true"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <optgroup label="Select Role">
              <option value="1995">Admin</option>
              <option value="2001">User</option>
              <option value="1996">Writer</option>
              <option value="1999">Product Manager</option>
            </optgroup>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}