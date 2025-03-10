import { Button, Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./admin-delete-video.css";

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
    // axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);
    // Swal.fire({
    //   icon: "success",
    //   text: "Video Deleted Successfully",
    // });
    // navigate("/admin-dashboard");

    Swal.fire({
      title: "Are You Sure?",
      timer: 2000,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Video has been deleted.",
          icon: "success",
        });
        navigate("/admin-dashboard");
      }
    });
  }

  return (
    <div className="container-fluid">
      <h4 className="animate__animated animate__fadeInLeft fs-3 text-danger text-center rounded-2 p-3">
        Are You Sure Want To Delete?
      </h4>
      <div className="row animate__animated  animate__fadeInRight rounded-1 fs-5 fw-semibold m-3 p-3">
        <div className="col-md-6 text-dark">Title</div>
        <div className="col-md-4 text-warning fs-4">{videos[0].Title}</div>
        <div className="col-md-6 mt-3 text-dark">Description</div>
        <div className="col-md-4 mt-3 text-info">{videos[0].Description}</div>
        <div className="col-md-6 text-dark mt-3">Likes</div>
        <div className="col-md-4 bi bi-hand-thumbs-up-fill mt-3 text-dark">
          {videos[0].Likes}
        </div>

        <div className="col-md-6 text-dark mt-3">Dislikes</div>
        <div className="col-md-4 bi bi-hand-thumbs-down-fill mt-3 text-dark">
          {videos[0].Dislikes}
        </div>
        <div className="col-md-6 text-dark  mt-3">Views</div>
        <div className="col-md-4 mt-3 bi bi-eye-fill text-dark">
          {videos[0].Views}
        </div>
      </div>
      <div className="d-flex justify-content-center mb-4">
        <Tooltip title="Delete Video" placement="left" arrow>
          <Button onClick={handleDeleteClick} variant="contained" color="error">
            <span className="fs-5 bi bi-trash-fill fw-bold">Delete</span>
          </Button>
        </Tooltip>

        <Link to={`/admin-dashboard`}>
          <Button variant="contained" className="ms-3 fs-5">
            <span className="fw-bold">Cancel</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
