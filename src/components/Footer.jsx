import React from "react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterXLine,
  RiYoutubeFill,
} from "react-icons/ri";

const Footer = ({ theme }) => {
  const isDark = theme === "dark";

  const bg = isDark ? "bg-[#050505]" : "bg-[#0a0a0a]";
  const border = isDark ? "border-white/10" : "border-gray-800";

  return (
    <footer className={`${bg} border-t ${border}`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 sm:px-10 py-16">
        {/* Branding */}
        <div className="flex flex-col gap-5">
          <h1 className="text-white font-black text-3xl tracking-tighter">
            <span className="text-red-500 font-serif">C</span>artzy
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Powering your world with the best in electronics. Innovation meets
            reliability.
          </p>
          <div className="space-y-2 text-gray-400 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-red-500">📍</span> 123 Example Road, New
              York, NY 12345
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500">📞</span> (555) 555-5555
            </p>
          </div>
        </div>

        {/* Customer Service */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-base font-bold border-b-2 border-red-500 w-fit pb-1">
            Customer Service
          </h3>
          <ul className="space-y-2.5">
            {[
              "Contact Us",
              "Shipping and Returns",
              "FAQs",
              "Order Tracking",
              "Size Guide",
            ].map((item) => (
              <li
                key={item}
                className="text-gray-400 hover:text-red-400 hover:translate-x-1 transition-all duration-200 cursor-pointer text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col gap-5">
          <h3 className="text-white text-base font-bold border-b-2 border-red-500 w-fit pb-1">
            Follow Us
          </h3>
          <div className="flex gap-3 flex-wrap">
            {[
              RiInstagramFill,
              RiFacebookCircleFill,
              RiTwitterXLine,
              RiYoutubeFill,
            ].map((Icon, index) => (
              <Icon
                key={index}
                size={40}
                className="text-white rounded-xl cursor-pointer hover:bg-white hover:text-red-500 hover:-translate-y-1.5 transition-all duration-300 p-2 bg-red-500 shadow-lg shadow-red-500/20"
              />
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white text-lg font-bold">Stay In Loop</h3>
          <p className="text-gray-400 text-sm">
            Subscribe for special offers, giveaways and more!
          </p>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="mail@site.com"
              className="bg-gray-800 border border-gray-700 text-white px-3 py-2.5 rounded-l-xl focus:outline-none focus:border-red-500 w-full text-sm transition-colors"
            />
            <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold px-4 py-2.5 rounded-r-xl transition-all active:scale-95 text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${border} py-6`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © 2026 <span className="text-red-500 font-bold">Cartzy.</span> All
            Rights Reserved.
          </p>
          <div className="flex gap-5 text-gray-600 text-xs font-medium">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
