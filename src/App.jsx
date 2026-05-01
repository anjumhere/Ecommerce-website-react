import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import axios from "axios";

const App = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const response = await axios.get(url);
        setUserLocation(response.data.address);
        setOpenDropDown(false);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    });
  };

  return (
    // Apply dark/light class at root so all children can respond
    <div className={theme === "dark" ? "dark" : ""}>
      <BrowserRouter>
        <Navbar
          userLocation={userLocation}
          getLocation={getLocation}
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/products" element={<Products theme={theme} />} />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
          <Route path="/cart" element={<Cart theme={theme} />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>

        <Footer theme={theme} />
      </BrowserRouter>
    </div>
  );
};

export default App;
