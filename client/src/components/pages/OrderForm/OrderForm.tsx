import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../../../context/auth";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const OrderForm = ({ cart, onClose }) => {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

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
    const uuid_order = uuidv4().slice(0, 8);
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
      uuid_order: uuid_order,
      quantity: cartItem.quantity,
      pricePurchanse: cartItem.price,
    }));

    try {
      await axios.post(`${API_URL}/api/orders`, { cartItems }, { withCredentials: true });
      await axios.post(`${API_URL}/api/userInfo`, userInfo, { withCredentials: true });
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
