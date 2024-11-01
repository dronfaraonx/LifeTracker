import React, { useState } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../context/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const OrderForm = ({ cart, onClose }) => {
  const {user} =useUser()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

const handleOrderSubmit = async () => {
  const uuid_order = uuidv4();
  
  const cartItems = cart.map((cartItem) => ({
    user_id: user.id,
    plant_id: cartItem.id,
    uuid_order: uuid_order,
    quantity: cartItem.quantity,
    pricePurchanse: cartItem.price,
  }));

  try {
  await axios.post(`${API_URL}/api/orders`,  {cartItems}, { withCredentials: true });
    onClose();
  } catch (error) {
    console.error("Ошибка создания заказа", error);
  }
};



  return (
    <Box sx={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h5" component="h2" sx={{ marginBottom: "20px", textAlign: "center" }}>
        Контактные данные
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Typography>Покупатель (ФИО)</Typography>
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

        <Grid item xs={4}>
          <Typography>Email</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        sx={{ backgroundColor: "green", color: "white", marginTop: "20px" }}
        fullWidth
        onClick={handleOrderSubmit}
      >
        Подтвердить заказ
      </Button>
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
