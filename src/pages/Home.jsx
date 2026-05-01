import React from "react";
import Carousel from "../components/Carousel";
import MidBanner from "../components/MidBanner";
import FeaturesSection from "../components/FeaturesSection";

const Home = ({ theme }) => {
  return (
    <>
      <Carousel theme={theme} />
      <MidBanner theme={theme} />
      <FeaturesSection theme={theme} />
    </>
  );
};

export default Home;
