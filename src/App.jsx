import { useState } from 'react'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transaction from './components/Transaction';
import YourVendo from './components/YourVendo';


export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/yourvendo" element={<YourVendo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}