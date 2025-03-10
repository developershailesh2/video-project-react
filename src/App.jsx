import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VideoHome } from "./Components/video-home";
import { AdminLogin } from "./Components/admin-login";
import { UserLogin } from "./Components/user-login";
import { UserRegistration } from "./Components/user-register";
import { UserDashBoard } from "./Components/user-dashboard";
import { AdminDashBoard } from "./Components/admin-dashboard";
import { AdminAddVideo } from "./Components/admin-add-video";
import { AdminEditVideo } from "./Components/admin-edit-video";
import { AdminDeleteVideo } from "./Components/admin-delete-video";

function App() {
  return (
    <div className="body-background">
      <div className="bg-shade">
        <div className="fs-2 fw-bold bg-dark text-uppercase animate__animated animate__fadeInRight text-center text-warning shadow-lg m-2 p-3 rounded">
          Technologies Video Library
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VideoHome />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="user-login" element={<UserLogin />} />
            <Route path="user-register" element={<UserRegistration />} />
            <Route path="user-dashboard" element={<UserDashBoard />} />
            <Route path="admin-dashboard" element={<AdminDashBoard />} />
            <Route path="add-video" element={<AdminAddVideo />} />
            <Route path="edit-video/:id" element={<AdminEditVideo />} />
            <Route path="delete-video/:id" element={<AdminDeleteVideo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
