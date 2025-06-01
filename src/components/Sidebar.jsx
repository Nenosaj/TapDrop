import { NavLink } from 'react-router-dom';
import logo from '../assets/TapDropLogo.png'; 
import '../styles/sidebar.css';    
import DashboardIcon from '../assets/dashboardlogo.svg?react';
import TransactionIcon from '../assets/transactionlogo.svg?react';
import AccountIcon from '../assets/accountlogo.svg?react';
import LogoutIcon from '../assets/logout.svg?react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // adjust the path if needed

import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

 const handleLogout = async () => {
  await signOut(auth); // Sign out from Firebase
  localStorage.removeItem("authToken"); // Remove token if you're using it
  navigate("/"); // Redirect to login
};

  return (
    <div className="sidebar-container">
      <img src={logo} alt="Water Vendo Logo" className="logo" />
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "dashboard active" : "dashboard"}>
          <DashboardIcon className="icon" />
          Dashboard
        </NavLink>
        <NavLink to="/transaction" className={({ isActive }) => isActive ? "transaction active" : "transaction"}>
          <TransactionIcon className="icon" />
          Transaction
        </NavLink>
        <NavLink to="/yourvendo" className={({ isActive }) => isActive ? "account active" : "account"}>
          <AccountIcon className="icon" />
          Your Vendo
        </NavLink>
        <button onClick={handleLogout} className="logout">
          <LogoutIcon className="icon" />
          Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;