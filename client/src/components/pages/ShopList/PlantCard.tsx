import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import the ShoppingCartIcon
import './plant.css'; 
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CountCart';
import axios from 'axios';
import { useUser } from '../../../context/auth';
import QuantityInput from '../../ui/btns/NumberInput';

const API_URL = import.meta.env.VITE_API_URL;


export default function PlantCard({ plant }) {
    const {handleAddtoCartCounter} = useCart()  
    const {user} = useUser() 
    const [quantity, setQuantity] = useState<number>(1)
    const [open, setOpen] = useState<boolean>(false)


      const handleOpenModal = (event: any) => {
    event.stopPropagation(); 
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

    const handleAddToCart = async(event: { stopPropagation: () => void; }) => {
      event.stopPropagation();  if (!plant?.id || !user?.id) {
    return
  }
  
  const cartItem = {
    plant_id: plant.id,
    user_id: user.id,
    quantity: 1
  }

  try {
    const response = await axios.post(`${API_URL}/api/cart`, cartItem, {withCredentials:true});
    console.log('Растение добавалено в корзину: ', response.data);
    handleCloseModal()
    handleAddtoCartCounter(quantity)
  } catch (error) {
    console.log('Ошибка при добавлении в корзину', error);
  }
 }

  return (
    <Card className="plant-card" style={{ position: 'relative' }}>
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
            </CardContent>
          </CardActionArea>
        </Link>
        <div>
            <IconButton
              color="primary"
              onClick={handleOpenModal}
              aria-label="добавить в корзину"
              style={{ position: 'absolute', bottom: '15px', right: '10px', border:'1px solid black'}} 
            >
              <ShoppingCartIcon />
            </IconButton>


             <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle>Выберите количество</DialogTitle>
          <DialogContent>
            <QuantityInput 
              value={quantity | 1} 
              onChange={(e) => setQuantity(e.target.value)}  
            /> 
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Отмена
            </Button>
            <Button onClick={handleAddToCart} color="primary">
              Подтвердить
            </Button>
          </DialogActions>
        </Dialog>
        </div>
    </Card>
  );
}
