import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import { RiFilter3Line } from "react-icons/ri";

const Products = ({ theme }) => {
  const { newProducts, fetchNewProducts, addToCart } = getData();
  const isDark = theme === "dark";

  const stableFetch = useCallback(fetchNewProducts, []); // eslint-disable-line
  useEffect(() => {
    stableFetch();
  }, [stableFetch]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

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
    return words.length <= maxWords
      ? text
      : words.slice(0, maxWords).join(" ") + "…";
  };

  const handlePriceSelect = (val) =>
    setSelectedPrices((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val],
    );

  // FIX: was matching on product.description — now correctly matches product.category
  const filteredProducts = newProducts?.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((cat) =>
        product.category?.toLowerCase().includes(cat.toLowerCase()),
      );
    const priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.some((max) => product.price <= max);
    return categoryMatch && priceMatch;
  });

  const bg = isDark ? "bg-[#0a0a0a]" : "bg-gray-50";
  const card = isDark
    ? "bg-[#111] border-white/10"
    : "bg-white border-gray-100";
  const text = isDark ? "text-white" : "text-gray-900";
  const subtext = isDark ? "text-gray-400" : "text-gray-500";

  const Sidebar = () => (
    <aside
      className={`rounded-2xl border p-5 shadow-sm h-fit transition-colors duration-300 ${card}`}
    >
      {/* Categories */}
      <div
        className={`flex justify-between items-center border-b pb-3 mb-4 ${isDark ? "border-white/10" : "border-gray-200"}`}
      >
        <h2
          className={`font-bold text-xs tracking-widest uppercase ${subtext}`}
        >
          Categories
        </h2>
        <button
          onClick={() => setToggleFilter((p) => !p)}
          className={`text-xl w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
            isDark
              ? "text-gray-400 hover:bg-white/10"
              : "text-gray-400 hover:bg-gray-50"
          }`}
          aria-label={toggleFilter ? "Collapse" : "Expand"}
        >
          {toggleFilter ? "−" : "+"}
        </button>
      </div>

      {toggleFilter && (
        <div className="mb-6 space-y-2.5">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex gap-3 cursor-pointer items-center group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(cat)
                      ? prev.filter((c) => c !== cat)
                      : [...prev, cat],
                  )
                }
                className="w-3.5 h-3.5 rounded accent-red-500 cursor-pointer"
              />
              <span
                className={`text-sm capitalize transition-colors group-hover:text-red-500 ${subtext}`}
              >
                {cat}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Prices */}
      <h2
        className={`font-bold text-xs tracking-widest uppercase border-b pb-3 mb-4 ${subtext} ${isDark ? "border-white/10" : "border-gray-200"}`}
      >
        Max Price
      </h2>
      <div className="flex gap-2 flex-wrap">
        {priceOptions.map((val) => (
          <button
            key={val}
            onClick={() => handlePriceSelect(val)}
            className={`text-xs px-3 py-1.5 border rounded-full transition-all font-medium cursor-pointer ${
              selectedPrices.includes(val)
                ? "bg-red-500 text-white border-red-500"
                : isDark
                  ? "border-white/10 text-gray-400 bg-white/5 hover:border-red-400"
                  : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
            }`}
          >
            Under ${val}
          </button>
        ))}
      </div>

      {/* Clear */}
      {(selectedCategories.length > 0 || selectedPrices.length > 0) && (
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedPrices([]);
          }}
          className="mt-5 w-full text-xs font-bold text-red-500 hover:text-red-600 transition-colors border border-red-200 rounded-xl py-2"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h1 className={`text-xl font-bold ${text}`}>Products</h1>
          <button
            onClick={() => setSidebarOpen((p) => !p)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
              isDark
                ? "border-white/10 text-gray-300"
                : "border-gray-200 text-gray-700"
            }`}
          >
            <RiFilter3Line />
            Filters{" "}
            {selectedCategories.length + selectedPrices.length > 0 &&
              `(${selectedCategories.length + selectedPrices.length})`}
          </button>
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="mb-6 md:hidden">
            <Sidebar />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Products Grid */}
          <main>
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const originalPrice = (product.price / 0.8).toFixed(2);
                  return (
                    <div
                      key={product.id}
                      className={`group relative border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card}`}
                    >
                      {/* Discount Badge */}
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10">
                        20% OFF
                      </div>

                      <div
                        className={`flex justify-center items-center h-52 w-full p-5 ${isDark ? "bg-white/15" : "bg-gray-50"}`}
                      >
                        <img
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          src={product.image}
                          alt={product.title}
                        />
                      </div>

                      <div className="p-5 pt-4">
                        <h2
                          className={`text-sm font-semibold leading-relaxed line-clamp-2 min-h-10.5 transition-colors ${
                            isDark
                              ? "text-gray-200 group-hover:text-white"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {limitWords(product.title)}
                        </h2>

                        <div
                          className={`flex justify-between items-center mt-4 pt-3 border-t ${isDark ? "border-white/10" : "border-gray-100"}`}
                        >
                          <div className="flex items-baseline gap-2">
                            <p className={`text-xs line-through ${subtext}`}>
                              ${originalPrice}
                            </p>
                            <p className={`text-lg font-bold ${text}`}>
                              ${product.price}
                            </p>
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all active:scale-95"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <span className="text-5xl">🔍</span>
                <p className={`text-base font-medium ${subtext}`}>
                  No products match your filters
                </p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedPrices([]);
                  }}
                  className="text-sm text-red-500 hover:text-red-600 font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
