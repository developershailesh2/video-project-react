import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Button } from "@mui/material";

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
    <div className="container-fluid">
      <form
        className="d-flex justify-content-center"
        onSubmit={formik.handleSubmit}
      >
        <dl className=" w-50">
          <dt>Video Id</dt>
          <dd>
            <input
              onChange={formik.handleChange}
              value={formik.values.VideoId}
              className="form-control"
              type="number"
              name="VideoId"
              disabled
            />
          </dd>

          <dt>Title</dt>
          <dd>
            <input
              value={formik.values.Title}
              onChange={formik.handleChange}
              type="text"
              name="Title"
              className="form-control"
            />
          </dd>
          <dd className="text-danger">{formik.errors.Title}</dd>
          <dt>URL</dt>
          <dd>
            <input
              value={formik.values.Url}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              name="Url"
            />
          </dd>
          <dd className="text-danger">{formik.errors.Url}</dd>
          <dt>Description</dt>
          <dd>
            <textarea
              value={formik.values.Description}
              onChange={formik.handleChange}
              rows="2"
              cols="40"
              className="form-control"
              name="Description"
            ></textarea>
          </dd>
          <dd className="text-danger">{formik.errors.Description}</dd>
          <dt>Likes</dt>
          <dd>
            <input
              value={formik.values.Likes}
              onChange={formik.handleChange}
              type="number"
              name="Likes"
              className="form-control"
            />
          </dd>
          <dd className="text-danger">{formik.errors.Likes}</dd>
          <dt>Dislikes</dt>
          <dd>
            <input
              value={formik.values.Dislikes}
              onChange={formik.handleChange}
              type="number"
              className="form-control"
              name="Dislikes"
            />
          </dd>
          <dd className="text-danger">{formik.errors.Dislikes}</dd>
          <dt>Views</dt>
          <dd>
            <input
              value={formik.values.Views}
              onChange={formik.handleChange}
              type="number"
              name="Views"
              className="form-control"
            />
          </dd>
          <dd className="text-danger">{formik.errors.Views}</dd>
          <dt>Select Category</dt>
          <dd>
            <select
              value={formik.values.CategoryId}
              onChange={formik.handleChange}
              className="form-select"
              name="CategoryId"
            >
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryName}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </dd>
          <dd className="text-danger">{formik.errors.CategoryId}</dd>
          <div className="d-flex justify-content-evenly m-3">
            <Button type="submit" variant="outlined" color="success">
              Save
            </Button>
            <Link to="/admin-dashboard">
              <Button variant="outlined" color="error">Cancel</Button>
            </Link>
          </div>
        </dl>
      </form>
    </div>
  );
}
