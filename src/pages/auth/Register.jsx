import axios from "axios";
import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Loading from "../../components/Loading";
import { baseURL, REGISTER } from "../../constants/API";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  // Loading
  const [loading, setLoadig] = useState(false);

  const navigate = useNavigate();

  const cookie = new Cookies();

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadig(true);
    try {
      const response = await axios.post(`${baseURL}/${REGISTER}`, form);
      console.log(response);
      const token = response.data.token;
      cookie.set("e-commerce", token);
      navigate('/dashboard/users', { replace: true }); // window.location.pathname = "/users";
    }
    catch (error) {
      (error.response.status === 422) ? setErr("Email is already been taken") : setErr("Internal server error");
    }
    finally {
      setLoadig(false);
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
      <div className="container">
        <div className="row" style={{ height: '100vh' }}>
          <Form className="form" onSubmit={handleSubmit} action="" method="post">
            <div className="inner-from">
              <h1>Register Now</h1>

              <Form.Group className="form-custom" controlId="name">
                <Form.Control
                  type="text"
                  placeholder="Enter your name ..."
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="true"
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter your email ..."
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="true"
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="password">
                <div className="password-box">
                  <Form.Control
                    type="password"
                    placeholder="Enter your password ..."
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength="8"
                    ref={passwordFieldRef}
                  />
                  <i className="password-toggle-icon fa fa-eye" ref={togglePasswordRef} onClick={handleTogglePassword}></i>
                  <Form.Label>Password</Form.Label>
                </div>
              </Form.Group>

              <button className="btn btn-primary" type="submit">Register</button>

              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text"><strong>Register with Google</strong></p>
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