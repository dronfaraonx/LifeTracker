import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../context/auth';
import { CardMedia, CardContent, Typography } from '@mui/material';
import { Card } from 'reactstrap';

const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  const {user} = useUser()
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cart/${user.id}`);
        setCart(response.data); 
      } catch (error) {
        console.log('Ошибка при получении растений из корзины', error);
      }
    };
    fetchCart();
  }, [user?.id]); 

  return (
    <div style={{ flex: 1, padding: '20px' }}>
      <h2>Мои заказы:</h2>
      <div className="plant-list">
        {cart.length === 0 ? (
          <p>Нет доступных растений в корзине.</p>
        ) : (
          <ul>
            {cart.map((cartPlant) => (
              <li key={cartPlant.id}>
                <Card sx={{ maxWidth: 400, margin: '20px auto' }}>
      <CardMedia
        component="img"
        alt={cartPlant.name}
        height="400"
        image={cartPlant.photo}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {cartPlant.type} {cartPlant.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Цена: {cartPlant.price ? `${cartPlant.price}р.` : 'Цена не указана'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Описание: {cartPlant.description || 'Описание не указано.'}
        </Typography>
        </CardContent>
        </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
