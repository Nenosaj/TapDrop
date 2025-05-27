import { NavLink } from 'react-router-dom';
import logo from '../assets/TapDropLogo.png'; 
import '../styles/sidebar.css';    
import DashboardIcon from '../assets/dashboardlogo.svg?react';
import TransactionIcon from '../assets/transactionlogo.svg?react';
import AccountIcon from '../assets/accountlogo.svg?react';




function Sidebar() {
  return (
    <div className="sidebar-container">
      <img src={logo} alt="Water Vendo Logo" className="logo" />
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive ? "dashboard active" : "dashboard"}>
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
      </nav>
    </div>
  );
}

export default Sidebar;