import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const DataContext = createContext(null);

const CACHE_KEY = "mobile_accessories_cache";

export const DataProvider = ({ children }) => {
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

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
