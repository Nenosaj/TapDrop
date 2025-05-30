// waterLevelUpdater.js
import { database } from './firebase.js';

import { ref, set } from 'firebase/database';

function generateWaterLevel() {
  return Math.floor(Math.random() * 80) + 10;
}

function updateWaterLevel() {
  const waterRef = ref(database, 'sensor/waterLevel');
  const level = generateWaterLevel();
  console.log("Updating water level to:", level);

  set(waterRef, level)
    .then(() => console.log(`Updated to: ${level}`))
    .catch((err) => console.error('Error updating water level:', err));
}

setInterval(updateWaterLevel, 2000);
