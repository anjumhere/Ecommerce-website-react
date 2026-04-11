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
    <div className="bg-white py-3 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-7 ">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-500 font-serif">C</span>artzy
            </h1>
          </Link>
          <div className="text-gray-700 flex gap-1 cursor-pointer items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold ">
              {location ? (
                <div className="-space-y-2">
                  <p>{location.county}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown
              className="text-lg hover:text-red-500"
              onClick={toggleDropDown}
            />
          </div>
          {openDropDown ? (
            <div className="w-[250px] h-max shadow-2xl z-50 fixed bg-white top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl  flex justify-between ">
                Change Location
                <span>
                  <CgClose
                    className="cursor-pointer text-xl hover:text-red-500 font-bold"
                    onClick={() => {
                      setOpenDropDown(false);
                    }}
                  />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-red-500 hover:bg-red-400 hover:text-white text-white  px-4   py-2 rounded-lg text-sm cursor-pointer active:scale-97"
              >
                Detect My Location
              </button>
            </div>
          ) : null}
        </div>
        <nav className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive
                    ? "border-b-3 border-red-500"
                    : "border-b-3 border-transparent"
                }`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive
                    ? "border-b-3 border-red-500"
                    : "border-b-3 border-transparent"
                }`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive
                    ? "border-b-3 border-red-500 "
                    : "border-b-3 border-transparent"
                }`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive
                    ? "border-b-3 border-red-500"
                    : "border-b-3 border-transparent"
                }`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className=" relative">
            <FaCartShopping className="h-6 w-7 " />
            <span className="bg-red-500 rounded-full px-2 py-1 font-bold text-xs text-white flex justify-center items-center absolute bottom-4 left-5">
              0
            </span>
          </Link>
          <div className="flex items-center gap-2 ">
            <Show when="signed-out">
              <SignInButton>
                <button className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-all duration-300">
                  Sign In
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
