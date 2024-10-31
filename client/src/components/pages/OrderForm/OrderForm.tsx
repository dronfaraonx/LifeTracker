import React, { useState } from "react";
import { Button, TextField, Typography, Box, Grid } from "@mui/material";
import { useCart } from "../../../context/CountCart";
import axios from "axios";
import { useUser } from "../../../context/auth";

const API_URL = import.meta.env.VITE_API_URL;

const OrderForm = ({cart, total, onClose }) => {

  const { user } = useUser();
  const { handleRemoveFromCartCounter } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("");



// const handleOrderSubmit = async () => {
//   try {
//     const order = cart.map(async (cartPlant) => {
//       await axios.post(`${API_URL}/api/orders`, {
//         user_id: user.id,
//         product_id: cartPlant.id,
//         quantity: cartPlant.quantity,
//         pricePurchase: cartPlant.price,
//       });
//     });


//     const deletePromises = cart.map(async (cartPlant) => {
//       await axios.delete(`${API_URL}/api/cart/${user.id}/plant/${cartPlant.id}`);
//     });

//     handleRemoveFromCartCounter(cart.reduce((total, item) => total + item.quantity, 0));

//     onClose(); 
//   } catch (error) {
//     console.log("Ошибка при оформлении заказа", error);
//   }
// };


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
          <Typography>Страна</Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
          <Typography>Населенный пункт</Typography>
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
        Подтвердить заказ:
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
