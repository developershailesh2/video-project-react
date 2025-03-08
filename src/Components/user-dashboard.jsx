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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5050/get-videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch(console.error("error"));
  }, []);

  let navigate = useNavigate();

  function handlesignOut() {
    removeCookie("username");
    navigate("/user-login");
  }

  function handleCountChange(value) {
    if (value >= 1000 && value < 900000)
      return `${(value / 10000).toFixed(1)}K`;
    if (value >= 1000000) return `${(value / 100000).toFixed(1)}M`;
    if (value >= 2000000) return `${(value / 200000).toFixed(1)}M`;
    if (value >= 3000000) return `${(value / 300000).toFixed(1)}M`;
    if (value >= 4000000) return `${(value / 400000).toFixed(1)}M`;
    if (value >= 5000000) return `${(value / 500000).toFixed(1)}M`;
    return value.toLocaleString();
  }

  return (
    <>
      <div className="text-white m-2 p-2 rounded-2">
        <div className="d-flex justify-content-evenly">
          <span className="animate__animated animate__fadeInLeft text-dark fw-bold fs-4">
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
        </div>
      </div>

      <div className="d-flex justify-content-center row border border-dark m-4 m-md-3 rounded p-3">
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

        <div className="col-12 col-md-6 col-lg-3">
          <div className="mb-2 mb-md-0">
            {/* <select className="form-select">
                <option value="">Select Category</option>
                <option value="java">Java</option>
                <option value="react">React</option>
                <option value="python">Python</option>
                <option value="cloud">Cloud</option>
              </select> */}
            <FormControl fullWidth>
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

      <div
        className="row m-3 bg-light rounded-2 p-3 mb-3 "
        style={{ animationDuration: "1.45s" }}
      >
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
