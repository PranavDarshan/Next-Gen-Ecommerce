import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CustomerPortal } from './pages/CustomerPortal';
import { StaffPortal } from './pages/StaffPortal';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/customer" replace />} />
          <Route path="customer" element={<CustomerPortal />} />
          <Route path="staff" element={<StaffPortal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;