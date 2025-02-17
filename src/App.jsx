import logo from './logo.svg';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import bootstrap from "bootstrap";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import { VideoHome } from './Components/video-home';

function App() {
  return (
    <div className='body-background'>
      <div className="bg-shade">
        <h2 className='text-center m-2 bg-dark text-white p-3 rounded'>Technologies Video Library</h2>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<VideoHome />} />
              </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
