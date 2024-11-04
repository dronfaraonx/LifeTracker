import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../context/auth";
import { useCart } from "../../../context/CountCart";
import {
  Button,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import { Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckoutForm from "../OrderForm/OrderForm";
import { bottom } from "@popperjs/core";

const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  const { user } = useUser();
  const { handleAddtoCartCounter, handleRemoveFromCartCounter } = useCart();
  const [cart, setCart] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/cart/${user.id}`);
        setCart(response.data);
      } catch (error) {
        console.log("Ошибка при получении растений из корзины", error);
      }
    };
    fetchCart();
  }, [user?.id]);

  const handleRemove = async (plantId) => {
    try {
      const cartPlant = cart.find((item) => item.id === plantId);
      if (!cartPlant) return;

      await axios.delete(`${API_URL}/api/cart/${user.id}/plant/${plantId}`);
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.id !== plantId);
        if (updatedCart.length === 0) {
          setShowOrderForm(false);
        }
        return updatedCart;
      });
      handleRemoveFromCartCounter(cartPlant.quantity);
    } catch (error) {
      console.log("Ошибка при удалении растения из корзины", error);
    }
  };

  const handleQuantityChange = async (plantId, change) => {
    try {
      const cartPlant = cart.find((item) => item.id === plantId);
      if (!cartPlant) return;

      const newQuantity = Number(cartPlant.quantity) + Number(change);
      if (newQuantity < 1) return;

      await axios.put(`${API_URL}/api/cart/${user.id}/plant/${plantId}`, {
        quantity: newQuantity,
      });
      const updateQuantity = (prevCart) =>
        prevCart.map((item) =>
          item.id === plantId ? { ...item, quantity: newQuantity } : item
        );
      setCart(updateQuantity);
      handleAddtoCartCounter(change);
    } catch (error) {
      console.log("Ошибка при обновлении количества растения в корзине", error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price ? item.price * item.quantity : 0);
    }, 0);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 10vh - 5.3vh)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!showOrderForm ? (
        <Box sx={{ width: "100%", maxWidth: "600px", textAlign: "center" }}>
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Корзина
          </Typography>
          {cart.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              Корзина пуста. Пожалуйста, добавьте товары для оформления заказа.
            </Typography>
          ) : (
            <Stack spacing={2}>
              {cart.map((cartPlant) => (
                <Card
                  key={cartPlant.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    height: "100px",
                  }}
                >
                  {cartPlant.photo && (
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 80,
                        objectFit: "fit",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                      image={cartPlant.photo}
                      alt={cartPlant.name}
                    />
                  )}
                  <CardContent sx={{ flex: 1, padding: "5px", width: "20vh" }}>
                    <Typography variant="h6" component="div">
                      {cartPlant.type} {cartPlant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Цена:{" "}
                      <strong>
                        {cartPlant.price
                          ? `${cartPlant.price}р.`
                          : "Цена не указана"}
                      </strong>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 1,
                        marginBottom: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleQuantityChange(cartPlant.id, -1)}
                        disabled={cartPlant.quantity <= 1}
                        sx={{
                          backgroundColor: "#00ab84",
                          color: "white",
                           "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",

                  transform: "scale(1.01)",}
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        sx={{
                          margin: "0 5px",
                          fontSize: "1.3rem",
                          color: "black",
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        {cartPlant.quantity}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleQuantityChange(cartPlant.id, 1)}
                        sx={{
                          backgroundColor: "#00ab84",
                          color: "white",
                           "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",

                  transform: "scale(1.01)",}
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </CardContent>
                  <IconButton
                    onClick={() => handleRemove(cartPlant.id)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "black",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Card>
              ))}
              {/* Итоговая сумма */}
              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Итого к оплате: <strong>{calculateTotal()}р.</strong>
              </Typography>
            </Stack>
          )}

          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            {cart.length > 0 && (
              <Button
                variant="contained"
                sx={{
                          backgroundColor: "#00ab84",
                          color: "white",
                           "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",

                  transform: "scale(1.01)",}
                        }}
                onClick={() => setShowOrderForm(true)}
              >
                Оформить заказ
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Box sx={{ flex: 1, padding: "20px" }}>
            <CheckoutForm cart={cart} onClose={() => setShowOrderForm(false)} />
          </Box>
          <Box sx={{ flex: 1, padding: "20px", textAlign: "center"}}>
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>Список товаров в корзине:</Typography>
            <Stack spacing={2}>
              {cart.map((cartPlant) => (
                <Card
                  key={cartPlant.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "5px",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    position: "relative",
                    height: "100px",
                  }}
                >
                  {cartPlant.photo && (
                    <CardMedia
                      component="img"
                      sx={{
                        width: 100,
                        height: 80,
                        objectFit: "fit",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                      image={cartPlant.photo}
                      alt={cartPlant.name}
                    />
                  )}
                  <CardContent sx={{ flex: 1, padding: "10px", width: "20vh" }}>
                    <Typography variant="h6" component="div">
                      {cartPlant.type} {cartPlant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Цена:{" "}
                      <strong>
                        {cartPlant.price
                          ? `${cartPlant.price}р.`
                          : "Цена не указана"}
                      </strong>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 1,
                        marginBottom: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleQuantityChange(cartPlant.id, -1)}
                        disabled={cartPlant.quantity <= 1}
                        sx={{
                          backgroundColor: "green",
                          "&:hover": {
                            backgroundColor: "darkgreen",
                          },
                        }}
                      >
                        -
                      </Button>
                      <Typography
                        sx={{
                          margin: "0 5px",
                          fontSize: "0.875rem",
                          color: "black",
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        {cartPlant.quantity}
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleQuantityChange(cartPlant.id, 1)}
                        sx={{
                          backgroundColor: "green",
                          "&:hover": {
                            backgroundColor: "darkgreen",
                          },
                        }}
                      >
                        +
                      </Button>
                    </Box>
                  </CardContent>
                  <IconButton
                    onClick={() => handleRemove(cartPlant.id)}
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "black",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Card>
              ))}
              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Итого к оплате: <strong>{calculateTotal()}р.</strong>
              </Typography>
            </Stack>
          </Box>
        </Box>
      )}
    </div>
  );
}
