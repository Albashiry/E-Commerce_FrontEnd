import { useState } from "react";
import { useEffect } from "react"
import { Container } from "react-bootstrap";
import { LatestSale } from "../../constants/API"
import { Axios } from "../../constants/Axios"
import ProductSale from "./ProductSale";
import SkeletonShow from "./SkeletonShow";

export default function ProductLatestSale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LatestSale}`)
      .then(result => setProducts(result.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <h2 className="h1 m-3">Latest Sale Products</h2>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap mb-5">
        {loading
          ? <SkeletonShow height="320px" width="250px" number="4" />
          : products.map((product, index) => (
            <ProductSale
              key={index}
              title={product.title}
              description={product.description}
              img={product.images[0].image}
              sale
              price={product.price}
              discount={product.discount}
              rating={product.rating}
              col="3"
            />
          ))}
      </div>
    </Container>
  )
}