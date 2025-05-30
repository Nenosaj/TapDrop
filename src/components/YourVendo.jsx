import '../styles/YourVendo.css';
import vector from '../assets/Vector.png'; 
import watercontainer from '../assets/watercontainer.png';
import money from '../assets/money.png';

import React, { useEffect, useState } from "react";
import { database } from "../firebase"; 
import { ref, onValue } from "firebase/database";



 function YourVendo() {
 

    const [waterAmount, setWaterAmount] = useState(0);
  const maxCapacity = 1000; // Set this to your water container max capacity in ml

  useEffect(() => {
    const waterRef = ref(database, "sensor/waterLevel"); // Adjust path as needed

    const unsubscribe = onValue(waterRef, (snapshot) => {
      if (snapshot.exists()) {
        const amount = snapshot.val();
        setWaterAmount(amount);
      }
    });

    return () => unsubscribe();
  }, []);

  const waterPercent = ((waterAmount / maxCapacity) * 100).toFixed(0); 

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
              <svg
  width="204"
  height="204"
  viewBox="0 0 204 204"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="animated-water-icon"
>
  <g clipPath="url(#clip0)">
    <rect x="8" y="8" width="188" height="188" rx="94" fill="white" />
    <path
      className="wave wave1"
      d="M79.7733 107.89C6.34604 134.876 -57.7922 49.0533 -119.276 76.4811C-155.99 85.3287 -230.125 103.997 -232.956 107.89C-235.787 111.783 -238.559 197.989 -239.591 240.605L305.805 330.409C342.961 284.549 406.746 179.733 364.635 127.355C311.998 61.8824 153.2 80.9049 79.7733 107.89Z"
      fill="#50BEFC"
      fillOpacity="0.72"
    />
    <path
      className="wave wave2"
      d="M160.558 110.508C98.8535 133.19 44.9553 61.0528 -6.71261 84.1071C-37.5647 91.544 -99.8635 107.236 -102.243 110.508C-104.621 113.78 -106.951 186.24 -107.818 222.061L350.502 297.545C381.726 258.998 435.327 170.895 399.94 126.869C355.706 71.8362 222.262 87.8255 160.558 110.508Z"
      fill="#3BB8ED"
      fillOpacity="0.69"
    />
  </g>
  <rect
    x="4"
    y="4"
    width="196"
    height="196"
    rx="98"
    stroke="#ADE5FC"
    strokeWidth="8"
  />
  <defs>
    <clipPath id="clip0">
      <rect x="8" y="8" width="188" height="188" rx="94" fill="white" />
    </clipPath>
  </defs>
</svg>


            <div className="water-level">
              <div className="circle">
                <div className="level">Water Level</div>
              </div>
              <div className="water-info">
                <span>{waterAmount}ml</span>
                <span>{waterPercent}%</span>
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