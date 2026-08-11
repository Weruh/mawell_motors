import React, { useState } from 'react';
import dealershipdata from '../dealershipdata';

export default function Admin() {
  const [cars, setCars] = useState(dealershipdata);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newCarObject = {
      name: name,
      description: description,
      price: price.startsWith("Asking price:") ? price : `Asking price: KSH. ${price}`,
      image: image
    };

    setCars([...cars, newCarObject]);
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    alert('Vehicle successfully registered!');
  };

  const handlePriceUpdate = (carName) => {
    const updatedArray = cars.map((car) => {
      if (car.name === carName) {
        return { 
          ...car, 
          price: newPrice.startsWith("Asking price:") ? newPrice : `Asking price: KSH. ${newPrice}` 
        };
      }
      return car;
    });

    setCars(updatedArray);
    setEditingId(null);
    setNewPrice('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', padding: '32px 16px', fontFamily: '"Times New Roman", Times, serif' }}>
      
      <div>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', maxWidth: '450px', margin: '0 auto 40px auto', padding: '24px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0284c7', marginBottom: '24px', textAlign: 'center' }}>Add New Vehicle</h2>
          <form onSubmit={handleFormSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
              <label style={{ fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Vehicle Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Toyota Vanguard" style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '0.875rem', fontFamily: '"Times New Roman", Times, serif' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
              <label style={{ fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Description</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., 2016 model, automatic" style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '0.875rem', fontFamily: '"Times New Roman", Times, serif' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
              <label style={{ fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Price Format</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 2.4M" style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '0.875rem', fontFamily: '"Times New Roman", Times, serif' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <label style={{ fontSize: '1rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Image File Path Location</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="e.g., src/assets/sedan.png" style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', fontSize: '0.875rem', fontFamily: '"Times New Roman", Times, serif' }} required />
            </div>

            <button type="submit" style={{ backgroundColor: '#0ea5e9', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', width: '100%', fontFamily: '"Times New Roman", Times, serif' }}>Submit</button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0284c7', marginBottom: '32px', textAlign: 'center' }}>📋 Showroom Inventory Price Controls</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {cars.map((car, index) => (
            <div key={car.name || index} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img src={car.image} alt={car.name} style={{ width: '100%', height: '192px', objectFit: 'cover', backgroundColor: '#e2e8f0' }} />
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155', margin: '0 0 8px 0' }}>{car.name}</h2>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>{car.description}</p>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                  {editingId === car.name ? (
                    <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                      <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="e.g., 3.2M" style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', fontFamily: '"Times New Roman", Times, serif' }} />
                      <button onClick={() => handlePriceUpdate(car.name)} style={{ backgroundColor: '#16a34a', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', fontFamily: '"Times New Roman", Times, serif' }}>Save</button>
                      <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', fontFamily: '"Times New Roman", Times, serif' }}>Cancel</button>
                    </div>
                  ) : (
                    <>
                      <span style={{ color: '#0284c7', fontWeight: '700', fontSize: '1.125rem' }}>{car.price}</span>
                      <button onClick={() => { setEditingId(car.name); setNewPrice(car.price.replace("Asking price: KSH. ", "")); }} style={{ backgroundColor: '#0ea5e9', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', fontFamily: '"Times New Roman", Times, serif' }}>Edit Price</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
