import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import './plant.css'; 
import Plant from './Plant'




export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Card className="plant-card">
      <CardActionArea href={`/plants/${plant.id}`} className="card-link">
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
