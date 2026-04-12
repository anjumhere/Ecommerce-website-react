import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // ← add Autoplay

import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
const Carousel = () => {
  const { data } = useContext(DataContext);
  const colors = [
    { bg: "#1a1a2e", accent: "#e94560" },
    { bg: "#0f3460", accent: "#e94560" },
    { bg: "#16213e", accent: "#00b4d8" },
    { bg: "#1b262c", accent: "#f5a623" },
    { bg: "#2d132c", accent: "#ee4540" },
  ];
  return (
    <div style={{ width: "100%" }}>
      <Swiper
        navigation={true}
        autoplay={{ delay: 4000 }} // ← moves every 3 seconds
        modules={[Navigation, Autoplay]} // ← add Autoplay here
        style={{ height: "85vh" }}
      >
        {data &&
          data.map((product, index) => {
            const color = colors[index % colors.length];
            return (
              <SwiperSlide
                key={product.id}
                style={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  background: color.bg,
                  color: "white", // ← color.bg not colors.bg
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "60%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "0 60px",
                  }}
                >
                  <button
                    style={{
                      background: color.accent,
                      textTransform: "capitalize",
                    }}
                    className="px-5 py-2 rounded-full"
                  >
                    {product.category}
                  </button>
                  <h1
                    style={{
                      fontSize: "35px",
                      fontWeight: "bold",
                      wordWrap: "wrap",
                    }}
                  >
                    {product.title}
                  </h1>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <p className="text-gray-500 line-through font-semibold text-xl">
                      $
                      {(
                        product.price /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>
                    <p
                      className="text-3xl font-bold"
                      style={{ color: color.accent }}
                    >
                      ${product.price}
                    </p>
                  </div>
                  <button
                    style={{ background: color.accent }}
                    className=" transition-scale duration-500 px-15 py-3 rounded-full hover:brightness-110 cursor-pointer hover:scale-101 shadow-2xl shadow-black"
                  >
                    Shop Now
                  </button>
                </div>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="hover:scale-110 transition-all duration-500"
                    src={product.images[0]}
                    alt={product.description}
                    style={{ height: " 100%", objectFit: "contain" }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};

export default Carousel;
