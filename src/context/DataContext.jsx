import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products/category/mobile-accessories",
      );
      setData(res.data.products); // ← the actual array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, fetchAllProducts }}>
      {children}
    </DataContext.Provider>
  );
};

const getData = () => useContext(DataContext);
