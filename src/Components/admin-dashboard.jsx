import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {Button, Tooltip} from "@mui/material";

export function AdminDashBoard() {
  let navigate = useNavigate();

  const [Cookies, removeCookie] = useCookies(["userid"]);

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
      .catch((error) => console.log(error));
  }, []);

  function handleSignOut() {
    removeCookie("userid");
    navigate("/admin-login");
  }

  return (
    <div className="bg-light m-2 p-2">
      <h3 className="d-flex justify-content-evenly">
         <span className="animate__animated animate__fadeInLeft text-muted">Admin {Cookies["userid"]}</span>{" "}
        <Tooltip title="Log Out" arrow placement="right">
        <Button className="animate__animated animate__fadeInRight " onClick={handleSignOut} variant="contained" color="error">
          Log Out
        </Button>
        </Tooltip>
      </h3>
    
      <div className="mt-3">
        <Link to="/add-video">
          {" "}
           <Tooltip title="Add" placement="right" arrow>
            <Button variant="contained" color="success">Add New Video</Button></Tooltip>
        </Link>
      </div>

          <div className="row bg-info rounded-2 mt-3">
           
              {
                videos.map(video => 
                <div className="col-md-4 mt-4 mb-4" key={video.VideoId}>
                  <div className="card h-100 m-3 p-3">
                  <div className="card-body">
                      <iframe src={video.Url} 
                      width="100%"
                      height="250px"
                      title="Youtube Video Player"
                      allow="accelerometer; 
                      autoplay; 
                      clipboard-write; 
                      encrypted-media; 
                      gyroscope; picture-in-picture"
                      allowFullScreen
                      className="card-img-top"  />
                    <h3 className="card-title text-dark">{video.Title}</h3>
                    <p className="card-text overflow-auto" style={{maxHeight : "100px"}}>{video.Description}</p>
                    
                  </div>
                  <div className="mt-auto card-footer bg-white">
                  <div className="d-flex justify-content-evenly">
                    <Tooltip placement="top" title="Edit" arrow>
                    <Link to={`/edit-video/${video.VideoId}`}>
                    <Button variant="outlined" color="secondary">EDIT</Button>
                    </Link>
                    </Tooltip>
                    <Tooltip placement="top" title="Delete" arrow>
                    <Link to={`/delete-video/${video.VideoId}`}>
                    <Button variant="outlined" color="error">DELETE</Button>
                    </Link>
                    </Tooltip>
                  </div>
                  </div>
                </div>
                </div>
                )
              }
            
          </div>
    </div>
  );
}
