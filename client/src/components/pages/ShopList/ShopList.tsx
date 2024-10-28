import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PlantCard from './PlantCard';
import './plant.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function ShopList() {
  const [plants, setPlants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [plantType, setPlantType] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants`);
        setPlants(response.data); 
      } catch (error) {
        console.error('Ошибка при загрузке растений:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`);
        const uniqueCategories = Array.from(
          new Set(response.data.map((category) => category.name))
        ).map((name) =>
          response.data.find((category) => category.name === name)
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchPlants();
    fetchCategories();
  }, []);

  const filteredPlants = plants.filter(plant => {
    const matchesType = plantType ? plant.type === plantType : true;
    const matchesCategory = categoryId ? plant.category_id === Number(categoryId) : true;
    return matchesType && matchesCategory;
  });

  const uniqueCategories = [...new Set(plants.map(plant => plant.type))];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc' }}>
        <h3>Фильтры</h3>

        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPlantType('');
          }}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          <option value="">Все категории</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>

        {categoryId && (
          <select
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="">Все типы</option>
            {uniqueCategories
              .filter(type => plants.some(plant => plant.category_id === Number(categoryId) && plant.type === type))
              .map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
          </select>
        )}
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Список растений:</h2>
        <div className="plant-list">
          {filteredPlants.length === 0 ? (
            <p>Нет доступных растений.</p>
          ) : (
            filteredPlants.map((plant) => (
              <div key={plant.id}>
                <PlantCard plant={plant} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
