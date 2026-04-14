import { MapPin } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { CgClose } from "react-icons/cg";

const Navbar = ({
  userLocation,
  getLocation,
  openDropDown,
  setOpenDropDown,
}) => {
  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-20">
        <div className="flex items-center gap-10">
          <Link to={"/"}>
            <h1 className="text-4xl font-black tracking-tight select-none">
              <span className="text-red-500 font-serif">C</span>
              <span className="text-gray-900">artzy</span>
            </h1>
          </Link>

          <div className="relative">
            <div className="text-gray-700 flex gap-3 cursor-pointer items-center px-4 py-2 rounded-full border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group">
              <MapPin className="text-red-500 w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">
                {userLocation ? (
                  <div className="-space-y-0.5">
                    <p className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                      {userLocation.county}
                    </p>
                    <p className="text-gray-400 text-[12px]">
                      {userLocation.state}
                    </p>
                  </div>
                ) : (
                  <span className="text-gray-500 group-hover:text-red-500 transition-colors">
                    Add Address
                  </span>
                )}
              </span>

              <FaCaretDown
                aria-label="Toggle location dropdown"
                className="text-xs text-gray-400 group-hover:text-red-400 transition-colors ml-0.5"
                onClick={toggleDropDown}
              />
            </div>

            {openDropDown ? (
              <div className="w-64 z-50 absolute top-14 left-0 bg-white border border-gray-100 shadow-xl shadow-gray-100/80 p-6 rounded-2xl">
                <h1 className="font-bold mb-4 text-base text-gray-800 flex justify-between items-center">
                  Change Location
                  <span>
                    <CgClose
                      className="cursor-pointer text-lg text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => {
                        setOpenDropDown(false);
                      }}
                    />
                  </span>
                </h1>
                <button
                  onClick={getLocation}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl text-sm font-bold cursor-pointer active:scale-95 transition-all duration-200 shadow-sm shadow-red-200"
                >
                  Detect My Location
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <nav className="flex gap-8 items-center">
          <ul className="flex gap-2 items-center text-lg font-semibold list-none">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `transition-all duration-200 px-5 py-2 rounded-full block ${
                    isActive
                      ? "text-red-500 bg-red-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  `transition-all duration-200 px-5 py-2 rounded-full block ${
                    isActive
                      ? "text-red-500 bg-red-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `transition-all duration-200 px-5 py-2 rounded-full block ${
                    isActive
                      ? "text-red-500 bg-red-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  `transition-all duration-200 px-5 py-2 rounded-full block ${
                    isActive
                      ? "text-red-500 bg-red-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <Link
            to={"/cart"}
            aria-label="Cart, 0 items"
            className="relative flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 group"
          >
            <FaCartShopping className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
            <span className="bg-red-500 rounded-full w-5 h-5 font-bold text-[10px] text-white flex justify-center items-center absolute -top-1 -right-1 border-2 border-white shadow-sm">
              0
            </span>
          </Link>

          <div className="w-px h-6 bg-gray-200" />

          <div className="flex items-center gap-4">
            <Show when="signed-out">
              <SignInButton>
                <button className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-lg font-bold hover:bg-gray-700 active:scale-95 transition-all duration-200 shadow-sm">
                  Sign In
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="scale-125">
                <UserButton />
              </div>
            </Show>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
