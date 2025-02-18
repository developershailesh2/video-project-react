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
        .required("User Id Required")
        .matches(/[A-Za-z]\d[0-9]/, "Only letters and numbers allowed"),
      UserName: yup.string().required("Username Required"),
      Password: yup
        .string()
        .required("Password Required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain at least 1 Capital Letter")
        .matches(/[a-z]/, "Must contain at least 1 lower case letter")
        .matches(/\d/, "Password must contain at least 1 number"),
      Email: yup
        .string()
        .required("Email Required")
        .email("Invalid email format"),
      Mobile: yup.string().required("Mobile Required"),
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
        <div className="w-75 w-md-100 mx-auto rounded">
          <form className="row bg-light rounded-2 p-3 mt-4 shadow-lg" onSubmit={formik.handleSubmit}>
              <div className="mt-3 mb-3 text-warning p-2 fw-semibold fs-2">User Registration</div>
            <div className="col-md-6 mb-3">
            <TextField
                  className="form-control mb-2"
                  variant="outlined"
                  type="text"
                  name="UserId"
                  value={formik.values.UserId}
                  label="User Id"
                  onChange={formik.handleChange}
                  fullWidth
                />
                <span className="mb-2 text-danger">{formik.errors.UserId}</span>
            </div>  
            

            <div className="col-md-6 mb-3">
            <TextField
                  className="form-control mb-2"
                  variant="outlined"
                  type="text"
                  onChange={formik.handleChange}
                  name="UserName"
                  value={formik.values.UserName}
                  label="User Name"
                  fullWidth
                />
                <span className="text-danger">{formik.errors.UserName}</span>
            </div>

              <div className="col-md-6 mb-3">
              <TextField
                  className="form-control mb-2"
                  variant="outlined"
                  label="Password"
                  name="Password"
                  onChange={formik.handleChange}
                  type="password"
                  fullWidth
                />
                <span className="text-danger">{formik.errors.Password}</span>
              </div>

              <div className="col-md-6 mb-3">
              <TextField
                  className="form-control mb-2"
                  type="email"
                  label="Email"
                  onChange={formik.handleChange}
                  name="Email"
                  variant="outlined"
                  fullWidth
                />
                <span className="text-danger">{formik.errors.Email}</span>
              </div>

              <div className="col-md-12 mb-3">
              <TextField
                  className="form-control mb-2"
                  type="text"
                  label="Mobile"
                  onChange={formik.handleChange}
                  name="Mobile"
                  variant="outlined"
                  fullWidth
                />
                 <span className="text-danger">{formik.errors.Mobile}</span>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-center mb-3">
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
          </form>
        </div>
      </div>
    </div>
  );
}
