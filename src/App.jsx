import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { VideoHome } from "./Components/video-home";
import { AdminLogin } from "./Components/admin-login";
import { UserLogin } from "./Components/user-login";
import { UserRegistration } from "./Components/user-register";
import "animate.css";

function App() {
  return (
    <div className="body-background">
      <div className="bg-shade ">
        <h2 className="animate__animated animate__fadeInRight text-center shadow-lg m-2 bg-dark text-white p-3 rounded">
          Technologies Video Library
        </h2>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VideoHome />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="user-login" element={<UserLogin />} />
            <Route path="user-register" element={<UserRegistration />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
