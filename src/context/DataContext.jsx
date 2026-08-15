import { useState, useEffect, createContext, useContext } from "react";

const API_URL = "http://localhost:4000/cars";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load cars");
        setLoading(false);
      });
  }, []);

  const AddProduct = async (newName, newDescription, newPrice, imageUrl) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        price: newPrice,
        image: imageUrl,
      }),
    });
    const newProduct = await res.json();
    setProduct((prevProduct) => [...prevProduct, newProduct]);
  };

  const EditProduct = async (id, updatedData) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updatedData.name,
        description: updatedData.description,
        price: updatedData.price,
        image: updatedData.imageUrl,
      }),
    });
    const updated = await res.json();
    setProduct((prevProducts) =>
      prevProducts.map((item) => (item.id === id ? updated : item))
    );
  };

  const DeleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProduct((prevProducts) => prevProducts.filter((item) => item.id !== id));
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
