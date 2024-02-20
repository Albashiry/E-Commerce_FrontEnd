import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { CATEGORIES } from "../../constants/API";
import { Axios } from "../../constants/Axios";
import stringSlice from "../../helpers/stringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "./SkeletonShow";


export default function CategoriesShow() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then(result => setCategories(result.data))
    .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="bg-secondary py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
            {loading
              ? <SkeletonShow height="75px" width="175px" number="20" classes="col-lg-2 col-md-6 col-12" />
              : categories.map((category, index) => (
                <div key={index} className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
                  <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
                    <img src={category.image} alt="just an image" className="ms-3" width='50px' />
                    <p className="m-0">
                      {stringSlice(category.title, 12)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Container>
      </div>
    </>
  )
}