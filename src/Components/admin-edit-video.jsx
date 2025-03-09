import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import { Textarea } from "@mui/joy";

export function AdminEditVideo() {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      Views: "",
      CategoryId: 0,
    },
  ]);

  let params = useParams();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      VideoId: videos[0].VideoId,
      Title: videos[0].Title,
      Url: videos[0].Url,
      Description: videos[0].Description,
      Likes: videos[0].Likes,
      Dislikes: videos[0].Dislikes,
      Views: videos[0].Views,
      CategoryId: videos[0].CategoryId,
    },
    validationSchema: yup.object({
      Title: yup.string().required("Title can not be empty"),
      Url: yup.string().required("Url required"),
      Description: yup.string().required("Description required"),
      Likes: yup.number().required("Likes required"),
      Dislikes: yup.number().required("Dislikes required"),
      Views: yup.number().required("Views required"),
      CategoryId: yup.string().required("Select Category"),
    }),
    onSubmit: (values) => {
      axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`, values);
      Swal.fire({
        icon: "success",
        text: "Video Edited Successfully",
      });
      navigate("/admin-dashboard");
    },
    enableReinitialize: true,
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
    axios
      .get(`http://127.0.0.1:5050/get-video/${params.id}`)
      .then((response) => {
        setVideos(response.data);
      });
  }, []);

  return (
    <div className="d-flex justify-content-evenly align-content-center">
      <form
        className="animate__animated animate__lightSpeedInRight bg-light shadow-lg row justify-content-center m-4 p-4 w-100 border border-primary rounded-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="justify-content-center mt-3 mb-3 text-center fs-4">
          Update Video Details
        </div>
        <div className="col-md-3 mt-3 mb-3">
          <TextField
            onChange={formik.handleChange}
            value={formik.values.VideoId}
            type="number"
            name="VideoId"
            label="Video Id"
            color="secondary"
            className="form-control"
            disabled
          />
          <span className="text-danger">{formik.errors.VideoId}</span>
        </div>

        <div className="col-md-3 mt-3 mb-3">
          <TextField
            value={formik.values.Title}
            onChange={formik.handleChange}
            type="text"
            name="Title"
            label="Title"
            className="form-control"
            color="secondary"
            placeholder="Title"
          />
          <span className="text-danger">{formik.errors.Title}</span>
        </div>

        <div className="col-md-5 mt-3 mb-3">
          <TextField
            value={formik.values.Url}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            label="URL"
            color="secondary"
            name="Url"
          />
          <span className="text-danger">{formik.errors.Url}</span>
        </div>

        <div className="col-md-11 mt-3 mb-3">
          <Textarea
            value={formik.values.Description}
            onChange={formik.handleChange}
            rows="10"
            cols="50"
            className="form-control"
            name="Description"
            label="Description"
            color="success"
          />

          <span className="text-danger text-center mb-3">
            {formik.errors.Description}
          </span>
        </div>

        <div className="col-md-4 mt-3 mb-3 ">
          <TextField
            value={formik.values.Likes}
            onChange={formik.handleChange}
            type="number"
            name="Likes"
            label="Likes"
            color="secondary"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Likes}</span>
        </div>

        <div className="col-md-4 mt-3 mb-3 ">
          <TextField
            value={formik.values.Dislikes}
            onChange={formik.handleChange}
            type="number"
            color="secondary"
            className="form-control"
            label="Dislikes"
            name="Dislikes"
          />
          <span className="text-danger">{formik.errors.Dislikes}</span>
        </div>

        <div className="col-md-3 mt-3 mb-3">
          <TextField
            value={formik.values.Views}
            onChange={formik.handleChange}
            type="number"
            name="Views"
            color="secondary"
            label="Views"
            className="form-control"
          />
          <span className="text-danger">{formik.errors.Views}</span>
        </div>

        <div className="col-md-5 mt-3 mb-3">
          <select
            value={formik.values.CategoryId}
            onChange={formik.handleChange}
            className="form-select"
            label="Select Category"
            name="CategoryId"
          >
            {categories.map((category) => (
              <option key={category.CategoryId} value={category.CategoryName}>
                {category.CategoryName}
              </option>
            ))}
          </select>
          <span className="text-danger">{formik.errors.CategoryId}</span>
        </div>

        <div className="d-flex justify-content-evenly m-3">
          <Button type="submit" variant="outlined" color="success">
            Save
          </Button>
          <Link to="/admin-dashboard">
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
