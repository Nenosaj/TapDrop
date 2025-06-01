import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transaction from './components/Transaction';
import YourVendo from './components/YourVendo';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === '/';

  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && <Sidebar />}
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/transaction" 
            element={
              <PrivateRoute>
                <Transaction />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/yourvendo" 
            element={
              <PrivateRoute>
                <YourVendo />
              </PrivateRoute>
            } 
          />
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
