import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import ModelsPage from "./pages/ModelsPage";
import GuitarDetailsPage from "./pages/GuitarDetailsPage";
import Footer from "./components/Fotter";
//import CustomFooter from "./components/Fotter";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<BrandsPage />} />
          <Route path="/models/:brandId" element={<ModelsPage />} />
          <Route
            path="/guitar/:brandId/:modelId"
            element={<GuitarDetailsPage />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
