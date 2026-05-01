import React from "react";
import {
  RiAddLine,
  RiSubtractLine,
  RiDeleteBin6Line,
  RiArrowRightSLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { getData } from "../context/DataContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = getData();
  const subtotal = cartItems.reduce((acc, item) => acc * item.price, 0);
  const shipping = 15.0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      {/* Breadcrumbs & Progress */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <RiArrowRightSLine />
          <span className="text-black font-medium">Cart</span>
        </nav>

        {/* Stepper */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center w-full max-w-md">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="text-xs mt-2 font-bold">Cart</span>
            </div>
            <div className="flex-1 h-[2px] bg-gray-200 mx-2 mb-6"></div>
            <div className="flex flex-col items-center text-gray-400">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-xs mt-2">Shipping</span>
            </div>
            <div className="flex-1 h-[2px] bg-gray-200 mx-2 mb-6"></div>
            <div className="flex flex-col items-center text-gray-400">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-xs mt-2">Payment</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items List */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6"
              >
                <div className="w-full sm:w-40 h-40 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                        }}
                        className="text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => {
                          updateQuantity(item.id, -1);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-900 hover:text-white text-gray-600 transition-colors duration-300 border-l border-gray-200"
                      >
                        <RiSubtractLine size={18} />
                      </button>
                      <span className="px-4 py-1 text-sm font-bold w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          updateQuantity(item.id, 1);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-900 hover:text-white text-gray-600 transition-colors duration-300 border-l border-gray-200"
                      >
                        <RiAddLine size={18} />
                      </button>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
