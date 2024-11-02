import React, { useEffect, useState } from "react";
import ThankYouModal from "./ThankyouModal/ThankYouModal"; 

import { Button, TextField, Typography, Box, Grid } from "@mui/material";
// import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../context/auth";
import axios from "axios";
import { useCart } from "../../../context/CountCart";

const API_URL = import.meta.env.VITE_API_URL;

const OrderForm = ({ cart, onClose }) => {
  const { user } = useUser();
  const {eraseCartCounter} = useCart()

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  
  const [thankyou, setThankYou] = useState(false);
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/userInfo/${user.id}`, {
          withCredentials: true,
        });
        if (response.data) {
          setName(response.data.firstName);
          setLastName(response.data.lastName);
          setPhone(response.data.phone);
          setCity(response.data.city);
          setAddress(response.data.address);
        }
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
      }
    };

    fetchUserInfo();
  }, [user.id]);

  const handleOrderSubmit = async () => {
    const userInfo = {
      id: user.id,
      firstName: name,
      lastName,
      phone,
      city,
      address,
    };

    const cartItems = cart.map((cartItem) => ({
      user_id: user.id,
      plant_id: cartItem.id,
      quantity: cartItem.quantity,
      pricePurchanse: cartItem.price,
    }));

    try {

      await axios.post(`${API_URL}/api/orders`, { cartItems }, { withCredentials: true })
        .catch(error => console.error("Ошибка отправки заказа:", error));

   
      await axios.post(`${API_URL}/api/userInfo`, userInfo, { withCredentials: true })
        .catch(error => console.error("Ошибка обновления информации о пользователе:", error));

 
      await axios.post(`${API_URL}/api/send-order`, {
        cart: cartItems,
        total: calculateTotal(cartItems),
        user: userInfo,
      }).then(() => {
        eraseCartCounter();
        setThankYou(true);
      }).catch(error => console.error("Ошибка отправки подтверждения заказа:", error));
      
    } catch (error) {
      console.error("Ошибка создания заказа:", error);
    }
  };

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + (item.pricePurchanse * item.quantity);
    }, 0);
  };


  return (
    <Box sx={{ padding: "20px", maxWidth: "80vh", margin: "0 auto", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <Typography variant="h5" component="h2" sx={{ marginBottom: "20px", textAlign: "center" }}>
        Контактные данные
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography>Имя</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>Фамилия</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>Контактный телефон</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" sx={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
        Доставка
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography>Город</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography>Адрес</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "40px",
              },
              "& .MuiInputBase-input": {
                padding: "10px",
              },
            }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#00ab84", color: "white", marginTop: "20px" }}
        fullWidth
        onClick={handleOrderSubmit}
      >
        Подтвердить заказ
      </Button>

       <ThankYouModal
        open={thankyou}
        onClose={() => setThankYou(false)}
      />
        
      <Button
        variant="outlined"
        sx={{ color: "black", marginTop: "10px" }}
        fullWidth
        onClick={onClose}
      >
        Отмена
      </Button>
    </Box>
  );
};

export default OrderForm;