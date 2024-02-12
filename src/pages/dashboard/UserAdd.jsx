import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading";
import { USER } from "../../constants/API";
import { Axios } from "../../constants/Axios";

export default function UserAdd() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("2001");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle focus
  const focusRef = useRef();
  useEffect(() => focusRef.current.focus(), []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
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

  const passwordFieldRef = useRef(null);
  const togglePasswordRef = useRef(null);
  const handleTogglePassword = () => {
    if (passwordFieldRef.current.type === 'password') {
      passwordFieldRef.current.type = 'text';
      togglePasswordRef.current.classList.remove("fa-eye");
      togglePasswordRef.current.classList.add("fa-eye-slash");
    } else {
      passwordFieldRef.current.type = 'password';
      togglePasswordRef.current.classList.remove("fa-eye-slash");
      togglePasswordRef.current.classList.add("fa-eye");
    }
  };

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
            ref={focusRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="true"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <div className="password-box">
            <Form.Control
              type="password"
              placeholder="Enter your password ..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
              ref={passwordFieldRef}
            />
            <i style={{ position: 'absolute', right: '2%' }} className="fa fa-eye" ref={togglePasswordRef} onClick={handleTogglePassword}></i>
          </div>
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
        <button disabled={name.length < 1 || email.length < 1 || password < 8 || role === ''} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}