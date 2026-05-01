import React from "react";
import {
  RiAddLine,
  RiSubtractLine,
  RiDeleteBin6Line,
  RiArrowRightSLine,
  RiShoppingBag3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { getData } from "../context/DataContext";

const Cart = ({ theme }) => {
  const { cartItems, updateQuantity, removeFromCart } = getData();
  const isDark = theme === "dark";
  console.log(cartItems);
  // FIX: was `acc * item.price` — now correctly sums price × quantity
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );
  const shipping = subtotal > 100 ? 0 : 15.0;
  const total = subtotal + shipping;

  const bg = isDark ? "bg-[#0a0a0a]" : "bg-[#F9FAFB]";
  const card = isDark
    ? "bg-[#111] border-white/10"
    : "bg-white border-gray-100";
  const text = isDark ? "text-white" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-500";

  if (cartItems.length === 0) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${bg} p-5 gap-5`}
      >
        <RiShoppingBag3Line className={`${subtext} text-7xl`} />
        <h2 className={`text-2xl font-bold ${text}`}>Your cart is empty</h2>
        <p className={`text-sm ${subtext}`}>
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-sm font-bold transition-all active:scale-95"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={`${bg} min-h-screen pb-20 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-1.5 text-sm ${subtext} mb-6`}>
          <Link to="/" className="hover:text-red-500 transition-colors">
            Home
          </Link>
          <RiArrowRightSLine />
          <span className={`font-semibold ${text}`}>Cart</span>
        </nav>

        {/* Stepper */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center w-full max-w-xs sm:max-w-sm">
            {["Cart", "Shipping", "Payment"].map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      i === 0
                        ? "bg-red-500 text-white"
                        : isDark
                          ? "bg-white/10 text-gray-500"
                          : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 font-medium ${i === 0 ? "text-red-500" : subtext}`}
                  >
                    {step}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-5 ${isDark ? "bg-white/10" : "bg-gray-200"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <h1 className={`text-2xl sm:text-3xl font-bold ${text} mb-6`}>
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Items List */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`border rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 shadow-sm transition-colors ${card}`}
              >
                <div
                  className={`w-full sm:w-36 h-36 rounded-xl overflow-hidden flex items-center justify-center p-3 shrink-0 ${isDark ? "bg-white/5" : "bg-gray-50"}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3
                        className={`text-base font-bold line-clamp-2 ${text}`}
                      >
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0 mt-0.5"
                      >
                        <RiDeleteBin6Line size={18} />
                      </button>
                    </div>
                    <p
                      className={`text-xs mt-1 line-clamp-2 leading-relaxed ${subtext}`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                    {/* Quantity */}
                    <div
                      className={`flex items-center border rounded-lg overflow-hidden text-sm ${isDark ? "border-white/10" : "border-gray-200"}`}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className={`px-3 py-2 transition-colors ${isDark ? "hover:bg-white/10 text-gray-300" : "hover:bg-gray-900 hover:text-white text-gray-600"}`}
                      >
                        <RiSubtractLine size={15} />
                      </button>
                      <span
                        className={`px-4 py-1 font-bold text-center min-w-10 ${text}`}
                      >
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className={`px-3 py-2 transition-colors ${isDark ? "hover:bg-white/10 text-gray-300" : "hover:bg-gray-900 hover:text-white text-gray-600"}`}
                      >
                        <RiAddLine size={15} />
                      </button>
                    </div>
                    <p className={`text-xl font-bold ${text}`}>
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary — was empty div, now complete */}
          <div className="lg:w-1/3">
            <div
              className={`border rounded-2xl p-6 shadow-sm sticky top-24 ${card}`}
            >
              <h2 className={`text-lg font-bold mb-5 ${text}`}>
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className={`flex justify-between ${subtext}`}>
                  <span>
                    Subtotal ({cartItems.length} item
                    {cartItems.length !== 1 ? "s" : ""})
                  </span>
                  <span className={text}>${subtotal.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between ${subtext}`}>
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-500 font-semibold" : text
                    }
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-green-500">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>

              <div
                className={`my-4 h-px ${isDark ? "bg-white/10" : "bg-gray-100"}`}
              />

              <div
                className={`flex justify-between font-bold text-base mb-6 ${text}`}
              >
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div
                className={`flex gap-2 mb-5 p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}
              >
                <input
                  type="text"
                  placeholder="Promo code"
                  className={`flex-1 text-sm bg-transparent outline-none ${text} placeholder:text-gray-400`}
                />
                <button className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
                  Apply
                </button>
              </div>

              <button className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md shadow-red-500/20">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className={`block text-center text-xs mt-4 transition-colors hover:text-red-500 ${subtext}`}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
