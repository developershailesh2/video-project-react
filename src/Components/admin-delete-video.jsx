import { Button, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export function AdminDeleteVideo() {
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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5050/get-video/${params.id}`)
      .then((response) => {
        setVideos(response.data);
      });
  }, []);

  function handleDeleteClick() {
    axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);
    Swal.fire({
      icon: "success",
      text: "Video Deleted Successfully",
    });
    navigate("/admin-dashboard");
  }

  return (
    <div className="container-fluid">
      <div className="fs-4 m-4 text-center">Are You Sure Want To Delete?</div>

      <dl className="bg-dark text-white text-center p-4 rounded-4 shadow-lg">
        <dt className="fw-bold fs-4 text-uppercase text-warning">Title</dt>
        <dd className="text-danger fs-5 fw-semibold">{videos[0].Title}</dd>

        <dt className="fw-bold fs-4 text-uppercase text-warning mt-3">
          Description
        </dt>
        <dd className="bg-secondary text-white p-3 rounded-3">
          {videos[0].Description}
        </dd>

        <div className="d-flex justify-content-center gap-4 mt-4">
          <dt className="fw-bold text-success"> Likes</dt>
          <dd>
            <span className="badge bg-success fs-6 p-2">{videos[0].Likes}</span>
          </dd>

          <dt className="fw-bold text-danger"> Dislikes</dt>
          <dd>
            <span className="badge bg-danger fs-6 p-2">
              {videos[0].Dislikes}
            </span>
          </dd>

          <dt className="fw-bold text-info"> Views</dt>
          <dd>
            <span className="badge bg-info fs-6 p-2">{videos[0].Views}</span>
          </dd>
        </div>
      </dl>

      <div className="d-flex justify-content-center mb-4">
        <Tooltip title="Delete" placement="left" arrow="right">
          <div onClick={handleDeleteClick}>
            <Button variant="contained" color="error">
              <span className="bi bi-trash"></span>
            </Button>
          </div>
        </Tooltip>
        <Link to="/admin-dashboard">
          <Button className="ms-4" variant="contained" color="warning">
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  );
}
