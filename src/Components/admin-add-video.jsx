import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Textarea } from "@mui/joy";

export function AdminAddVideo() {
  const [categories, setCategories] = useState([
    { CategoryId: 0, CategoryName: "" },
  ]);
  const [snackbar, setSnackBar] = useState(false);
  const [snackbarmessage, setSnackBarMessage] = useState("");

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      VideoId: 1,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: -1,
      Comments: 0,
    },
    validationSchema: yup.object({
      VideoId: yup
        .number()
        .min(1, "Video Id cannot be negative")
        .required("Video Id is required"),
      Title: yup.string().required("Title required"),
      Url: yup.string().required("Url required"),
      Description: yup.string().required("Description required"),
      Likes: yup
        .number()
        .required("Likes required")
        .min(0, "Likes cannot be negative"),
      Dislikes: yup
        .number()
        .required("Dislikes required")
        .min(0, "Dislikes cannot be negative"),
      Views: yup
        .number()
        .required("Views required")
        .min(0, "Views cannot be zero"),
      CategoryId: yup
        .number()
        .min(0, "Please select a valid category")
        .required("Category is required"),
      Comments: yup
        .number()
        .required("Comments required")
        .min(0, "Comments cannot be negative"),
    }),
    onSubmit: (values) => {
      axios
        .post(`http://127.0.0.1:5050/add-video`, values)
        .then((response) => {
          //setSnackBarMessage('Video Added Successfully...');
          //setSnackBar(true);
          setTimeout(() => {
            Swal.fire({
              icon: "success",
              text: "Video Added Successfully",
            });
            navigate("/admin-dashboard");
          }, 500);
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Id is not available",
              text: "Video Id already available",
            });
          }
        });
    },
  });

  function LoadCategories() {
    axios.get(`http://127.0.0.1:5050/get-categories`).then((response) => {
      response.data.unshift({
        CategoryId: -1,
        CategoryName: "Select Category",
      });
      setCategories(response.data);
    });
  }

  useEffect(() => {
    LoadCategories();
  }, []);

  return (
    <div className="d-flex justify-content-evenly align-items-center">
      <form
        className="row justify-content-center w-100 border border-dark rounded-3 m-4 p-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3 text-dark rounded p-2 text-center fs-3">
          Add Video <span className="bi bi-camera-video"></span>
        </div>
        <div className="col-md-3 mt-2 mb-3">
          <TextField
            label="Video Id"
            min="1"
            type="number"
            onChange={formik.handleChange}
            name="VideoId"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.VideoId}</span>
        </div>

        <div className="col-md-3 mt-2 mb-3">
          <TextField
            label="Video Title"
            onChange={formik.handleChange}
            type="text"
            name="Title"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Title}</span>
        </div>

        <div className="col-md-4 mt-2 mb-3">
          <TextField
            label="URL"
            onChange={formik.handleChange}
            type="text"
            name="Url"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Url}</span>
        </div>

        <div className="col-md-10 mb-3">
          <Textarea
            placeholder="Description"
            minRows={5}
            onChange={formik.handleChange}
            type="text"
            name="Description"
            cols="10"
            rows="5"
            className="form-control"
          />
        </div>
        <span className="text-danger text-center mb-3">
          {formik.errors.Description}
        </span>

        <div className="col-md-5 mb-3">
          <TextField
            label="Likes"
            onChange={formik.handleChange}
            type="number"
            name="Likes"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Likes}</span>
        </div>

        <div className="col-md-5 mb-3">
          <TextField
            label="Dislikes"
            onChange={formik.handleChange}
            type="number"
            name="Dislikes"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Dislikes}</span>
        </div>

        <div className="col-md-5 mb-3">
          <TextField
            label="Views"
            onChange={formik.handleChange}
            type="number"
            name="Views"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Views}</span>
        </div>

        <div className="col-md-5 mb-3">
          <TextField
            label="Comments"
            type="number"
            name="Comments"
            onChange={formik.handleChange}
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Comments}</span>
        </div>

        <div className="col-md-5 mb-3">
          <FormControl fullWidth>
            <Select
              className="bg-white"
              name="CategoryId"
              value={formik.values.CategoryId}
              onChange={formik.handleChange}
            >
              {categories.map((category) => (
                <MenuItem
                  className="text-dark"
                  key={category.CategoryId}
                  value={category.CategoryId}
                >
                  {category.CategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <span className="text-danger text-center mb-3">
          {formik.errors.CategoryId}
        </span>

        <div className="d-flex justify-content-center">
          <Button
            className="mx-3"
            type="submit"
            variant="contained"
            color="success"
          >
            Add Video
          </Button>
          <Link to="/admin-dashboard">
            <Button variant="contained" color="error">
              Cancel
            </Button>
          </Link>
        </div>
      </form>

      <Snackbar
        open={snackbar}
        autoHideDuration={2500}
        onClose={() => setSnackBar(false)}
        message={snackbarmessage}
      ></Snackbar>
    </div>
  );
}
