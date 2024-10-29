import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './plant.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CountCart';
import { useUser } from '../../../context/auth';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function PlantCard({ plant }) {
  const { user } = useUser();
  const { handleAddtoCartCounter } = useCart();

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    if (!plant?.id || !user?.id) {
      alert('Необходима авторизация для добавления в корзину.');
      return;
    }

    const cartItem = {
      plant_id: plant.id,
      user_id: user.id,
      quantity: quantity,
    };

    try {
      const response = await axios.post(`${API_URL}/api/cart`, cartItem, { withCredentials: true });
      console.log('Растение добавлено в корзину: ', response.data);
      handleAddtoCartCounter(plant.name);
      handleClose();
    } catch (error) {
      console.error('Ошибка при добавлении в корзину', error);
      alert('Ошибка при добавлении растения в корзину. Пожалуйста, попробуйте снова.');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuantity(1);
  };

  return (
    <Card className="plant-card" style={{ position: 'relative' }}>
      <CardActionArea>
        <Link to={`/plants/${plant.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <br />
              {plant.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {plant.price ? `${plant.price}р.` : 'Цена не указана'}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        aria-label="добавить в корзину"
        style={{ position: 'absolute', bottom: '15px', right: '10px', border: '1px solid black' }}
      >
        <ShoppingCartIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Выберите количество</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Количество"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            style={{ width: '100%', marginTop: '10px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleAddToCart} color="primary">
            Добавить в корзину
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
