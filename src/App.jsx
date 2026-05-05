import React, { useState, lazy, Suspense } from "react"; // 1. Added lazy and Suspense
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// 2. Change these to lazy imports
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const SignIn = lazy(() => import("./pages/SignIn"));

// Keep these as standard imports because they are visible immediately
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [theme, setTheme] = useState("light");

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

        {/* 3. Wrap Routes in Suspense to show a loader while a page is being downloaded */}
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home theme={theme} />} />
            <Route path="/products" element={<Products theme={theme} />} />
            <Route path="/about" element={<About theme={theme} />} />
            <Route path="/contact" element={<Contact theme={theme} />} />
            <Route path="/cart" element={<Cart theme={theme} />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Suspense>

        <Footer theme={theme} />
      </BrowserRouter>
    </div>
  );
};

export default App;
