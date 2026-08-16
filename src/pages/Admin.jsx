import React, { useState } from 'react';
import { useVehicles } from '../context/VehicleContext';

export default function Admin() {
  const { vehicles, loading, error, addVehicle, updateVehicle, deleteVehicle } = useVehicles();

  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [data, setData] = useState({ name: '', description: '', price: '', imageUrl: '' });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setData({ name: '', description: '', price: '', imageUrl: '' });
    setEditingId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formattedPrice = data.price.startsWith('Asking price:')
      ? data.price
      : `Asking price: KSH. ${data.price}`;

    const newCarObject = {
      name: data.name,
      description: data.description,
      price: formattedPrice,
      image: data.imageUrl,
    };

    if (editingId !== null) {
      const success = await updateVehicle(editingId, newCarObject);
      if (success) {
        resetForm();
        alert('Vehicle updated successfully!');
      }
    } else {
      const success = await addVehicle(newCarObject);
      if (success) {
        resetForm();
        alert('Vehicle successfully registered!');
      }
    }
  };

  const handlePriceUpdate = async (carId, carName) => {
    const formattedPrice = newPrice.startsWith('Asking price:')
      ? newPrice
      : `Asking price: KSH. ${newPrice}`;

    const success = await updateVehicle(carId || carName, { price: formattedPrice });
    if (success) {
      setEditingId(null);
      setNewPrice('');
    }
  };

  const handleDelete = async (carId, carName) => {
    if (window.confirm(`Are you sure you want to remove ${carName} from the showroom?`)) {
      await deleteVehicle(carId || carName);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', fontFamily: '"Times New Roman", Times, serif' }}>
        Loading inventory...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '32px', color: 'red', textAlign: 'center', fontFamily: '"Times New Roman", Times, serif' }}>
        Error loading vehicles: {error}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', padding: '32px 16px', fontFamily: '"Times New Roman", Times, serif' }}>
      
      {/* Form Container */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', maxWidth: '450px', margin: '0 auto 40px auto', padding: '24px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0284c7', marginBottom: '24px', textAlign: 'center' }}>
          {editingId !== null ? 'Edit Vehicle' : 'Add New Vehicle'}
        </h2>
        
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Vehicle Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Toyota Vanguard"
              value={data.name}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.875rem' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Description</label>
            <textarea
              name="description"
              placeholder="Enter a description of the car"
              value={data.description}
              onChange={handleChange}
              rows="3"
              style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.875rem', resize: 'none' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Price</label>
            <input
              type="text"
              name="price"
              placeholder="e.g. 4500000"
              value={data.price}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.875rem' }}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Enter image URL"
              value={data.imageUrl}
              onChange={handleChange}
              style={{ padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', outline: 'none', fontSize: '0.875rem' }}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
            <button
              type="submit"
              style={{ backgroundColor: '#0ea5e9', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', flexGrow: 1 }}
            >
              {editingId !== null ? 'Update Car' : 'Add Car'}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                style={{ backgroundColor: '#64748b', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Showroom Cards */}
      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0284c7', marginBottom: '32px', textAlign: 'center' }}>
          📋 Showroom Inventory Price Controls
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {vehicles.map((car, index) => {
            const currentId = car.id || car.name || index;
            const isEditing = editingId === currentId;

            return (
              <div key={currentId} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={car.image || car.imageUrl} alt={car.name} style={{ width: '100%', height: '192px', objectFit: 'cover', backgroundColor: '#e2e8f0' }} />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155', margin: '0 0 8px 0' }}>{car.name}</h2>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>{car.description}</p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
                        <input
                          type="text"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          placeholder="e.g., 3.2M"
                          style={{ width: '90px', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem' }}
                        />
                        <button
                          onClick={() => handlePriceUpdate(car.id, car.name)}
                          style={{ backgroundColor: '#16a34a', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{ backgroundColor: '#64748b', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <span style={{ color: '#0284c7', fontWeight: '700', fontSize: '1.125rem' }}>{car.price}</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              setEditingId(currentId);
                              setNewPrice(car.price ? car.price.replace('Asking price: KSH. ', '') : '');
                            }}
                            style={{ backgroundColor: '#0ea5e9', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
                          >
                            Edit Price
                          </button>
                          <button
                            onClick={() => handleDelete(car.id, car.name)}
                            style={{ backgroundColor: '#dc2626', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}