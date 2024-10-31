import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useUser } from '../../../context/auth';
import SignupModal from '../Authorization/modal/SignUpModal';
import { useCart } from '../../../context/CountCart';
import Plant from '../ShopList/Plant';
import './ShopItem.style.css'
import QuantityInput from '../../ui/btns/NumberInput';

const API_URL = import.meta.env.VITE_API_URL;

export default function ShopItem() {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1)
  const {handleAddtoCartCounter} = useCart()   

  useEffect(() => {
    const fetchOnePlant = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/plants/${id}`);
        setPlant(response.data);
      } catch (error) {
        console.log('Ошибка при загрузке растения', error);
        alert('Не удалось загрузить растение. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    fetchOnePlant();
  }, [id]);

  const handleModelRegOpen = () => setOpen(true);
  const handleModelRegClose = () => setOpen(false);

  const handleBack = () => {
    navigate('/plants');
  };

  const handleAddToCart = async() => {
  if (!plant?.id || !user?.id) {
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
    handleAddtoCartCounter(quantity)
  } catch (error) {
    console.log('Ошибка при добавлении в корзину', error);
  }
 }

  if (loading) {
    return <div>Загрузка...</div>; 
  }

<<<<<<< HEAD
  return (
    <Card className='page-container' sx={{ maxWidth: 400, margin: '20px auto' }}>
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
=======
  return ( 
<div className='itemContainer' style={{height: 'calc(100vh - 10vh - 10vh)'}}>
    <div className="plant-item">
      <div className='imageBlock'>
        <img 
          src={plant.photo} 
          alt={plant.name} 
          className="plant-card-media" 
        />
      </div>
      
      <div className="plant-card-content">
        <h5>{plant.type} {plant.name}</h5>
        <p>Цена: {plant.price ? `${plant.price}р.` : 'Цена не указана'}</p>
        <p>Описание: {plant.description || 'Описание не указано.'}</p>
        <div className="plant-card-actions">
          <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
>>>>>>> d900f633994ea4f85a603a9caa9edc705fae34de
          <Button 
            className="add-to-cart-button"
            onClick={user ? handleAddToCart : handleModelRegOpen}
            disabled={loading}
            sx={{ backgroundColor: "green", color: "white", size: ""}}

          >
            В корзину
          </Button>
          <SignupModal open={open} onClose={handleModelRegClose} />
        </div>
        <div className='backBtn'>
          <Button 
          className="back-button" 
          onClick={handleBack}
          >
            Назад
          </Button>
        </div>
      </div>
</div>

  </div>

  );
}