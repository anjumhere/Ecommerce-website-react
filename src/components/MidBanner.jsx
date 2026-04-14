import React from "react";
import banner from "/src/assets/banner.jpg";

const MidBanner = () => {
  return (
    <div className="w-full py-10 px-4 flex justify-center items-center bg-gray-50">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${banner})`,
          height: "550px",
          // CHANGED: Use maxWidth instead of width for responsiveness
          width: "100%",
          maxWidth: "1100px",
          borderRadius: "20px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="shadow-2xl flex justify-center items-center text-white flex-col gap-5"
      >
        <h1 className="text-5xl font-bold">
          Next-Gen Electronics At Your Fingertips
        </h1>
        <p className="text-xl font-semibold">
          Discover the tech innovations with unbeatable prices and free shipping
          on all orders.
        </p>
        <button className="px-9 py-2 rounded-lg bg-red-500 text-white hover:brightness-105 active:scale-95 cursor-pointer ">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default MidBanner;
