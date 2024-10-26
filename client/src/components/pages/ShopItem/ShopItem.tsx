import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL;

export default function ShopItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOnePlant = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.log('Ошибка при загрузке информации о растении', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOnePlant();
  }, [id]);

  const handleBuy = () => {
    alert(`Вы купили ${plant.name}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <Card sx={{ maxWidth: 400, margin: '20px auto' }}>
      <CardMedia
        component="img"
        alt={plant.name}
        height="400"
        image={plant.photo}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {plant.type} {plant.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Цена: {plant.price ? `${plant.price}р.` : 'Цена не указана'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Описание: {plant.description || 'Описание не указано.'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleBuy}
            sx={{ backgroundColor: 'green', color: 'white' }}
          >
            В корзину
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleBack}
            sx={{ marginLeft: '10px' }}
          >
            Назад
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
