import { useState, useEffect, createContext, useContext } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";

const carsCollection = collection(db, "cars");

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDocs(carsCollection)
      .then((snapshot) => {
        setProduct(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cars");
        setLoading(false);
      });
  }, []);

  const AddProduct = async (newName, newDescription, newPrice, imageUrl) => {
    const newCar = {
      name: newName,
      description: newDescription,
      price: newPrice,
      image: imageUrl,
    };
    const docRef = await addDoc(carsCollection, newCar);
    setProduct((prevProduct) => [...prevProduct, { id: docRef.id, ...newCar }]);
  };

  const EditProduct = async (id, updatedData) => {
    const updated = {
      name: updatedData.name,
      description: updatedData.description,
      price: updatedData.price,
      image: updatedData.imageUrl,
    };
    await updateDoc(doc(db, "cars", id), updated);
    setProduct((prevProduct) =>
      prevProduct.map((item) => (item.id === id ? { id, ...updated } : item))
    );
  };

  const DeleteProduct = async (id) => {
    await deleteDoc(doc(db, "cars", id));
    setProduct((prevProduct) => prevProduct.filter((item) => item.id !== id));
  };

  return (
    <DataContext.Provider
      value={{ product, loading, error, setProduct, AddProduct, EditProduct, DeleteProduct }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

export default DataContext;
