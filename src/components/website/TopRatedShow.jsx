import { useEffect, useState } from "react"
import { TopRatedProduct } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import SkeletonShow from "./SkeletonShow";
import TopRated from "./TopRated";

export default function TopRatedShow() {
  const [products, setProducts] = useState([]);
  const [loading, setLoaind] = useState(true);

  useEffect(() => {
    Axios.get(`${TopRatedProduct}`)
      .then((result) => setProducts(result.data))
      .finally(() => setLoaind(false));
  }, []);

  return (
    <div className="col-md-6 col-12" style={{ border: "2x solid #9D6EFD" }}>
      <div className="mx-md-1">
        <h2 className="h1 text-center m-0 p-3 bg-primary text-white">Top Rated</h2>
        <div className="p-3 border">
          {loading
            ? <SkeletonShow height="320px" width="500px" number="3" classes="col-12"/>
            : products.map((product, index) => (
              <TopRated
                key={index}
                title={product.title}
                description={product.description}
                img={product.images[0].image}
                sale
                price={product.price}
                discount={product.discount}
                rating={product.rating}
              />
            ))}
        </div>
      </div>
    </div>
  );
}