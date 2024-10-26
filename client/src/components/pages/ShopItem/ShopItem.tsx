import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useUser } from '../../../context/auth';
import SignupModal from '../Authorization/modal/SignUpModal';

const API_URL = import.meta.env.VITE_API_URL;

export default function ShopItem() {
  const {user} = useUser()
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchOnePlant = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.log('Ошибка при загрузке растения', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOnePlant();
  }, [id]);

  const handleBuy = () => {
    alert(`Вы купили ${plant.name}`);
  };

  const handleModelRegOpen = () => setOpen(true);
  const handleModelRegClose = () => setOpen(false);

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
            onClick={user ? handleBuy : handleModelRegOpen}
            sx={{ backgroundColor: 'green', color: 'white' }}
          >
            В корзину
          </Button>
          <SignupModal open={open} onClose={handleModelRegClose} />
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
