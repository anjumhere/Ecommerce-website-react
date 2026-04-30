import React from "react";
import { RiArrowRightWideLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  console.log(cartItems);

  return (
    <div className="flex flex-col bg-amber-40 ">
      <div className="  w-50  ml-5  pt-10">
        <ol className="flex  text-lg gap-3 font-semibold text-gray-600 justify-center items-center">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <span>
            <RiArrowRightWideLine />
          </span>
          <li className="text-gray-400">
            <Link>Cart</Link>
          </li>
        </ol>
      </div>
      <div className="min-h-[100px] w-full   flex justify-center items-center  ">
        <ol className="flex justify-center items-center gap-1">
          <li className="text-2xl  font-semibold">
            <Link>Cart</Link>
          </li>
          <span className="h-1/2 pb-2 text-gray-400 text-2xl font-semibold">
            ...............
          </span>
          <li className="text-2xl font-semibold text-gray-400">
            <Link>Shipping</Link>
          </li>
          <span className=" h-1/2 pb-2 text-gray-400 text-2xl font-semibold">
            ...............
          </span>
          <li className="text-2xl font-semibold text-gray-400">
            <Link>Payment</Link>
          </li>
        </ol>
      </div>
      <div className=" w-[90vw] mx-auto border-gray-300 border-b-2 mb-10">
        <h1 className="pb-10 text-start text-3xl font-semibold ">My Cart</h1>
      </div>
      <div className="flex w-[90vw] mx-auto gap-20    justify-center">
        <div className="w-[70vw] mx-auto bg-white">
          <h1 className="border-b-2 border-gray-300 text-xl font-semibold pb-5">
            My Cart
          </h1>
        </div>
        <div className="w-[30vw]   bg-white"></div>
      </div>
    </div>
  );
};

export default Cart;
