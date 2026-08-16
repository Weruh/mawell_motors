import React from 'react'; 

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { VehicleProvider } from './context/vehicleContext'; 

import Admin from './components/Admin'; 

export default function App() { 
return ( 
<VehicleProvider> 
<Router> 
<Routes> 
{/* Admin Route */} 
<Route path='/admin' element={<Admin />} /> 

{/* Add your other routes here (e.g. Home, Vehicle Details, etc.) */} 
</Routes> 
</Router> 
</VehicleProvider> 
); 
} 