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
  Button,
} from "@mui/material";
import axios from "axios";
import { useUser } from "../../../context/auth";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const BuyerPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const { uuid_order } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOneOrder = async () => {
      if (user?.id && uuid_order) {
        try {
          const response = await axios.get(
            `${API_URL}/api/orders/order-details/${uuid_order}`,
            {
              withCredentials: true,
            }
          );
          setOrders(response.data);
        } catch (error) {
          console.error("Ошибка при получении заказов:", error);
        }
      }
    };

    fetchOneOrder();
  }, [user, uuid_order]);

  const totalPrice = orders.reduce((accumulator, order) => {
    return accumulator + order.pricePurchase * order.quantity;
  }, 0);

  return (
    <div className="buyerContainer">
      <Box sx={{ padding: "20px" }}>
          <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          Назад
        </Button>
        <Typography variant="h4" gutterBottom>
          Заказ №{uuid_order}:
        </Typography>
        {orders.length > 0 ? (
          <TableContainer component={Paper}>
            <Table
                 sx={{
    justifyContent: "center",
    fontSize: "1.2rem",
    "& .MuiTableCell-root": {
      fontSize: "1.2rem", 
    },
  }}
              >
              <TableHead>
                <TableRow >
                  <TableCell>Номер </TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell>Количество</TableCell>
                  <TableCell>Цена</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order.id} >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {order.Plant.type} {order.Plant.name}
                    </TableCell>
                    <TableCell>{order.quantity} </TableCell>

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
            </Box>
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
