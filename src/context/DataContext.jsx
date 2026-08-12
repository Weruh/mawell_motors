import { useState, createContext , useContext} from "react";
import dealershipdata from "../dealershipdata.js";




export const DataContext = createContext();

export function DataProvider({ children }) {
  const [product, setProduct] = useState(dealershipdata);

  const AddProduct = (newName, newDescription,newPrice,imageUrl) =>{
   const newProduct = {
    id: Date.now(),
    name: newName,
    description: newDescription,
    price: newPrice,
    image: imageUrl,
   } 
   setProduct((prevProduct) =>[...prevProduct, newProduct])
  }

  return (
    <DataContext.Provider value={{ product, setProduct, AddProduct }}>
      {children}
    </DataContext.Provider>
  );
}
export const useData = () => useContext(DataContext);

export default DataContext;