import '../styles/transaction.css';    
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firedb } from '../firebase';

import money from '../assets/money.png';

const ITEMS_PER_PAGE = 5;

function Transaction() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const querySnapshot = await getDocs(collection(firedb, "logs"));
        const logsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            description: data.source || "N/A",
            system: data.system || "Unknown",
            date: data.timestamp || "Unknown",
            amount: 1,
          };
        });
        setAllTransactions(logsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    let filtered = [...allTransactions];
    if (activeTab === "System 1" || activeTab === "System 2") {
      filtered = filtered.filter(tx => tx.system === activeTab);
    }
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [activeTab, allTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredTransactions.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div className="transaction-container"><p>Loading transactions...</p></div>;

  return (
    <div className="transaction-container">
      <h2>Transactions</h2>

      <div className="income-card">
          <img src={money} alt="Income Icon" className="income-img" />
        <div>
          <div className="income-title">Total Income</div>
          <div className="income-amount">₱{allTransactions.length}</div>
        </div>
      </div>

      <div className="income-breakdown">
        <div>
          <div className="system-title">System 1</div>
          <div className="system-amount">₱{
            allTransactions.filter(tx => tx.system === "System 1").length
          }</div>
        </div>
        <div>
          <div className="system-title">System 2</div>
          <div className="system-amount">₱{
            allTransactions.filter(tx => tx.system === "System2").length
          }</div>
        </div>
      </div>

      <div className="recent-section">
        {/* Tabs */}
        <div className="transaction-tabs">
          {["All", "System 1", "System 2"].map(tab => (
            <div
              key={tab}
              className={`transaction-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Table */}
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>From System</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.description}</td>
                <td>{tx.system}</td>
                <td>{tx.date}</td>
                <td className="transaction-amount">₱{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Pagination with your styling */}
        <div className="pagination">
          <span className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt; Previous</span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              className={`page-number ${currentPage === i + 1   ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next &gt;</span>
        </div>
      </div>
    </div>
  );
}


export default Transaction;
