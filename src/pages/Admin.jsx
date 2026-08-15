import  { useState } from "react";
import { useData } from "/src/context/DataContext.jsx";

function Admin() {
  const { AddProduct, product, EditProduct } = useData();
  const [editingId, setEditingId] = useState(null);
  const [data, setData] = useState({ name: "", description: "", price: "", imageUrl: "" });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editingId != null) {
      EditProduct(editingId, data);
      setEditingId(null);
    } else {
      AddProduct(data.name, data.description, data.price, data.imageUrl);
    }

    setData({ name: "", description: "", price: "", imageUrl: "" });
  }

  function handleEdit(car) {
    setEditingId(car.id);
    setData({ name: car.name, description: car.description, price: car.price, imageUrl: car.imageUrl  || car.image });
  }

  function handleCancel() {
    setEditingId(null);
    setData({ name: "", description: "", price: "", imageUrl: "" });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 font-sans sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-sky-600">Mawel Motors</p>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Admin Panel</h1>
          <p className="mt-3 text-slate-500">Manage your dealership products</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-slate-800">{editingId !== null ? "Edit Product" : "Add Product"}</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="carName" className="mb-2 block text-sm font-semibold text-slate-700">Car Name</label>
              <input id="carName" type="text" name="name" placeholder="e.g. Toyota Land Cruiser" value={data.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
              <textarea id="description" name="description" placeholder="Enter a description of the car" value={data.description} onChange={handleChange} rows="4" className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
            </div>

            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-semibold text-slate-700">Price</label>
              <input id="price" type="text" name="price" placeholder="e.g. 4500000" value={data.price} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
            </div>

            <div>
              <label htmlFor="imageUrl" className="mb-2 block text-sm font-semibold text-slate-700">Image URL</label>
              <input id="imageUrl" type="text" name="imageUrl" placeholder="Enter image URL" value={data.imageUrl} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100" />
            </div>

            <div className="flex justify-center gap-4 border-t border-slate-100 pt-6">
              <button type="submit" className="rounded-lg bg-sky-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-md">
                {editingId !== null ? "Update Product" : "Add Product"}
              </button>

              {editingId !== null && (
                <button type="button" onClick={handleCancel} className="rounded-lg bg-slate-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-slate-600">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-slate-800">Existing Products</h2>

          <div className="space-y-4">
            {product.map((car) => (
              <div key={car.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <div>
                  <h3 className="font-semibold text-slate-800">{car.name}</h3>
                  <p className="text-sm text-slate-500">{car.price}</p>
                </div>

                <button type="button" onClick={() => handleEdit(car)} className="rounded-lg bg-slate-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-900">
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Admin;
