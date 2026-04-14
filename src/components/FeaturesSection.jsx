import { Clock, Lock, Repeat, Truck } from "lucide-react";
import React from "react";

const FeaturesSection = () => {
  return (
    <div className="    flex justify-evenly items-center gap-5 my-10">
      <div className="flex gap-4 items-center">
        <Truck size={40} />
        <p className="flex flex-col font-bold">
          Free Shipping{" "}
          <span className="text-gray-400 font-semibold">
            On orders over $100
          </span>
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <Lock size={40} />
        <p className="flex flex-col font-bold">
          Free Shipping{" "}
          <span className="text-gray-400 font-semibold">
            On orders over $100
          </span>
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <Repeat size={40} />
        <p className="flex flex-col font-bold">
          Free Shipping{" "}
          <span className="text-gray-400 font-semibold">
            On orders over $100
          </span>
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <Clock size={40} />
        <p className="flex flex-col font-bold">
          Free Shipping{" "}
          <span className="text-gray-400 font-semibold">
            On orders over $100
          </span>
        </p>
      </div>
    </div>
  );
};

export default FeaturesSection;
