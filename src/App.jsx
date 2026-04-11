import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import axios from "axios";

const App = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  const [userLocation, setUserLocation] = useState(null);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const response = await axios.get(url);
        const exactLocation = response.data.address;

        setUserLocation(exactLocation);
        setOpenDropDown(false);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    });
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar
          userLocation={userLocation}
          getLocation={getLocation}
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
/* Improvements 
Removed useEffect import
location state → userLocation
setLocation → setUserLocation
const location = await axios.get() → const response
location.data.address → response.data.address
setLocation(exactLocation) → setUserLocation(exactLocation)
console.log → console.error
Removed className=" " from wrapper div
<Route path="/"> → <Route path="/" />
<Route path="/products"> → <Route path="/products" />
<Route path="/about"> → <Route path="/about" />
<Route path="/contact"> → <Route path="/contact" />
<Route path="/cart"> → <Route path="/cart" />
<Route path="/signin"> → <Route path="/signin" />
Prop location={location} → userLocation={userLocation}
*/
