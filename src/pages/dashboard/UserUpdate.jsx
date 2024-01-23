import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import { USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function UserUpdate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const id = Number(window.location.pathname.replace("/dashboard/users/", ""));

  useEffect(() => {
    Axios.get(`${USER}/${id}`).then(result => {
      setName(result.data.name);
      setEmail(result.data.email);
    }).then(() => setDisable(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios.post(`${USER}/edit/${id}`, { name: name, email: email });
      window.location.pathname = '/dashboard';
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
        <button disabled={disable} className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}