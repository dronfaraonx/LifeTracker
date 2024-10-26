import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import './plant.css'; 
import Plant from './Plant';

interface PlantCardProps {
  plant: Plant;
  setSelectedPlant: (plant: Plant) => void;
}

export default function PlantCard({ plant, setSelectedPlant }: PlantCardProps) {
  const handleClick = () => {
    setSelectedPlant(plant);
  }

  return (
    <Card className="plant-card">
      <CardActionArea onClick={handleClick} className="card-link">
        <CardMedia
          component="img"
          alt={plant.name}
          height="300"
          image={plant.photo}
          className="plant-image"
        />
        <CardContent className="card-content">
          <Typography variant="h6" className="plant-name">
            {plant.type} {plant.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {plant.price ? `${plant.price}р.` : 'Цена не указана'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
