import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";

const Products = () => {
  const { newProducts, fetchNewProducts } = getData();

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]); // ← Fixed: renamed from 'item'
  const [selectedPrices, setSelectedPrices] = useState([]); // ← Fixed: removed duplicate 'price' state
  const [storeProduct, setStoreProduct] = useState([]);
  const toggleButton = () => {
    setToggleFilter(!toggleFilter);
  };

  console.log(storeProduct);

  const categories = [
    "electronics",
    "Hard drive",
    "Gaming",
    "appliances",
    "speakers",
    "power banks",
  ];

  const priceOptions = [100, 200, 400, 500, 1000, 1200];

  const limitWords = (text, maxWords) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const handlePriceSelect = (priceValue) => {
    setSelectedPrices((prev) => {
      if (prev.includes(priceValue)) {
        return prev.filter((i) => i !== priceValue);
      } else {
        return [...prev, priceValue];
      }
    });
  };

  // ← FIXED: Added missing return statement and fixed parameter name
  const matchesPriceFilter = (productPrice) => {
    return (
      selectedPrices.length === 0 ||
      selectedPrices.some((selectedPrice) => productPrice <= selectedPrice)
    );
  };

  // ← FIXED: Changed 'products' to 'product' for consistency
  const filteredProducts = newProducts?.filter((product) => {
    // Category filter - FIXED: using selectedCategories instead of undefined variable
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        product.description.toLowerCase().includes(category.toLowerCase()),
      );

    // Price filter logic
    const priceMatch = matchesPriceFilter(product.price);

    // Product must match BOTH filters
    return categoryMatch && priceMatch;
  });

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
                        if (selectedCategories.includes(cat)) {
                          setSelectedCategories(
                            selectedCategories.filter((c) => c !== cat),
                          );
                        } else {
                          setSelectedCategories([...selectedCategories, cat]);
                        }
                      }}
                      name="category-products"
                      checked={selectedCategories.includes(cat)}
                      className="w-3.5 h-3.5 rounded accent-red-500 checked:shadow-lg checked:shadow-red-500/80 cursor-pointer"
                    />
                    <p className="font-normal text-sm text-gray-600 capitalize group-hover:text-gray-900 transition-colors">
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
            {priceOptions.map((priceValue) => {
              return (
                <button
                  key={priceValue}
                  onClick={() => handlePriceSelect(priceValue)}
                  className={`text-xs px-3 py-1.5 border rounded-full transition-all duration-200 cursor-pointer font-medium
                  ${
                    selectedPrices.includes(priceValue)
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
                  }
                  `}
                >
                  ${priceValue}+
                </button>
              );
            })}
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
                  className="group hover:shadow-2xl relative bg-white rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1 w-[calc(33.333%-20px)] min-w-65"
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
                    <h1 className="text-sm font-normal text-gray-600 leading-relaxed line-clamp-2 min-h-10.5 group-hover:text-gray-900 transition-colors duration-200">
                      {limitWords(product.title, 70)}
                    </h1>

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
                        onClick={setStoreProduct(product)}
                        className="px-8 cursor-pointer border border-gray-500 py-2 rounded-lg bg-transparent text-gray-600 text-sm font-medium transition-all duration-200 hover:bg-gray-900 hover:text-white"
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
