import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const OrderForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  const handleOrderSubmit = () => {

    console.log("Данные заказа:", { name, phone, email,country, address });
    onClose(); 
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h5" component="h2" sx={{ marginBottom: "20px", textAlign: "center" }}>
        Контактные данные
      </Typography>
      <TextField
        label="Покупатель (ФИО) "
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Контактный телефон"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Typography variant="h5" component="h2" sx={{ marginBottom: "20px", textAlign: "center" }}>
        Доставка
      </Typography>
      <TextField
        label="Страна"
        variant="outlined"
        fullWidth
        margin="normal"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <TextField
        label="Населенный пункт"
        variant="outlined"
        fullWidth
        margin="normal"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
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
