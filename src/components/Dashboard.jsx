import '../styles/dashboard.css';    
import banner from '../assets/tapbanner.svg'; 


 function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Title */}
      <h2 className="section-title">System Overview</h2>

        {/* Top Card - TapDrop Banner */}
      <div className="tapdrop-card">
        <img
          src={banner}
          alt="TapDrop Banner"
          className="tapdrop-image"
        />
      </div>
      {/* Bottom Grid - 3 Cards */}
      <div className="card-grid">

         {/* Recent Transactions */}
        <div className="card recent-transactions">
          <h3>Recent Transaction</h3>
          <ul>
            <li>
              <div className="txn-type">Dispensed thru Gcash</div>
              <div className="txn-meta">08/05/25 at 13:01</div>
              <div className="txn-amount">₱1</div>
            </li>
            <li>
              <div className="txn-type">Dispensed thru Coin</div>
              <div className="txn-meta">08/05/25 at 12:01</div>
              <div className="txn-amount">₱1</div>
            </li>
            <li>
              <div className="txn-type">Dispensed thru Gcash</div>
              <div className="txn-meta">08/05/25 at 11:11</div>
              <div className="txn-amount">₱1</div>
            </li>
          </ul>
        </div>

        {/* Active Vending Machines */}
        <div className="card active-vending">
          <h3>Active Vending Machines</h3>
          <div className="vending-info">
            <p><strong>2</strong> Active Vendo</p>
            <p>System 1</p>
            <div className="water-level">
              <div className="water-label">Water Level</div>
              <div className="level-bar">
                <div className="fill" style={{ width: '10%' }} />
              </div>
              <div className="level-value">100ml - 10%</div>
            </div>
            <div className="status online">Active Status: Online</div>
          </div>
        </div>

        {/* Total Income */}
        <div className="card total-income">
          <h3>Total Income</h3>
          <div className="income-chart">
            <div className="income-circle">
              <span className="amount">₱140</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;