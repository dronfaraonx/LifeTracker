import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useUser } from "../../../context/auth";

const API_URL = import.meta.env.VITE_API_URL;

const BuyerPage = () => {
  const { user } = useUser();
  // const [orders, setOrders] = useState([]);



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders/user`, {
          withCredentials: true,
        });
        setOrders(response.data);
        console.log(orders);
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
      }
    };

    if (user?.id) {
      fetchOrders();
    }
  }, [user]);

  const totalPrice = orders.reduce((accumulator, order) => {
    return accumulator + order.pricePurchase * order.quantity;
  }, 0);

  return (
    <div className="buyerContainer">
    <Box sx={{ padding: "20px"}}>
      <Typography variant="h4" gutterBottom>
        Мои заказы
      </Typography>
       <div>
        <ul>

           {[...new Set(orders.map((order) => order.uuid_order))].map((uniqueOrder) => (
      <li key={uniqueOrder}>{uniqueOrder}</li>
            ))}
        </ul>
       </div>

      {orders.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Номер заказа</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Цена</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.Plant.name}</TableCell>
                  <TableCell>{order.pricePurchase} ₽</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginRight: "10px" }}
            >
              Общая сумма:
            </Typography>
            <Typography variant="h6" sx={{ color: "#00ab84" }}>
              {totalPrice.toFixed(2)} ₽
            </Typography>
          </Box>{" "}
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          У вас нет заказов.
        </Typography>
      )}
    </Box>
     </div>
  );
};

export default BuyerPage;
