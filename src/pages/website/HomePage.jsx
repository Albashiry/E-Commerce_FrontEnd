import { Container } from "react-bootstrap";
import "../../assets/styles/website/home.css";
import Landing from "../../components/website/Landing";
import ProductShowLatest from "../../components/website/ProductShowLatest";
import ProductLatestSale from "../../components/website/ProductLatestSale";
import TopRatedShow from "../../components/website/TopRatedShow";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <ProductLatestSale />
      <div className="mb-2" style={{ height: "10px", background: "lightgray" }}></div>
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5">
          <TopRatedShow />
          <ProductShowLatest />
        </div>
      </Container>
    </div>
  );
}