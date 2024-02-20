import { useState, useEffect } from "react";
import { LatestProduct } from "../../constants/API"
import { Axios } from "../../constants/Axios"
import ProductSale from "./ProductSale";
import SkeletonShow from "./SkeletonShow";

export default function ProductShowLatest() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LatestProduct}`)
      .then(result => setProducts(result.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="col-md-6 col-12">
      <div className="ms-md-1">
        <h2 className="h1 text-center m-0 p-3 bg-primary text-white">Latest Products</h2>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap mb-5">
          {loading
            ? <SkeletonShow height="320px" width="250px" number="4" classes="col-md-6 col-12"/>
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
                col="6"
              />
            ))}
        </div>
      </div>
    </div>
  )
}