import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transaction from './components/Transaction';
import YourVendo from './components/YourVendo';

function AppContent() {
  const location = useLocation();
  // Hide the sidebar if the current path is exactly "/"
  const hideSidebar = location.pathname === '/';

  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && <Sidebar />}
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          {/* Login route (no sidebar) */}
          <Route path="/" element={<Login />} />

          {/* Any other route will show the sidebar */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/yourvendo" element={<YourVendo />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
