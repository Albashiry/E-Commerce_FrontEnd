import { Link } from "react-router-dom";
import "../../assets/styles/dashboard/error404.css";

export default function Error404() {
  return (
    <section className="page-404">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-12 text-center">
                        <div className="four-zero-four-bg">
                            <h1 className="text-center">404</h1>
                        </div>
                        <div className="contant-box-404">
                            <h3 className="h2">Look like you're lost.</h3>
                            <p>The page you are looking for is not available!</p>
                            <Link to={"/"} className="link-404">Go to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}