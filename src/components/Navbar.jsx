import { MapPin } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { CgClose } from "react-icons/cg";

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  return (
    <div className="bg-white/80 backdrop-blur-md py-0 border-b shadow-2xl  border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Link to={"/"}>
            <h1 className="text-2xl font-black tracking-tight select-none">
              <span className="text-red-500">C</span>
              <span className="text-gray-900">artzy</span>
            </h1>
          </Link>

          <div
            onClick={toggleDropDown}
            className="flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-full border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <div className="text-xs leading-tight">
              {location ? (
                <>
                  <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                    {location.county}
                  </p>
                  <p className="text-gray-400">{location.state}</p>
                </>
              ) : (
                <span className="font-medium text-gray-500 group-hover:text-red-500 transition-colors">
                  Add address
                </span>
              )}
            </div>
            <FaCaretDown className="text-gray-400 text-[10px] group-hover:text-red-400 transition-colors ml-0.5" />
          </div>

          {openDropDown && (
            <div className="w-56 z-50 fixed bg-white top-20 left-56 border border-gray-100 shadow-xl shadow-gray-100/80 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-semibold text-gray-800">
                  Your Location
                </p>
                <CgClose
                  className="cursor-pointer text-base text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => setOpenDropDown(false)}
                />
              </div>
              <button
                onClick={getLocation}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 shadow-sm shadow-red-200"
              >
                <MapPin className="w-3.5 h-3.5" />
                Detect My Location
              </button>
            </div>
          )}
        </div>

        {/* Center Nav */}
        <ul className="flex items-center gap-1">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 list-none ${
                  isActive
                    ? "text-red-500 bg-red-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              <li>{label}</li>
            </NavLink>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            to={"/cart"}
            className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group"
          >
            <FaCartShopping className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              0
            </span>
          </Link>

          <div className="w-px h-5 bg-gray-200" />

          <Show when="signed-out">
            <SignInButton>
              <button className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-sm">
                Sign in
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
