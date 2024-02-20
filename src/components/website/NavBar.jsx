import { useState } from "react";
import { useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import "../../assets/styles/website/navbar.css";
import stringSlice from "../../helpers/stringSlice";
import SkeletonShow from "./SkeletonShow";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then(result => setCategories(result.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <nav className="py-2 shadow">
      <Container>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <Link className="col-2" to="/">
            <img src={require("../../assets/images/logo.png")} alt="Logo" width="100px" />
          </Link>

          <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
            <Form.Control
              type="search"
              className="form-control custom-search py-3 rounded-0"
              placeholder="Search Product"
            />
            <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
              Search
            </h3>
          </div>

          <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
            <Link to="/cart">
              <img src={require("../../assets/icons/cart.png")} alt="Cart" width="30px" />
            </Link>
            <Link to="/profile">
              <img src={require("../../assets/icons/profile.png")} alt="Profile" width="30px" />
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <div className="d-flex align-items-center justify-content-center gap-3">
            {loading
              ? <SkeletonShow height="20px" width="80px" number="8" />
              : categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.id}`}
                  className="m-0 category-title text-black mx-2"
                >
                  {stringSlice(category.title, 12)}
                </Link>
              ))}
            <Link className="text-black category-title" to={'/categories'}>Show All</Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}