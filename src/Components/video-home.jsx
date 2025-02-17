import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export function VideoHome() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Link to="/admin-login">
        <Button className="mx-3 fw-bold fs-6" variant="contained">
          Admin Login
        </Button>
      </Link>
      <Link to="/user-login">
        <Button className="fw-bold fs-6" variant="contained" color="success">
          User Login
        </Button>
      </Link>
    </div>
  );
}
