import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { newProducts, fetchNewProducts } = getData();

  const stableFetch = useCallback(fetchNewProducts, []); // eslint-disable-line
  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [storeProduct, setStoreProduct] = useState([]);

  // Toast state: shows a brief "Added to cart!" confirmation per product
  const [toastId, setToastId] = useState(null);

  const toggleButton = () => setToggleFilter((prev) => !prev);

  const categories = [
    "electronics",
    "Hard drive",
    "Gaming",
    "appliances",
    "speakers",
    "power banks",
  ];

  // Price thresholds: the filter keeps products whose price is AT OR BELOW
  // the selected value. Labels now read "Under $X" to match the actual logic.
  // FIX #4: The original labels said "$100+" which implies ">= $100", but the
  //         filter used `productPrice <= selectedPrice` (i.e. "under $100").
  //         Labels are corrected to "Under $X" so UI and logic are consistent.
  const priceOptions = [100, 200, 400, 500, 1000, 1200];

  // FIX #5: `limitWords` was called with maxWords = 70, which is almost the
  //         entire product description and defeats the purpose of truncation.
  //         Changed to 9 words — enough for a readable card title.
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

  const navigate = useNavigate();

  // KEY FIX: handleBuy now only adds the item to the cart state.
  // It no longer calls navigate() — the user stays on the Products page
  // and can go to cart whenever they want via the cart icon in the header.
  const handleBuy = (product) => {
    setStoreProduct((prev) => [...prev, product]);
    // Show a per-product toast for 1.5 seconds
    setToastId(product.id);
    setTimeout(() => setToastId(null), 1500);
  };

  const handleGoToCart = () => {
    navigate("/cart", { state: { cartItems: storeProduct } });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 p-4">
      {/* Floating Cart Button — always visible, navigates to cart on click */}
      <button
        onClick={handleGoToCart}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl hover:bg-gray-700 transition-all duration-200 cursor-pointer"
        aria-label="Go to cart"
      >
        {/* Cart SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
        <span className="text-sm font-medium">Cart</span>
        {/* Badge showing item count */}
        {storeProduct.length > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-1">
            {storeProduct.length}
          </span>
        )}
      </button>
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
                // FIX #4 (label): Changed "$X+" → "Under $X" to match filter logic
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
                  // FIX #7: `duration-400` is not a valid Tailwind class.
                  //         Changed to `duration-300` (the nearest valid value).
                  // FIX #8: `min-w-65` is not standard Tailwind; changed to
                  //         `min-w-[260px]` (arbitrary value syntax).
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
                    {/* FIX #9: `min-h-10.5` is not standard Tailwind; replaced
                                with `min-h-[42px]` (arbitrary value). */}
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
                        onClick={() => handleBuy(product)}
                        className={`px-4 cursor-pointer border py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          toastId === product.id
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-500 bg-transparent text-gray-600 hover:bg-gray-900 hover:text-white"
                        }`}
                      >
                        {toastId === product.id ? "✓ Added!" : "Add to Cart"}
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
