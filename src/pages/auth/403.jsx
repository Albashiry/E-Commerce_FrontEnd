import { Link } from "react-router-dom";
import "../../assets/styles/403.css";

export default function Error403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 - Access Denied
      </div>
      <div className="subtitle">
        Oops, you don't have permission to access this page.
      </div>
      <Link
        to={role === '1996' ? '/dashboard/writer' : '/'}
        className="d-block text-center btn btn-primary">
        Go to {role === '1996' ? 'Writer' : 'Home'} Page
      </Link>
    </div>
  )
}