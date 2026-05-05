import { useState } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { CgClose } from "react-icons/cg";
import { getData } from "../context/DataContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = ({
  userLocation,
  getLocation,
  openDropDown,
  setOpenDropDown,
  theme,
  toggleTheme,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems } = getData();

  const toggleDropDown = () => setOpenDropDown((prev) => !prev);

  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        isDark
          ? "bg-[#0a0a0a]/90 border-white/10"
          : "bg-white/90 border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 h-16 sm:h-20">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-8">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight select-none">
              <span className="text-red-500 font-serif">C</span>
              <span className={isDark ? "text-white" : "text-gray-900"}>
                artzy
              </span>
            </h1>
          </Link>

          {/* Location — hidden on small screens */}
          <div className="relative hidden md:block">
            <div
              className={`flex gap-2 cursor-pointer items-center px-3 py-2 rounded-full border transition-all duration-200 group ${
                isDark
                  ? "border-white/10 hover:border-red-400 hover:bg-red-500/10"
                  : "border-gray-200 hover:border-red-300 hover:bg-red-50"
              }`}
            >
              <MapPin className="text-red-500 w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">
                {userLocation ? (
                  <div className="-space-y-0.5">
                    <p
                      className={`font-bold group-hover:text-red-500 transition-colors ${isDark ? "text-white" : "text-gray-800"}`}
                    >
                      {userLocation.county}
                    </p>
                    <p className="text-gray-400 text-[11px]">
                      {userLocation.state}
                    </p>
                  </div>
                ) : (
                  <span
                    className={`group-hover:text-red-500 transition-colors ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Add Address
                  </span>
                )}
              </span>
              <FaCaretDown
                className="text-xs text-gray-400 group-hover:text-red-400 transition-colors"
                onClick={toggleDropDown}
              />
            </div>

            {openDropDown && (
              <div
                className={`w-60 z-50 absolute top-14 left-0 border shadow-xl p-5 rounded-2xl ${
                  isDark
                    ? "bg-[#111] border-white/10"
                    : "bg-white border-gray-100"
                }`}
              >
                <h2
                  className={`font-bold mb-4 text-sm flex justify-between items-center ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  Change Location
                  <CgClose
                    className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => setOpenDropDown(false)}
                  />
                </h2>
                <button
                  onClick={getLocation}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer active:scale-95 transition-all"
                >
                  Detect My Location
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <ul className="flex gap-1 items-center text-sm font-semibold list-none">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `transition-all duration-200 px-4 py-2 rounded-full block ${
                      isActive
                        ? "text-red-500 bg-red-50"
                        : isDark
                          ? "text-gray-300 hover:text-white hover:bg-white/10"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 text-base ${
              isDark
                ? "border-white/10 bg-white/5 hover:bg-white/10 text-yellow-400"
                : "border-gray-200 hover:bg-gray-50 text-gray-600"
            }`}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Cart, ${cartItems.length} items`}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 group ${
              isDark
                ? "border-white/10 hover:border-red-400 hover:bg-red-500/10"
                : "border-gray-200 hover:border-red-300 hover:bg-red-50"
            }`}
          >
            <FaCartShopping
              className={`h-4 w-4 group-hover:text-red-500 transition-colors ${isDark ? "text-gray-300" : "text-gray-600"}`}
            />
            {cartItems.length > 0 && (
              <span className="bg-red-500 rounded-full w-5 h-5 font-bold text-[10px] text-white flex justify-center items-center absolute -top-1 -right-1 border-2 border-white shadow-sm">
                {cartItems.length}
              </span>
            )}
          </Link>

          <div
            className={`w-px h-6 ${isDark ? "bg-white/10" : "bg-gray-200"}`}
          />

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton>
                <button className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-red-500 active:scale-95 transition-all cursor-pointer duration-200">
                  Sign In
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="scale-110">
                <UserButton />
              </div>
            </Show>
          </div>
        </nav>

        {/* Mobile: cart + theme + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
              isDark
                ? "border-white/10 bg-white/5 text-yellow-400"
                : "border-gray-200 text-gray-600"
            }`}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <Link
            to="/cart"
            className={`relative flex items-center justify-center w-9 h-9 rounded-full border transition-all ${
              isDark ? "border-white/10" : "border-gray-200"
            }`}
          >
            <FaCartShopping
              className={`h-4 w-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}
            />
            {cartItems.length > 0 && (
              <span className="bg-red-500 rounded-full w-4 h-4 font-bold text-[9px] text-white flex justify-center items-center absolute -top-0.5 -right-0.5 border border-white">
                {cartItems.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileOpen((p) => !p)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
              isDark
                ? "border-white/10 text-white"
                : "border-gray-200 text-gray-700"
            }`}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t px-4 py-4 flex flex-col gap-1 ${
            isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-gray-100"
          }`}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isActive
                    ? "text-red-500 bg-red-50"
                    : isDark
                      ? "text-gray-300 hover:bg-white/5"
                      : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div
            className={`my-2 h-px ${isDark ? "bg-white/10" : "bg-gray-100"}`}
          />
          <Show when="signed-out">
            <SignInButton>
              <button className="w-full bg-red-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-red-600 transition-all">
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-3 px-2">
              <UserButton />
              <span
                className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                My Account
              </span>
            </div>
          </Show>
        </div>
      )}
    </header>
  );
};

export default Navbar;
