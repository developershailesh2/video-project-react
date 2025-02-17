import { Button, TextField } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function UserRegistration() {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    validationSchema: yup.object({
      UserId: yup
        .string()
        .required("User id is required")
        .matches(/[A-Za-z]\d[0-9]/, "Only letters and numbers allowed"),
      UserName: yup.string().required("Username required"),
      Password: yup
        .string()
        .required("Password required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain at least 1 Capital Letter")
        .matches(/[a-z]/, "Must contain at least 1 lower case letter")
        .matches(/\d/, "Password must contain at least 1 number"),
      Email: yup
        .string()
        .required("Email required")
        .email("Invalid email format"),
      Mobile: yup.string().required("Mobile required"),
    }),
    onSubmit: (user) => {
      axios.post(`http://127.0.0.1:5050/register-user`, user);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
      });
      navigate("/user-login");
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-90">
      <div className="container-fluid">
        <div className="w-50 w-md-50 mx-auto rounded">
          <form onSubmit={formik.handleSubmit}>
            <dl className="bg-light p-4 rounded m-3">
              <div className="text-muted mb-2 fw-bold fs-2">
                User Registration
              </div>
              <dd>
                <TextField
                  className="form-control mb-2"
                  variant="outlined"
                  type="text"
                  name="UserId"
                  label="User Id"
                  onChange={formik.handleChange}
                  fullWidth
                />
              </dd>
              <dd className="text-danger">{formik.errors.UserId}</dd>
              <dd>
                <TextField
                  className="form-control mb-2"
                  variant="outlined"
                  type="text"
                  onChange={formik.handleChange}
                  name="UserName"
                  label="User Name"
                  fullWidth
                />
              </dd>
              <dd className="text-danger">{formik.errors.UserName}</dd>
              <dd>
                <TextField
                  className="form-control mb-2"
                  variant="outlined"
                  label="Password"
                  name="Password"
                  onChange={formik.handleChange}
                  type="password"
                  fullWidth
                />
              </dd>
              <dd className="text-danger">{formik.errors.Password}</dd>
              <dd>
                <TextField
                  className="form-control mb-2"
                  type="email"
                  label="Email"
                  onChange={formik.handleChange}
                  name="Email"
                  variant="outlined"
                  fullWidth
                />
              </dd>
              <dd className="text-danger">{formik.errors.Email}</dd>
              <dd>
                <TextField
                  className="form-control mb-2"
                  type="text"
                  label="Mobile"
                  onChange={formik.handleChange}
                  name="Mobile"
                  variant="outlined"
                  fullWidth
                />
              </dd>
              <dd className="text-danger">{formik.errors.Mobile}</dd>
              <dd>
                <div className="d-flex flex-column flex-md-row justify-content-center">
                  <Button
                    type="submit"
                    variant="contained"
                    className="mb-2 mb-md-0 mx-md-3 w-100 w-md-25"
                  >
                    Register
                  </Button>
                  <Link to="/admin-login" className="w-100 w-md-50">
                    <Button variant="contained" className="form-control">
                      Admin Login
                    </Button>
                  </Link>
                </div>
              </dd>
            </dl>
          </form>
        </div>
      </div>
    </div>
  );
}
