import { useState, createContext } from "react";
import dealershipdata from "../dealershipdata.js";




export const DataContext = createContext();

export function DataProvider({ children }) {
  const [product, setProduct] = useState(dealershipdata);

  return (
    <DataContext.Provider value={{ product, setProduct }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;