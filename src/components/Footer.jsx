import React from "react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterXLine,
  RiYoutubeFill,
} from "react-icons/ri";
import "remixicon/fonts/remixicon.css";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap gap-12 justify-between px-8 md:px-16 py-20">
        {/* Column 1: Branding */}
        <div className="flex flex-col gap-6 max-w-xs">
          <h1 className="text-white font-black text-4xl tracking-tighter">
            <span className="text-red-500 font-serif">C</span>artzy
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Powering your world with the best in electronics. Innovation meets
            reliability.
          </p>
          <div className="space-y-2 text-gray-300 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-red-500">📍</span> 123 Example Road, New
              York, NY 12345
            </p>
            <p className="flex items-center gap-2">
              <span className="text-red-500">📞</span> (555) 555-5555
            </p>
          </div>
        </div>

        {/* Column 2: Customer Service */}
        <div className="flex flex-col gap-4 text-gray-400">
          <h3 className="text-white text-xl font-bold border-b-2 border-red-500 w-fit pb-1 mb-2 whitespace-nowrap">
            Customer Service
          </h3>
          <ul className="space-y-3">
            {[
              "Contact Us",
              "Shipping and Returns",
              "FAQs",
              "Order Tracking",
              "Size Guide",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-red-500 hover:translate-x-1 transition-all duration-300 cursor-pointer text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col gap-6">
          <h3 className="text-white text-xl font-bold border-b-2 border-red-500 w-fit pb-1">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {[
              RiInstagramFill,
              RiFacebookCircleFill,
              RiTwitterXLine,
              RiYoutubeFill,
            ].map((Icon, index) => (
              <Icon
                key={index}
                size={44}
                className="text-white rounded-xl cursor-pointer hover:bg-white hover:text-red-500 hover:-translate-y-2 transition-all duration-300 p-2.5 bg-red-500 shadow-lg shadow-red-500/20"
              />
            ))}
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div className="flex flex-col gap-5 max-w-sm">
          <h3 className="text-white text-2xl font-bold tracking-tight">
            Stay In Loop
          </h3>
          <p className="text-gray-400 text-sm">
            Subscribe to get special offers, Giveaways and much more!
          </p>

          <div className="flex w-full">
            <input
              type="email"
              placeholder="mail@site.com"
              className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-l-xl focus:outline-none focus:border-red-500 w-full transition-colors"
            />
            <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-bold px-6 py-3 rounded-r-xl transition-all active:scale-95 shadow-lg shadow-red-500/20">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#050505] py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 <span className="text-red-500 font-bold">Cartzy.</span> All
            Rights Reserved.
          </p>
          <div className="flex gap-6 text-gray-600 text-xs font-medium">
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
