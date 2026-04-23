import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products Listed" },
  { value: "50+", label: "Brands Available" },
  { value: "99%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: "⚡",
    title: "Fast Delivery",
    desc: "We partner with the best logistics providers to ensure your order reaches you as quickly as possible.",
  },
  {
    icon: "🔒",
    title: "Secure Payments",
    desc: "Your payment information is always encrypted and protected with industry-standard security protocols.",
  },
  {
    icon: "♻️",
    title: "Easy Returns",
    desc: "Not satisfied? Return within 30 days — no questions asked. Your trust matters more than anything.",
  },
  {
    icon: "🎧",
    title: "24/7 Support",
    desc: "Our support team is always available to help you with any queries, any time of day or night.",
  },
];

const team = [
  {
    name: "Adnan",
    role: "Founder & Developer",
    github: "https://github.com/anjumhere",
    initials: "A",
    color: "#ef4444",
  },
];

const useIntersection = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useIntersection();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const About = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        color: "#111",
        background: "#fff",
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 60px",
          position: "relative",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* decorative bg circle */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontFamily: "'Helvetica Neue', sans-serif",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#ef4444",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Our Story
          </p>

          <h1
            style={{
              fontSize: "clamp(42px, 7vw, 80px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-2px",
              color: "#0a0a0a",
              maxWidth: "780px",
              margin: "0 auto 28px",
            }}
          >
            We built{" "}
            <span
              style={{
                color: "#ef4444",
                fontStyle: "italic",
                fontFamily: "'Georgia', serif",
              }}
            >
              Cartzy
            </span>{" "}
            for everyone.
          </h1>

          <p
            style={{
              fontSize: "18px",
              fontFamily: "'Helvetica Neue', sans-serif",
              color: "#555",
              maxWidth: "560px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            A simple idea — bring the best electronics and accessories to your
            doorstep, at prices that actually make sense.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/products"
              style={{
                padding: "14px 32px",
                background: "#0a0a0a",
                color: "#fff",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "14px",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.5px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#ef4444")}
              onMouseLeave={(e) => (e.target.style.background = "#0a0a0a")}
            >
              Shop Now
            </a>
            <a
              href="/contact"
              style={{
                padding: "14px 32px",
                background: "transparent",
                color: "#0a0a0a",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "14px",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontWeight: 600,
                border: "1.5px solid #ddd",
                letterSpacing: "0.5px",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#ef4444";
                e.target.style.color = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#ddd";
                e.target.style.color = "#0a0a0a";
              }}
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            opacity: heroVisible ? 0.4 : 0,
            transition: "opacity 1s ease 1s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "sans-serif",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "#999",
              animation: "scrollPulse 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: "#0a0a0a", padding: "64px 24px" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "40px",
          }}
        >
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "clamp(36px, 5vw, 52px)",
                    fontWeight: 700,
                    color: "#ef4444",
                    margin: "0 0 6px",
                    letterSpacing: "-1px",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                    color: "#888",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {s.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── MISSION ── */}
      <section
        style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <FadeIn>
            <p
              style={{
                fontSize: "11px",
                fontFamily: "sans-serif",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#ef4444",
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              Our Mission
            </p>
            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 46px)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                color: "#0a0a0a",
                marginBottom: "24px",
              }}
            >
              Technology that fits your life — not your budget.
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'Helvetica Neue', sans-serif",
                color: "#555",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              Cartzy was born from a simple frustration — great electronics
              shouldn't cost a fortune. We curate the best products from trusted
              brands and bring them to you at honest prices.
            </p>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'Helvetica Neue', sans-serif",
                color: "#555",
                lineHeight: 1.8,
              }}
            >
              Every product on our platform goes through a quality check. No
              knockoffs. No compromises. Just tech you can rely on.
            </p>
          </FadeIn>

          {/* visual block */}
          <FadeIn delay={0.2}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  background: "#f9f9f9",
                  borderRadius: "24px",
                  padding: "48px 40px",
                  border: "1px solid #eee",
                }}
              >
                <div
                  style={{
                    fontSize: "64px",
                    marginBottom: "20px",
                    lineHeight: 1,
                  }}
                >
                  🛒
                </div>
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: "12px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Why Cartzy?
                </h3>
                {[
                  "Curated electronics & accessories",
                  "Competitive pricing always",
                  "Fast & reliable shipping",
                  "Hassle-free 30-day returns",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                      fontFamily: "'Helvetica Neue', sans-serif",
                      fontSize: "14px",
                      color: "#444",
                    }}
                  >
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#ef4444",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              {/* decorative accent */}
              <div
                style={{
                  position: "absolute",
                  top: "-16px",
                  right: "-16px",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  opacity: 0.12,
                  zIndex: -1,
                }}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: "#fafafa", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontFamily: "sans-serif",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "#ef4444",
                  marginBottom: "14px",
                  fontWeight: 600,
                }}
              >
                What We Stand For
              </p>
              <h2
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  letterSpacing: "-1px",
                  color: "#0a0a0a",
                }}
              >
                Our Core Values
              </h2>
            </div>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "20px",
                    padding: "36px 28px",
                    transition:
                      "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.07)";
                    e.currentTarget.style.borderColor = "#ef4444";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "#eee";
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "16px" }}>
                    {v.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#0a0a0a",
                      marginBottom: "10px",
                      fontFamily: "'Helvetica Neue', sans-serif",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      fontFamily: "'Helvetica Neue', sans-serif",
                      color: "#666",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section
        style={{ padding: "100px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p
              style={{
                fontSize: "11px",
                fontFamily: "sans-serif",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#ef4444",
                marginBottom: "14px",
                fontWeight: 600,
              }}
            >
              The Person Behind It
            </p>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-1px",
                color: "#0a0a0a",
              }}
            >
              Meet the Builder
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.1}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "24px",
                  padding: "48px 56px",
                  textAlign: "center",
                  maxWidth: "320px",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 24px 48px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: member.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 auto 20px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                  }}
                >
                  {member.initials}
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#0a0a0a",
                    marginBottom: "6px",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                    color: "#888",
                    marginBottom: "20px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {member.role}
                </p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 24px",
                    border: "1.5px solid #ddd",
                    borderRadius: "50px",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontFamily: "'Helvetica Neue', sans-serif",
                    color: "#444",
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#0a0a0a";
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "#0a0a0a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#444";
                    e.currentTarget.style.borderColor = "#ddd";
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "#0a0a0a",
          padding: "100px 24px",
          textAlign: "center",
        }}
      >
        <FadeIn>
          <p
            style={{
              fontSize: "11px",
              fontFamily: "sans-serif",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#ef4444",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Ready?
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-1.5px",
              marginBottom: "24px",
              lineHeight: 1.1,
            }}
          >
            Start shopping smarter today.
          </h2>
          <p
            style={{
              fontSize: "16px",
              fontFamily: "'Helvetica Neue', sans-serif",
              color: "#888",
              marginBottom: "40px",
              maxWidth: "480px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Browse our full collection of electronics and accessories — all at
            prices you'll love.
          </p>
          <a
            href="/products"
            style={{
              display: "inline-block",
              padding: "16px 40px",
              background: "#ef4444",
              color: "#fff",
              borderRadius: "50px",
              textDecoration: "none",
              fontSize: "15px",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.5px",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#dc2626";
              e.target.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ef4444";
              e.target.style.transform = "scale(1)";
            }}
          >
            Explore Products →
          </a>
        </FadeIn>
      </section>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.2; transform: scaleY(0.6); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </div>
  );
};

export default About;
