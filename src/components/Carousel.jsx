import { useContext, useEffect } from "react";
import { getData } from "../context/DataContext";
import { Autoplay, Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import Category from "./Category";

const colors = [
  { bg: "#0a0a0a", accent: "#ff6b35" },
  { bg: "#060d18", accent: "#3b82f6" },
  { bg: "#08060f", accent: "#a855f7" },
  { bg: "#06100a", accent: "#22c55e" },
  { bg: "#100808", accent: "#f43f5e" },
];

const Carousel = () => {
  const { data, fetchAllProducts } = getData();

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Swiper
        navigation={false}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
        style={{ height: "90vh" }}
      >
        {data &&
          data.map((product, index) => {
            const color = colors[index % colors.length];
            const hex = color.accent;

            return (
              <SwiperSlide
                key={product.id}
                style={{
                  display: "flex",
                  background: color.bg,
                }}
              >
                {/* LEFT */}
                <div
                  style={{
                    width: "55%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 52px",
                    gap: "24px",
                  }}
                >
                  {/* Category */}
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {product.category}
                  </span>

                  {/* Title */}
                  <h1
                    style={{
                      fontSize: "clamp(22px, 3.2vw, 38px)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      color: "white",
                      maxWidth: "400px",
                    }}
                  >
                    {product.title}
                  </h1>

                  {/* Accent line */}
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      borderRadius: "2px",
                      background: hex,
                    }}
                  />

                  {/* Price */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.3)",
                        textDecoration: "line-through",
                      }}
                    >
                      $
                      {(
                        product.price /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </span>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "42px",
                          fontWeight: 800,
                          color: hex,
                          letterSpacing: "-1px",
                          lineHeight: 1,
                        }}
                      >
                        ${product.price}
                      </span>

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: "6px",
                          background: `${hex}22`,
                          color: hex,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {product.discountPercentage.toFixed(0)}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div
                    style={{ display: "flex", gap: "12px", marginTop: "4px" }}
                  >
                    <button
                      style={{
                        padding: "13px 32px",
                        borderRadius: "999px",
                        border: "none",
                        background: hex,
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: "0.03em",
                      }}
                    >
                      Shop Now
                    </button>
                    <button
                      style={{
                        padding: "12px 24px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "transparent",
                        color: "rgba(255,255,255,0.65)",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  style={{
                    width: "45%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Glow blob */}
                  <div
                    style={{
                      position: "absolute",
                      width: "340px",
                      height: "340px",
                      borderRadius: "50%",
                      background: hex,
                      opacity: 0.12,
                      filter: "blur(70px)",
                    }}
                  />
                  <img
                    className="hover:scale-110 transition-all duration-500"
                    src={product.images[0]}
                    alt={product.description}
                    style={{
                      maxHeight: "75%",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 2,
                      filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))",
                    }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Category colors={colors} />;
    </div>
  );
};

export default Carousel;
