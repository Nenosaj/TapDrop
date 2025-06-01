import '../styles/dashboard.css';    
import banner from '../assets/tapbanner.svg'; 
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firedb } from '../firebase'; // Ensure this points to Firestore init

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';


function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const snapshot = await getDocs(collection(firedb, 'logs'));
        const data = snapshot.docs.map(doc => {
          const t = doc.data();
          return {
            type: t.source || "Unknown",
            system: t.system || "Unknown",
            date: t.timestamp || "Unknown",
            amount: 1 // ESP32 only logs, so fixed value
          };
        });

        // Sort by timestamp string (fallback sorting by Firestore ID millis)
        const sorted = [...data].sort((a, b) => {
          return b.date.localeCompare(a.date);
        });

        setTransactions(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const totalIncome = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const recent = transactions.slice(0, 3); // Top 3 recent

  // Count transactions by system
  // Count transactions by system
const systemCounts = transactions.reduce((acc, tx) => {
  acc[tx.system] = (acc[tx.system] || 0) + 1;
  return acc;
}, {});

// Prepare data for the chart
const systemChartData = Object.entries(systemCounts).map(([system, count]) => ({
  system,
  transactions: count
}));


  if (loading) return <div className="dashboard-container"><p>Loading dashboard...</p></div>;

  return (
    <div className="dashboard-container">
      <h2 className="section-title">System Overview</h2>

      <div className="tapdrop-card">
        <img src={banner} alt="TapDrop Banner" className="tapdrop-image" />
      </div>

      <div className="card-grid">

        {/* Recent Transactions */}
        <div className="card recent-transactions">
          <h3>Recent Transactions</h3>
          <ul>
            {recent.map((tx, idx) => (
              <li key={idx}>
                <div className="txn-type">Dispensed thru {tx.type}</div>
                <div className="txn-meta">{tx.date}</div>
                <div className="txn-amount">₱{tx.amount}</div>
              </li>
            ))}
            {recent.length === 0 && <li>No transactions yet.</li>}
          </ul>
        </div>

        {/* Total Income */}
        <div className="card total-income">
          <h3>Total Income</h3>
          <div className="income-chart">
            <div className="income-circle">
              <span className="amount">₱{totalIncome}</span>
            </div>
          </div>
        </div>

     {/* System Usage Chart */}
<div className="card system-chart">
  <h3>System Usage</h3>
  {systemChartData.length > 0 ? (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={systemChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="system" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="transactions" fill="#1a27ff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <p>No data yet</p>
  )}
</div>


      </div>
    </div>
  );
}

export default Dashboard;
