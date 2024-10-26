import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import './plant.css'; 
import { Link } from 'react-router-dom';

export default function PlantCard({ plant }) {
  return (
    <Card className="plant-card">
      <Link to={`/plants/${plant.id}`} style={{ textDecoration: 'none' }}>
        <CardActionArea className="card-link">
          <CardMedia
            component="img"
            alt={plant.name}
            height="300"
            image={plant.photo}
            className="plant-image"
          />
          <CardContent className="card-content">
            <Typography variant="h1" className="plant-name">
              {plant.type} {plant.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {plant.price ? `${plant.price}р.` : 'Цена не указана'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

