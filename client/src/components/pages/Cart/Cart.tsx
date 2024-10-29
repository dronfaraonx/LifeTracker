import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../../context/auth";
import { Button, CardContent, Typography } from "@mui/material";
import { Card, CardGroup } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSession } from "../../../redux/actions/userActions";

const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  // const { user } = useUser();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    dispatch(fetchUserSession())
  }, [dispatch])

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

  const calculateTotal = () => {
    return cart.reduce((total, cartPlant) => {
      const price = parseFloat(cartPlant.price) || 0;
      const quantity = cartPlant.quantity || 0;
      return total + price * quantity;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <div style={{ flex: 1, padding: "20px" }}>
            <h2 style={{ marginTop: "20px", textAlign: "center" }}>Здравствуйте, {user.name}</h2>

      <h2 style={{ marginTop: "20px", textAlign: "center" }}>Мои заказы:</h2>
      <div className="plant-list">
        {cart.length === 0 ? (
          <p>Ничего не добавлено в корзину.</p>
        ) : (
          <>
            <CardGroup>
              {cart.map((cartPlant) => (
                <Card key={cartPlant.id} sx={{ maxWidth: 400, margin: "20px" }}>
                  <CardContent>
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
                </Card>
              ))}
            </CardGroup>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Typography variant="h6" component="div">
                Общая сумма: {total ? `${total.toFixed(2)}р.` : "0р."}
              </Typography>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary"  sx={{ backgroundColor: 'green', color: 'white' }}>
                Оплатить
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
