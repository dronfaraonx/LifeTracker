import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import the ShoppingCartIcon
import './plant.css'; 
import { Link } from 'react-router-dom';

export default function CloneCard({ plant }) {
  const handleAddToCart = () => {
    // Logic to add the plant to the cart
    console.log(`${plant.name} добавлен в корзину`);
  };

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
              {plant.type} 
              <br/>
              {plant.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {plant.price ? `${plant.price}р.` : 'Цена не указана'}
            </Typography>
            <IconButton
              color="primary"
              onClick={handleAddToCart}
              aria-label="добавить в корзину"
              style={{ position: 'absolute', bottom: '65px', right: '10px', border:'1px solid black', color: '#00ab84'}} 
            >
              <ShoppingCartIcon />
            </IconButton>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
