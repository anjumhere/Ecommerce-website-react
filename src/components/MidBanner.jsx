import React from "react";
import banner from "/src/assets/banner.jpg";

const MidBanner = () => {
  return (
    <div className="w-full py-6 sm:py-10 px-3 sm:px-4 flex justify-center items-center bg-gray-50">
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${banner})`,
          minHeight: "300px",
          height: "auto",
          width: "100%",
          maxWidth: "1100px",
          borderRadius: "16px",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
        className="shadow-2xl flex justify-center items-center text-white flex-col gap-3 sm:gap-5 text-center px-4 sm:px-6 py-12 sm:py-16 md:py-20"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-[90%] sm:max-w-[80%] leading-tight">
          Next-Gen Electronics At Your Fingertips
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-[85%] sm:max-w-[75%] text-white/90">
          Discover the tech innovations with unbeatable prices and free shipping
          on all orders.
        </p>
        <button className="px-6 sm:px-8 md:px-9 py-2 sm:py-2.5 md:py-3 rounded-full md:rounded-lg bg-red-500 text-white text-sm sm:text-base hover:bg-red-600 active:scale-95 cursor-pointer transition-all duration-200 shadow-lg shadow-red-500/30">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default MidBanner;
