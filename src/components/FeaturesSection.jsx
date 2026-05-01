import { Clock, Lock, Repeat, Truck } from "lucide-react";

// FIX: All 4 features had identical "Free Shipping" text — now each has correct label + description
const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On orders over $100",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "256-bit SSL encryption",
  },
  {
    icon: Repeat,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "We're always here to help",
  },
];

const FeaturesSection = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`py-10 px-4 border-y transition-colors duration-300 ${
        isDark ? "bg-[#111] border-white/10" : "bg-white border-gray-100"
      }`}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-2xl transition-colors duration-200 ${
              isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
            }`}
          >
            <div
              className={`p-2.5 rounded-xl shrink-0 ${isDark ? "bg-red-500/10" : "bg-red-50"}`}
            >
              <Icon size={22} className="text-red-500" />
            </div>
            <div>
              <p
                className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {title}
              </p>
              <p
                className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
