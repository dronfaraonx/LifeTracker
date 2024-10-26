import React from 'react';
import Plant from './../ShopList/Plant';


export default function ShopItem({ plant }) {
  return (
    <div className="plant-details">
      <h2>{plant.type} {plant.name}</h2>
      <img src={plant.photo} alt={plant.name} height="400" />
      <p>Цена: {plant.price ? `${plant.price}р.` : 'Цена не указана'}</p>
      <p>Описание: {plant.description || 'Описание не указано.'}</p>
    </div>
  );
}
