const Category = () => {
  const items = [
    { id: 1, item: "smart speaker" },
    { id: 2, item: "wireless earphones" },
    { id: 3, item: "over-ear headphones" },
    { id: 4, item: "wireless charger" },
    { id: 5, item: "charger" },
    { id: 6, item: "power bank" },
    { id: 7, item: "smartwatch" },
    { id: 8, item: "phone accessories" },
    { id: 9, item: "camera accessories" },
    { id: 10, item: "selfie accessories" },
  ];

  const colors = [
    { bg: "#eff6ff", text: "#1e40af", border: "#bfdbfe" },
    { bg: "#f5f3ff", text: "#5b21b6", border: "#ddd6fe" },
    { bg: "#f0fdf4", text: "#166534", border: "#bbf7d0" },
    { bg: "#fff7ed", text: "#9a3412", border: "#ffedd5" },
    { bg: "#fdf2f8", text: "#9d174d", border: "#fbcfe8" },
  ];

  const doubleItems = [...items, ...items];

  return (
    <div className="marquee-container w-full bg-[#fafafa] overflow-hidden py-8 border-y border-gray-100 mt-10 border-2 border-gray-200">
      <div className="animate-marquee flex gap-6">
        {doubleItems.map((item, index) => {
          const color = colors[index % colors.length];
          return (
            <div
              key={`${item.id}-${index}`}
              style={{
                backgroundColor: color.bg,
                color: color.text,
                borderColor: color.border,
              }}
              className="group rounded-xl border-[1px] whitespace-nowrap text-[13px] font-medium flex justify-center items-center px-6 h-12 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              {/* Added a subtle dot for a more professional "UI" look */}
              <span
                className="w-1.5 h-1.5 rounded-full mr-3 opacity-60"
                style={{ backgroundColor: color.text }}
              ></span>
              {item.item.toUpperCase()}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: scroll 35s linear infinite;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Category;
