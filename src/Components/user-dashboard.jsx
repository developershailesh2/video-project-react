import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addToWatchLater } from "../slicers/video-slicer";
import store from "../store/store";

export function UserDashBoard() {
  const [Cookies, setCookie, removeCookie] = useCookies(["username"]);
  const [videos, setVideos] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      Views: "",
      Comments: [""],
      CategoryId: 0,
    },
  ]);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  function handlesignOut() {
    removeCookie("username");
    navigate("/user-login");
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5050/get-videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch(console.error("error"));
  }, []);

  function handleSaveClick(video) {
    Swal.fire({
      icon: "success",
      text: "Video Saved",
    });
    dispatch(addToWatchLater(video));
  }

  function handleCountChange(value) {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  }

  return (
    <>
      <div className="text-white m-2 p-2 rounded-2">
        <div className="d-flex justify-content-evenly">
          <span className="animate__animated animate__fadeInLeft text-light fs-3 fw-bolder">
            Welcome {Cookies["username"]}{" "}
          </span>{" "}
          <div>
            <Tooltip placement="right" title="Sign Out" arrow>
              <Button
                className="animate__animated animate__fadeInRightBig"
                onClick={handlesignOut}
                variant="contained"
                color="error"
              >
                Sign Out
              </Button>
            </Tooltip>
          </div>
          <div>
            <Button className="fw-bold" variant="contained" color="warning">
              {store.getState().store.VideosCount}
            </Button>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center row m-4 m-md-3 rounded p-3">
        <div className="col-12 col-md-6 col-lg-3 mb-3 mb-md-0">
          <div className="input-group">
            <TextField
              type="text"
              color="warning"
              placeholder="Search Videos"
              className="form-control"
            />
            <button className="bi bi-search btn btn-warning"></button>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3 rounded">
          <div className="mb-2 mb-md-0">
            {/* <select className="form-select">
                <option value="">Select Category</option>
                <option value="java">Java</option>
                <option value="react">React</option>
                <option value="python">Python</option>
                <option value="cloud">Cloud</option>
              </select> */}
            <FormControl className="bg-light" color="primary" fullWidth>
              <InputLabel id="select-category">Select Category</InputLabel>
              <Select
                label="Select Category"
                id="select-category"
                color="secondary"
              >
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="react">React</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="banking">Banking</MenuItem>
                <MenuItem value="songs">Songs</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      <div className="row m-3 p-3 mb-3 " style={{ animationDuration: "1.45s" }}>
        {videos.map((video) => (
          <div
            className="animate__animated animate__fadeInLeft col-md-3 mb-4"
            key={video.VideoId}
          >
            <div className="card h-100 shadow-lg">
              <div className="card-body">
                <iframe
                  src={video.Url}
                  width="100%"
                  height="250px"
                  title={video.Title}
                  allow="accelerometer"
                  autoplay
                  allowFullScreen
                  className="card-img-top"
                ></iframe>
                <div className="d-flex mt-2 mb-2 fw-bold text-muted justify-content-evenly">
                  <span
                    onChange={(e) => handleCountChange(e.target.value)}
                    className="bi bi-eye-fill"
                  >
                    {handleCountChange(video.Views)}
                  </span>
                  <span className="bi bi-hand-thumbs-up-fill">
                    {handleCountChange(video.Likes)}
                  </span>
                  <span className="bi bi-hand-thumbs-down-fill">
                    {handleCountChange(video.Dislikes)}
                  </span>
                </div>
                <h3 className="card-title mt-2">{video.Title}</h3>
                <p
                  className="mt-4 card-text overflow-auto"
                  style={{ maxHeight: "95px" }}
                >
                  {video.Description}
                </p>
              </div>
              <div className="mt-auto card-footer bg-light">
                <div className="d-flex justify-content-center m-2">
                  <Button
                    onClick={() => handleSaveClick(video)}
                    className="text-uppercase"
                    variant="contained"
                    color="warning"
                  >
                    Watch Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
