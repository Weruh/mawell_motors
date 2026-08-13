import React, { useState } from 'react';
import dealershipdata from '../dealershipdata';

export default function Admin() {
  const [cars, setCars] = useState(dealershipdata);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });
  const [targetCar, setTargetCar] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const updateForm = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addCar = (e) => {
    e.preventDefault();
    setCars([...cars, { ...form, price: `Asking price: KSH. ${form.price}` }]);
    setForm({ name: '', description: '', price: '', image: '' });
    alert('Vehicle added!');
  };

  const editPrice = (e) => {
    e.preventDefault();
    setCars(cars.map(c => c.name === targetCar ? { ...c, price: `Asking price: KSH. ${newPrice}` } : c));
    setTargetCar('');
    setNewPrice('');
    alert('Price updated!');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center gap-6 font-serif">
      <form onSubmit={addCar} className="bg-white p-6 rounded-xl shadow w-full max-w-md flex flex-col gap-4">
        <h2 className="text-xl font-bold text-sky-500 text-center">Add Car</h2>
        {['name', 'description', 'price', 'image'].map((field) => (
          <input key={field} name={field} value={form[field]} onChange={updateForm} placeholder={field} className="p-2 border rounded" required />
        ))}
        <button className="bg-sky-500 text-white p-2 rounded">Submit</button>
      </form>

      <form onSubmit={editPrice} className="bg-white p-6 rounded-xl shadow w-full max-w-md flex flex-col gap-4">
        <h3 className="text-xl font-bold text-sky-500 text-center">Update Price</h3>
        <select value={targetCar} onChange={(e) => setTargetCar(e.target.value)} className="p-2 border rounded" required>
          <option value="">Select Car</option>
          {cars.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
        </select>
        <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="New price" className="p-2 border rounded" required />
        <button className="bg-emerald-600 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}
