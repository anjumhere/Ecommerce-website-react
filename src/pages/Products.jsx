import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";

const Products = () => {
  const { newProducts, fetchNewProducts } = getData();

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [item, setItem] = useState();
  const [price, setPrice] = useState();
  const toggleButton = () => {
    setToggleFilter(!toggleFilter);
  };

  const categories = [
    "Electronics",
    "Cameras",
    "Gaming",
    "Appliances",
    "Speakers",
    "Power Banks",
  ];
  const priceRange = [100, 200, 400, 500, 1000, 1200];

  const limitWords = (text, maxWords) => {
    if (!text) return "";
    const words = text.split(" ");

    return words.slice(0, maxWords).join(" ") + "...";
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4">
      {/* Filter Sidebar */}
      <aside className="p-5 shadow-lg rounded-xl bg-white border border-gray-100">
        {/* Categories Section */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h1 className="text-gray-500 font-semibold text-xs tracking-wider uppercase">
            CATEGORIES
          </h1>
          <button
            onClick={toggleButton}
            className="text-2xl cursor-pointer text-gray-400 hover:text-gray-600 transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-50"
          >
            {toggleFilter ? "−" : "+"}
          </button>
        </div>

        <div className="mb-6">
          {toggleFilter && (
            <form className="space-y-2">
              {categories.map((cat) => {
                return (
                  <label
                    key={cat}
                    className="flex gap-3 cursor-pointer items-center group"
                  >
                    <input
                      type="checkbox"
                      onChange={() => {
                        setItem(cat);
                      }}
                      name="category-products"
                      checked={item === cat}
                      className="w-3.5 h-3.5 rounded accent-red-500 checked:shadow-lg checked:shadow-red-500/80 cursor-pointer"
                    />
                    <p className="font-normal text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {cat}
                    </p>
                  </label>
                );
              })}
            </form>
          )}
        </div>

        {/* Prices Section */}
        <div>
          <h1 className="text-gray-500 font-semibold text-xs tracking-wider uppercase border-b border-gray-200 pb-3 mb-4">
            PRICES
          </h1>
          <div className="flex gap-2 flex-wrap">
            {priceRange.map((priceValue) => {
              return (
                <button
                  key={priceValue}
                  value={priceValue}
                  onClick={() => setPrice(priceValue)}
                  className={`text-xs px-3 py-1.5 border rounded-full transition-all duration-200 cursor-pointer font-medium
    ${
      price === priceValue
        ? "bg-red-300   border-red-500   "
        : "border-gray-200 text-gray-600 bg-white hover:text-gray-800 hover:border-gray-300 hover:bg-gray-50"
    }
  `}
                >
                  ${priceValue}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="bg-white shadow-xl p-6 rounded-xl min-h-[500px] border border-gray-100">
        <div className="flex gap-6 flex-wrap justify-start items-stretch">
          {newProducts &&
            newProducts.map((product) => {
              const originalPrice = (product.price / 0.8).toFixed(2);

              return (
                <div
                  key={product.id}
                  className="flex flex-col relative w-[330px] h-[300px] bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 flex justify-center items-center h-[70%] w-full">
                    <img
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ height: "80%", width: "80%" }}
                      src={product.image}
                      alt={product.title}
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-between p-3 h-[30%] w-full bg-white">
                    <h1 className="text-xs font-medium text-gray-600 cursor-pointer hover:text-blue-500 transition-colors truncate">
                      {limitWords(product.title, 6)}
                    </h1>

                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-baseline gap-2">
                        <p className="text-gray-400 text-sm font-medium line-through">
                          ${originalPrice}
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          ${product.price}
                        </p>
                      </div>

                      <button className="px-4 py-1.5 rounded-lg cursor-pointer bg-white border-2 border-blue-500 text-blue-600 text-sm font-semibold hover:bg-blue-500 hover:text-white hover:shadow-md transition-all duration-200">
                        Buy
                      </button>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide shadow-sm">
                    20% OFF
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
};

export default Products;
