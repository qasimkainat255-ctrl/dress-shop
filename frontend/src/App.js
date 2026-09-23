import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}
      <Navbar />

      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;