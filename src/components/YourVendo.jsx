import '../styles/YourVendo.css';
import vector from '../assets/Vector.png'; 
import watercontainer from '../assets/watercontainer.png';
import money from '../assets/money.png';

import React, { useEffect, useState } from "react";
import { database } from "../firebase"; 
import { ref, onValue, set } from "firebase/database";

function YourVendo() {
  const [waterAmount, setWaterAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Tracks which system page
  const [loading, setLoading] = useState(true);
  const maxCapacity = 1000;

  // Fetch water level based on current page (system number)
  useEffect(() => {
    setLoading(true);
    const waterRef = ref(database, `system${currentPage}/waterLevel`);
    const unsubscribe = onValue(waterRef, (snapshot) => {
      if (snapshot.exists()) {
        setWaterAmount(snapshot.val());
        setLoading(false);
      } else {
        setWaterAmount(0); // Fallback if no data
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [currentPage]);

  const handleResetWaterLevel = () => {
    const waterRef = ref(database, `system${currentPage}/waterLevel`);
    set(waterRef, maxCapacity)
      .then(() => {
        setWaterAmount(maxCapacity);
      })
      .catch((error) => {
        console.error("Error resetting water level:", error);
      });
  };

  const waterPercent = ((waterAmount / maxCapacity) * 100).toFixed(0);

  if (loading) return <div>Loading water level...</div>;

  const totalPages = 2;

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h2 className="section-title">Your Vending Machines</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="add-button">+ Add A New Vendo</button>
          <button className="reset-button" onClick={handleResetWaterLevel}>
            Reset Water Level
          </button>
        </div>
      </div>

      <h2 className="section-title">{`System ${currentPage} Status`}</h2>

      <div className="vendo-status">
        <div className="water-container">
          <img src={watercontainer} alt="Water Container" className="container-img" />
          <div className="water-level-wrapper">
            <div
              className="water-fill"
              style={{ height: `${waterPercent}%` }}
            >
              <div className="wave wave1"></div>
              <div className="wave wave2"></div>
            </div>
          </div>

          <div className="water-info-card">
            <span className="water-amount">{waterAmount}ml</span>
            <div className="water-progress-bar">
              <div
                className="water-progress-fill"
                style={{ width: `${waterPercent}%` }}
              ></div>
            </div>
            <span className="water-percent">{waterPercent}%</span>
          </div>
        </div>
      </div>

      <div className="pagination">
        <span
          className="page-link"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          &lt; Previous
        </span>
        {[...Array(totalPages)].map((_, i) => (
          <span
            key={i}
            className={`page-number ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </span>
        ))}
        <span
          className="page-link"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next &gt;
        </span>
      </div>
    </div>
  );
}

export default YourVendo;
