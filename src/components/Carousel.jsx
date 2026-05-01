import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

const colors = [
  { bg: "#0a0a0a", accent: "#ff6b35" },
  { bg: "#060d18", accent: "#3b82f6" },
  { bg: "#08060f", accent: "#a855f7" },
  { bg: "#06100a", accent: "#22c55e" },
  { bg: "#100808", accent: "#f43f5e" },
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

const Carousel = ({ theme }) => {
  const { data, fetchAllProducts } = getData();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const navigate = useNavigate();
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Swiper
        navigation={false}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay]}
        style={{ height: isMobile ? "100svh" : "90vh" }}
      >
        {data &&
          data.map((product, index) => {
            const color = colors[index % colors.length];
            const hex = color.accent;

            return (
              <SwiperSlide
                key={product.id}
                style={{
                  background: color.bg,
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {/* IMAGE — top on mobile, right on desktop */}
                <div
                  style={{
                    width: isMobile ? "100%" : "45%",
                    height: isMobile ? "42%" : "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    flexShrink: 0,
                    order: isMobile ? 1 : 2,
                  }}
                >
                  {/* Glow */}
                  <div
                    style={{
                      position: "absolute",
                      width: isMobile ? "200px" : "380px",
                      height: isMobile ? "200px" : "380px",
                      borderRadius: "50%",
                      background: hex,
                      opacity: 0.18,
                      filter: "blur(80px)",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Product image */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{
                      height: isMobile ? "80%" : "72%",
                      maxWidth: "85%",
                      objectFit: "contain",
                      position: "relative",
                      zIndex: 10,
                      filter: `drop-shadow(0 20px 40px ${hex}55)`,
                      animation: "floatY 5s ease-in-out infinite",
                      willChange: "transform",
                    }}
                  />
                  {/* Decorative rings — desktop only */}
                  {!isMobile && (
                    <>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "32px",
                          right: "32px",
                          width: "140px",
                          height: "140px",
                          borderRadius: "50%",
                          border: `2px solid ${hex}`,
                          opacity: 0.1,
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "56px",
                          right: "56px",
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          border: `2px solid ${hex}`,
                          opacity: 0.1,
                          pointerEvents: "none",
                        }}
                      />
                    </>
                  )}
                </div>

                {/* CONTENT — bottom on mobile, left on desktop */}
                <div
                  style={{
                    width: isMobile ? "100%" : "55%",
                    height: isMobile ? "58%" : "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: isMobile ? "flex-start" : "center",
                    padding: isMobile ? "16px 24px 20px" : "0 72px",
                    gap: isMobile ? "10px" : "18px",
                    order: isMobile ? 2 : 1,
                    flexShrink: 0,
                    overflowY: "hidden",
                  }}
                >
                  {/* Category */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: `${hex}99`,
                    }}
                  >
                    {product.category}
                  </span>

                  {/* Title */}
                  <h1
                    style={{
                      fontSize: isMobile ? "20px" : "clamp(28px, 3.2vw, 52px)",
                      fontWeight: 800,
                      color: "#fff",
                      lineHeight: 1.2,
                      margin: 0,
                      maxWidth: isMobile ? "100%" : "520px",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : "unset",
                      WebkitBoxOrient: "vertical",
                      overflow: isMobile ? "hidden" : "visible",
                    }}
                  >
                    {product.title}
                  </h1>

                  {/* Accent bar */}
                  <div
                    style={{
                      width: "36px",
                      height: "3px",
                      borderRadius: "99px",
                      background: hex,
                      flexShrink: 0,
                    }}
                  />

                  {/* Pricing */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.25)",
                        textDecoration: "line-through",
                        fontStyle: "italic",
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
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: isMobile
                            ? "30px"
                            : "clamp(32px, 3.8vw, 54px)",
                          fontWeight: 900,
                          letterSpacing: "-1.5px",
                          color: hex,
                          lineHeight: 1,
                        }}
                      >
                        ${product.price}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "6px",
                          background: `${hex}22`,
                          color: hex,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.discountPercentage.toFixed(0)}% OFF
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: isMobile ? "2px" : "6px",
                    }}
                  >
                    <button
                      style={{
                        padding: isMobile ? "10px 22px" : "13px 30px",
                        borderRadius: "99px",
                        background: hex,
                        color: "#fff",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: `0 6px 20px ${hex}44`,
                        transition: "filter 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter = "brightness(1.15)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter = "brightness(1)")
                      }
                      onClick={() => navigate("/products")}
                    >
                      Shop Now
                    </button>
                    <button
                      style={{
                        padding: isMobile ? "10px 18px" : "13px 28px",
                        borderRadius: "99px",
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.65)",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: 500,
                        border: "1px solid rgba(255,255,255,0.12)",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.12)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.06)")
                      }
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      <Category colors={colors} />

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  );
};

export default Carousel;
