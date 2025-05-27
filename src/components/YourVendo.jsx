import '../styles/YourVendo.css';
import vector from '../assets/Vector.png'; 
import watercontainer from '../assets/watercontainer.png';
import money from '../assets/money.png';



 function YourVendo() {
 return (
    <div className="dashboard-container">
      <h2 className="section-title">Your Vending Machines</h2>

      <div className="status-summary">
        <div className="status-card active">
        <img src={vector} alt="Active Icon" className="status-icon" />
          <span>Active Vendo</span>
          <strong>2/3</strong>
        </div>
        <div className="status-card inactive">
        <img src={vector} alt="Inactive Icon" className="status-icon" />
          <span>Inactive Vendo</span>
          <strong>1/3</strong>
        </div>
        <button className="add-button">+ Add A New Vendo</button>
      </div>
      <h2 className="section-title">Vendo Status</h2>


      <div className="vendo-status">
        <div className="water-container">
        <img src={watercontainer} alt="Water Container" className="container-img" />
          <div className="status-info">
            <span className="active-status">Online</span>
            <div className="water-level">
              <div className="circle">
                <div className="level">Water Level</div>
              </div>
              <div className="water-info">
                <span>100ml</span>
                <span>10%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="income-box">
        <img src={money} alt="Income Icon" className="income-img" />
          <span>Total Income</span>
          <strong>₱50</strong>
        </div>
      </div>

      <div className="pagination">
        <span className="page-link">&lt; Previous</span>
        <span className="page-number active">1</span>
        <span className="page-number">2</span>
        <span className="page-number">3</span>
        <span className="page-number">4</span>
        <span className="page-link">Next &gt;</span>
      </div>
    </div>
  );
}

export default YourVendo;