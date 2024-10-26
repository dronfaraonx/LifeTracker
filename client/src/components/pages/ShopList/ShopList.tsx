import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PlantCard from './PlantCard';
import './plant.css';
import ShopItem from '../ShopItem/ShopItem';
const API_URL = import.meta.env.VITE_API_URL;

export default function ShopList() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants`);
        setPlants(response.data);
      } catch (error) {
        console.log('Ошибка при загрузке растений', error);
      }
    };
    fetchPlants();
  }, []);

  return (
    <div>
      <h2>Список растений:</h2>
      <div className="plant-list">
        {plants.length === 0 ? (
          <p>Нет доступных растений.</p>
        ) : (
          plants.map((plant) => (
            <div key={plant.id}>
              <PlantCard plant={plant} setSelectedPlant={setSelectedPlant} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
