import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import { useUser } from "../../../context/auth";

const API_URL = import.meta.env.VITE_API_URL;

const BuyerPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

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

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Мои заказы
      </Typography>

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
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{order.Plant.name}</TableCell>
                  <TableCell>{order.pricePurchase} ₽</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br/>
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
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{order.Plant.name}</TableCell>
                  <TableCell>{order.pricePurchase} ₽</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          У вас нет заказов.
        </Typography>
      )}
    </Box>
  );
};

export default BuyerPage;
