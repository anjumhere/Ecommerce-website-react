import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../context/DataContext";

const Products = () => {
  const { newProducts, fetchNewProducts, addToCart } = getData();

  const stableFetch = useCallback(fetchNewProducts, []); // eslint-disable-line
  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const toggleButton = () => setToggleFilter((prev) => !prev);

  const categories = [
    "electronics",
    "Hard drive",
    "Gaming",
    "appliances",
    "speakers",
    "power banks",
  ];

  const priceOptions = [100, 200, 400, 500, 1000, 1200];

  const limitWords = (text, maxWords = 9) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "…";
  };

  const handlePriceSelect = (priceValue) => {
    setSelectedPrices((prev) =>
      prev.includes(priceValue)
        ? prev.filter((i) => i !== priceValue)
        : [...prev, priceValue],
    );
  };

  const matchesPriceFilter = (productPrice) =>
    selectedPrices.length === 0 ||
    selectedPrices.some((selectedPrice) => productPrice <= selectedPrice);

  const filteredProducts = newProducts?.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        product.description?.toLowerCase().includes(category.toLowerCase()),
      );
    const priceMatch = matchesPriceFilter(product.price);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4">
      {/* Filter Sidebar */}
      <aside className="p-5 shadow-lg rounded-xl bg-white border border-gray-100">
        {/* Categories Section */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h1 className="text-gray-500 font-semibold text-xs tracking-wider uppercase">
            Categories
          </h1>
          <button
            onClick={toggleButton}
            className="text-2xl cursor-pointer text-gray-400 hover:text-gray-600 transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-50"
            aria-label={
              toggleFilter ? "Collapse categories" : "Expand categories"
            }
          >
            {toggleFilter ? "−" : "+"}
          </button>
        </div>

        <div className="mb-6">
          {toggleFilter && (
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex gap-3 cursor-pointer items-center group"
                >
                  <input
                    type="checkbox"
                    onChange={() => {
                      setSelectedCategories((prev) =>
                        prev.includes(cat)
                          ? prev.filter((c) => c !== cat)
                          : [...prev, cat],
                      );
                    }}
                    name="category-products"
                    checked={selectedCategories.includes(cat)}
                    className="w-3.5 h-3.5 rounded accent-red-500 cursor-pointer"
                  />
                  <span className="font-normal text-sm text-gray-600 capitalize group-hover:text-gray-900 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Prices Section */}
        <div>
          <h1 className="text-gray-500 font-semibold text-xs tracking-wider uppercase border-b border-gray-200 pb-3 mb-4">
            Prices
          </h1>
          <div className="flex gap-2 flex-wrap">
            {priceOptions.map((priceValue) => (
              <button
                key={priceValue}
                onClick={() => handlePriceSelect(priceValue)}
                className={`text-xs px-3 py-1.5 border rounded-full transition-all duration-200 cursor-pointer font-medium ${
                  selectedPrices.includes(priceValue)
                    ? "bg-red-500 text-white border-red-500"
                    : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                }`}
              >
                Under ${priceValue}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="flex-1">
        <div className="flex flex-wrap gap-7">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const originalPrice = (product.price / 0.8).toFixed(2);

              return (
                <div
                  key={product.id}
                  className="group hover:shadow-2xl relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 w-[calc(33.333%-20px)] min-w-[260px]"
                >
                  <div className="bg-gray-50 flex justify-evenly items-center h-64 w-full overflow-hidden">
                    <img
                      className="object-contain transition-all duration-500 group-hover:scale-105"
                      style={{ height: "70%", width: "70%" }}
                      src={product.image}
                      alt={product.title}
                    />
                  </div>

                  <div className="p-5 pt-4">
                    <h2 className="text-sm font-normal text-gray-600 leading-relaxed line-clamp-2 min-h-[42px] group-hover:text-gray-900 transition-colors duration-200">
                      {limitWords(product.title)}
                    </h2>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                      <div className="flex items-baseline gap-2">
                        <p className="text-gray-400 text-xs line-through">
                          ${originalPrice}
                        </p>
                        <p className="text-xl font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                        className="border border-gray-400 rounded-lg px-7 py-1 font-semibold cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:border-black"
                      >
                        Buy
                      </button>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] font-medium text-gray-500 shadow-sm border border-white/50">
                    20% OFF
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center w-full py-12">
              <p className="text-gray-500">
                No products found matching your filters
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
