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

const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  const { user } = useUser();
  const { handleRemoveFromCartCounter } = useCart();
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

  const handleRemove = async (plantId: number) => {
    try {
      const cartPlant = cart.find((item) => item.id === plantId);
      if (!cartPlant) return;

      await axios.delete(`${API_URL}/api/cart/${user.id}/plant/${plantId}`);
      setCart((prevCart) => prevCart.filter((item) => item.id !== plantId));
      handleRemoveFromCartCounter(cartPlant.quantity);
    } catch (error) {
      console.log("Ошибка при удалении растения из корзины", error);
    }
  };

  const handleQuantityChange = async (plantId: number, change: number) => {
    try {
      const cartPlant = cart.find((item) => item.id === plantId);
      if (!cartPlant) return;

      const newQuantity = cartPlant.quantity + change;
      if (newQuantity < 1) return;

      await axios.put(`${API_URL}/api/cart/${user.id}/plant/${plantId}`, {
        quantity: newQuantity,
      });

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === plantId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.log("Ошибка при обновлении количества растения в корзине", error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, cartPlant) => {
      const price = parseFloat(cartPlant.price) || 0;
      const quantity = cartPlant.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: 1200,
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px" }}>
        Корзина
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
        {showOrderForm && cart.length > 0 && (
          <Box sx={{ flex: 1, maxWidth: "500px" }}>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #e0e0e0",
              }}
            >
              Проверка заказа. Проверьте, пожалуйста, еще раз комплектацию Вашего
              заказа. При необходимости измените ваш заказ.
            </Typography>
            <CheckoutForm
              cart={cart}
              total={total}
              onClose={() => setShowOrderForm(false)}
            />
          </Box>
        )}

        <Box sx={{ flex: 2 }}>
          <Stack spacing={2} alignItems="center">
            {cart.map((cartPlant) => (
              <Card
                key={cartPlant.id}
                sx={{
                  width: "100%",
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
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginRight: "10px",
                    }}
                    image={cartPlant.photo}
                    alt={cartPlant.name}
                  />
                )}
                <CardContent sx={{ flex: 1, padding: "5px" }}>
                  <Typography variant="h6" component="div" sx={{ fontSize: "1rem" }}>
                    {cartPlant.type} {cartPlant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Цена: {cartPlant.price ? `${cartPlant.price}р.` : "Цена не указана"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Количество: {cartPlant.quantity || "0"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 1,
                      backgroundColor: "green",
                      borderRadius: "5px",
                      padding: "2px",
                      width: "120px",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleQuantityChange(cartPlant.id, -1)}
                      disabled={cartPlant.quantity <= 1}
                      sx={{
                        borderRadius: "5px 0 0 5px",
                        padding: "0 5px",
                        color: "white",
                        minWidth: "30px",
                        backgroundColor: "green",
                        "&:hover": { backgroundColor: "darkgreen" },
                      }}
                    >
                      -
                    </Button>
                    <Typography
                      sx={{
                        margin: "0 5px",
                        fontSize: "0.875rem",
                        color: "white",
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
                        borderRadius: "0 5px 5px 0",
                        padding: "0 5px",
                        color: "white",
                        minWidth: "30px",
                        backgroundColor: "green",
                        "&:hover": { backgroundColor: "darkgreen" },
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
                    color: "#ff4d4d",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Card>
            ))}
          </Stack>
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Typography variant="h6">
              Итого к оплате: {total ? `${total.toFixed(2)}р.` : "0р."}
            </Typography>
          </Box>
          {!showOrderForm && cart.length > 0 && (
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "green", color: "white" }}
                onClick={() => setShowOrderForm(true)}
              >
                Оформить заказ
              </Button>
            </Box>
          )}
        </Box>
      </Stack>

      {cart.length === 0 && (
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="body1" color="text.secondary">
            Корзина пуста. Пожалуйста, добавьте товары для оформления заказа.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
