import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const DataContext = createContext(null);

const CACHE_KEY = "mobile_accessories_cache";

export const DataProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exsistingItem = prev.find((item) => item.id === product.id);
      if (exsistingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (!prev) return []; // Safety check
      return prev.filter((item) => item.id !== id);
    });
  };
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products/category/mobile-accessories",
      );
      const products = res.data.products;
      setData(products);
      localStorage.setItem(CACHE_KEY, JSON.stringify(products));
      setData(res.data.products); // ← the actual array
    } catch (error) {
      console.log("Network error. Using cached data if available", error);
    }
  };
  const [newProducts, setNewProducts] = useState();
  const fetchNewProducts = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/category/electronics",
      );
      const products = res.data;
      setNewProducts(products);
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        newProducts,
        setNewProducts,
        fetchNewProducts,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
