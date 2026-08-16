import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const VehicleContext = createContext();


const API_URL = 'http://localhost:5000/vehicles';

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch inventory data');
      const data = await res.json();
      setVehicles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  
  const addVehicle = async (newVehicle) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVehicle),
      });
      if (res.ok) {
        await fetchVehicles();
        return true;
      }
    } catch (err) {
      console.error('Error adding vehicle:', err);
    }
    return false;
  };

  
  const updateVehicle = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) {
        await fetchVehicles();
        return true;
      }
    } catch (err) {
      console.error('Error updating vehicle:', err);
    }
    return false;
  };

  
  const deleteVehicle = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchVehicles();
        return true;
      }
    } catch (err) {
      console.error('Error deleting vehicle:', err);
    }
    return false;
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        loading,
        error,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        refetchVehicles: fetchVehicles,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}


export function useVehicles() {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
}