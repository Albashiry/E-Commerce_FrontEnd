import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-wrap hand">
      <Container>
        <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
          <h2 className="display-2 fw-bold">Shamboo Nice</h2>
          <h5 className="fw-normal" style={{ color: "gray" }}>
            Another nice thing which is used by someone I do't know ( just random text)
          </h5>

          <Link to={'/shop'} className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light ">
            Shop Now
          </Link>
        </div>
      </Container>
    </div>
  );
}