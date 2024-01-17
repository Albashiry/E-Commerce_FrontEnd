import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Cookies from "universal-cookie";
import Loading from "../../components/Loading";
import { baseURl, LOGIN } from "../../constants/API";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const [loading, setLoadig] = useState(false);

  const cookie = new Cookies();

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadig(true);
    try {
      const response = await axios.post(`${baseURl}/${LOGIN}`, {
        email: form.email,
        password: form.password
      });
      const token = response.data.token;
      cookie.set("e-commerce", token);
      window.location.pathname = "/users";
    }
    catch (error) {
      (error.response.status === 401) ? setErr("Wrong email or password") : setErr("Internal server error");
    }
    finally {
      setLoadig(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{ height: '100vh' }}>
          <Form className="form" onSubmit={handleSubmit} action="" method="post">
            <div className="inner-from">
              <h1>Login</h1>

              <Form.Group className="form-custom" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter your email ..."
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>
              
              <Form.Group className="form-custom" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter your password ..."
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="8"
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>

              <button className="btn btn-primary" type="submit">Login</button>

              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text"><strong>Sign in with Google</strong></p>
                </a>
              </div>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}