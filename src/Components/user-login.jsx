import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import Swal from "sweetalert2";

export function UserLogin() {
  const [cookies, setCookies] = useCookies(["username"]);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    validationSchema: yup.object({
      UserId: yup.string().required("* Required"),
      Password: yup.string().required("* Required"),
    }),
    onSubmit: (user) => {
      axios.get(`http://127.0.0.1:5050/get-users`).then((response) => {
        var result = response.data.find((item) => item.UserId === user.UserId);
        if (result) {
          if (result.Password === user.Password) {
            setCookies("username", result.UserName);
            Swal.fire({
              icon: "success",
              title: "Login Successful",
            });
            navigate("/user-dashboard");
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid Password",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid User Id",
          });
        }
      });
    },
  });

  return (
    <div className="animate__animated animate__fadeInRight d-flex justify-content-center align-items-center min-vh-90">
      <div
        className="bg-light p-4 p-md-5 m-3 rounded-3 shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="animate__animated animate__fadeInLeftBig text-start fs-4 text-dark">
          User Login
        </h3>

        <form onSubmit={formik.handleSubmit}>
          <dl className="mt-2">
            <dd>
              <TextField
                className="mt-3 form-control"
                onChange={formik.handleChange}
                name="UserId"
                variant="outlined"
                label="User Id"
                fullWidth
              />
            </dd>
            <dd className="text-danger">{formik.errors.UserId}</dd>
            <dd>
              <TextField
                className="mt-3 form-control"
                onChange={formik.handleChange}
                type="password"
                name="Password"
                label="Password"
                fullWidth
              />
            </dd>
            <dd className="text-danger">{formik.errors.Password}</dd>
            <dd className="d-flex justify-content-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-3 fw-bold"
                fullWidth
              >
                Login
              </Button>
            </dd>
            <dd>
              <Link to="/user-register" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  className="mt-3 fw-bold"
                  fullWidth
                >
                  New User Register
                </Button>
              </Link>
            </dd>
            <dd>
              <Link to="/">
                <Button className="bck-btn">Home</Button>
              </Link>
            </dd>
          </dl>
        </form>
      </div>
    </div>
  );
}
