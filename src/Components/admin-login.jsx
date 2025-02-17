import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, yupToFormErrors } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import * as yup from "yup";

export function AdminLogin() {
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
    onSubmit: (admin) => {
      axios.get(`http://127.0.0.1:5050/get-admin`).then((response) => {
        console.log(response.data);
        var user = response.data.find((item) => item.UserId === admin.UserId);
        if (user) {
          if (admin.Password === user.Password) {
            navigate("/admin-dashboard");
          } else {
            Swal.fire({
              icon: "error",
              title: "OOPS",
              text: "Invalid Password!",
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "OOPS",
            text: "Invalid User Id!",
          });
        }
      });
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-90 ">
      <div
        className="bg-white p-4 p-md-5 m-3 rounded-3 shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center fs-4 fw-bold text-danger">
          Sign in to Admin
        </h3>

        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dd className="mt-4">
              <TextField
                onChange={formik.handleChange}
                color="secondary"
                label="Admin Id"
                name="UserId"
                variant="outlined"
                fullWidth
              />
            </dd>
            <dd className="text-danger">{formik.errors.UserId}</dd>
            <dd className="mt-4">
              <TextField
                onChange={formik.handleChange}
                type="password"
                color="secondary"
                label="Admin Password"
                name="Password"
                variant="outlined"
                fullWidth
              />
            </dd>
            <dd className="text-danger">{formik.errors.Password}</dd>
            <dd>
              <Button
                type="submit"
                className="mt-3 mb-3 fw-bold"
                variant="contained"
                color="success"
                fullWidth
              >
                Login
              </Button>
            </dd>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Home
              </Button>
            </Link>
          </dl>
        </form>
      </div>
    </div>
  );
}
