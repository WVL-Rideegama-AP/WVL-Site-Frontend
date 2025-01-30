import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Landing from "./components/Landing"; // Add your Landing component
import MainPage from "./API/Update";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Show Header only if the current path is not the landing page ("/") */}
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route path="/" element={<Landing />} /> {/* Landing page */}
        <Route path="/home" element={<Home />} /> {/* Home page */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/update" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
