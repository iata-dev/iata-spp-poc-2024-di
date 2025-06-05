import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScanInProgress from "./pages/newplatformuser/ScanInProgress";
import DeniedLogin from "./pages/successfulLogin/DeniedLogin";
import SuccessfulLogin from "./pages/successfulLogin/SuccessfulLogin";
import NewUser from "./pages/newplatformuser/NewUser";
import NewUser2 from "./pages/newplatformuser/NewUser2";
import Home from "./pages/Home";
import RequestCredential from "./pages/existingplatformuser/ScanQrCode";
import Scan from "./pages/newplatformuser/Scan";
import "./css/style.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/scanning" element={<ScanInProgress />} />

        <Route path="/new-user" element={<NewUser />} />
        <Route path="/new-user-2" element={<NewUser2 />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/request-credential" element={<RequestCredential />} />
        <Route path="/denied-login" element={<DeniedLogin />} />
        {/* Protected Routes */}
        <Route path="/successful-login" element={<SuccessfulLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
