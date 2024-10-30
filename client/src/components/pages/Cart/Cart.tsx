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
} from "@mui/material";
import { Card, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckoutForm from "../OrderForm/OrderForm";

const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  const { user } = useUser();
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

  const { handleRemoveFromCartCounter } = useCart();

  const handleRemove = async (plantId) => {
    try {
      const cartPlant = cart.find((item) => item.id === plantId);
      if (!cartPlant) return;

      await axios.delete(`${API_URL}/api/cart/${user.id}/plant/${plantId}`);
      setCart((prevCart) =>
        prevCart.filter((cartPlant) => cartPlant.id !== plantId)
      );

      handleRemoveFromCartCounter(cartPlant.quantity);
    } catch (error) {
      console.log("Ошибка при удалении растения из корзины", error);
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
    <div style={{ display: "flex", minHeight: "calc(100vh - 10vh - 10vh)", padding: "20px" }}>
      {showOrderForm && (
        <div style={{ flex: 1, marginRight: "20px" }}>
          <CheckoutForm cart={cart} total={total} />
        </div>
      )}

      <div style={{ flex: 2 }}>
        <h2 style={{ marginTop: "20px", textAlign: "center" }}>Мои заказы:</h2>
        <div className="plant-list">
          {cart.length === 0 ? (
            <p>Ничего не добавлено в корзину.</p>
          ) : (
            <>
              <Stack spacing={2} alignItems="center">
                {cart.map((cartPlant) => (
                  <Card
                    key={cartPlant.id}
                    sx={{
                      maxWidth: 600,
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      position: "relative",
                    }}
                  >
                    {cartPlant.photo && (
                      <CardMedia
                        component="img"
                        sx={{
                          width: 120,
                          height: 120,
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "16px",
                        }}
                        image={cartPlant.photo}
                        alt={cartPlant.name}
                      />
                    )}
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h5" component="div">
                        {cartPlant.type} {cartPlant.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Цена:{" "}
                        {cartPlant.price
                          ? `${cartPlant.price}р.`
                          : "Цена не указана"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Количество: {cartPlant.quantity || "0"}
                      </Typography>
                    </CardContent>
                
                    {!showOrderForm && (
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
                    )}
                  </Card>
                ))}
              </Stack>
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Typography variant="h6" component="div">
                  Общая сумма: {total ? `${total.toFixed(2)}р.` : "0р."}
                </Typography>
              </div>
       
              {!showOrderForm && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: "green", color: "white" }}
                    onClick={() => setShowOrderForm(true)} 
                  >
                    Оплатить
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
