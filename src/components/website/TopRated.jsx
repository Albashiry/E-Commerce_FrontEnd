import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import stringSlice from "../../helpers/stringSlice";

export default function TopRated(props) {
  const stars = Math.min(Math.round(props.rating), 5);
  const goldStarts = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} color="gold" />
  ));
  const emptyStarts = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  return (
    <div className="border m-1">
      <div className="m-1 border rounded p-3 h-100 d-felx flex-column justify-content-between">
        <div className="border-bottom pb-3">
          <p className="text-truncate" style={{ color: "gray" }}>{stringSlice(props.title, 25)}</p>
          <p>{stringSlice(props.description, 30)}</p>
          <div className="px-5 py-4 position-relative">
            {props.sale && <p
              className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
              style={{ width: "50px", height: "50px", lineHeight: "50px" }}>
              Sale
            </p>}
            <img src={props.img} alt="" className="img-fluid" />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {goldStarts}
            {emptyStarts}
            <div className="d-flex align-items-center gap-3">
              <h6 className="m-0" style={{ color: "gray", textDecoration: "line-through" }}>{props.price}$</h6>
              <h6 className="m-0 text-primary">{props.discount}$</h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img src={require("../../assets/icons/cart.png")} alt="cart" width="20px" />
          </div>
        </div>
      </div>
    </div>
  );
}